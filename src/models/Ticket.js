import dayjs from "@/plugins/moment";
import openHourCalculation from "@/utilities/openHourCalculation";
import _ from "lodash";
import XLSX from "xlsx";
import alasql from "@/../node_modules/alasql/dist/alasql.js";

alasql["private"].externalXlsxLib = XLSX;

export function exportData(items, translate) {
  let param = [
    `tickets-${dayjs().format("YYYY-MM-DD-HHmm")}`,
    { sheetid: "Tickets" },
    items.map(item => item.toSheet(translate))
  ];
  alasql("SELECT * INTO XLSX(?, ?) FROM ?", param);
}

export default class Ticket {
  static now = dayjs();
  static contacts = [];
  static companies = [];
  static satisfactions = [];
  static settings = [];
  static types = {
    "Anomalie bloquante": "ab",
    "Anomalie non bloquante": "anb",
    "Demande d'information": "info",
    "Demande administrative": "admin",
    "Ne pas prendre en compte": "none"
  };
  static satisfactionRating = {
    "3": {
      text: "Extremely Happy",
      color: "success",
      icon: "mdi-emoticon-happy-outline"
    },
    "2": {
      text: "Very Happy",
      color: "success",
      icon: "mdi-emoticon-happy-outline"
    },
    "1": {
      text: "Happy",
      color: "success",
      icon: "mdi-emoticon-happy-outline"
    },
    "0": {
      text: "Neutral",
      color: "primary",
      icon: "mdi-emoticon-neutral-outline"
    },
    "-1": {
      text: "Unhappy",
      color: "error",
      icon: "mdi-emoticon-angry-outline"
    },
    "-2": {
      text: "Very Unhappy",
      color: "error",
      icon: "mdi-emoticon-angry-outline"
    },
    "-3": {
      text: "Extremely Unhappy",
      color: "error",
      icon: "mdi-emoticon-angry-outline"
    }
  };
  static statusList = {
    "2": ["Open", "En attente de prise en compte    "],
    "7": ["Waiting on Third Party", "En attente du fournisseur"],
    "8": ["In Progress", "En cours de traitement"],
    "3": ["Pending", "En attente de votre réponse"],
    "4": ["Resolved", "Le ticket a été résolu"],
    "5": ["Closed", "Le ticket a été fermé"],
    "6": ["Waiting on Customer", "En attente de votre réponse"],
    "11": ["Canceled", "Annulé"]
  };
  static calculateHours(start, end) {
    return openHourCalculation(
      start,
      end || now,
      Ticket.businessHours,
      Ticket.hollyDays
    );
  }
  static async factory(obj) {
    return new Ticket(obj);
  }
  #oringinal = {};
  constructor(original) {
    this.#oringinal = original;
    this.id = original.id;
    this.open_at = dayjs(original.created_at);
    this.first_responded_at = original.stats.first_responded_at
      ? dayjs(original.stats.first_responded_at)
      : null;
    this.resolved_at = original.stats.resolved_at
      ? dayjs(original.stats.resolved_at)
      : null;
    this.updated_at = dayjs(original.updated_at);
    this.closed_at = original.stats.closed_at
      ? dayjs(original.stats.closed_at)
      : null;
    this.title = original.subject;
    this.description = {
      html: original.description,
      plain: original.description_text
    };
    this.software = original.custom_fields.cf_logicielle || "-";
    this.software += original.custom_fields.cf_version
      ? " " + original.custom_fields.cf_version
      : "";
    this.criticality = original.custom_fields.cf_criticit || "-";
    this.typeDisplay = original.type;
    this.type = Ticket.types[original.type];
    this.status = original.status;
    this.statusDisplayShort = _.get(Ticket.statusList, this.status, "-")[0];
    this.statusDisplayLong = _.get(Ticket.statusList, this.status, "-")[1];
    this.requester =
      Ticket.contacts.find(item => item.id === original.requester_id) || {};
    this.requester.toString = function() {
      return this.name || "-";
    };
    this.requesterDisplay = _.get(this.requester, "email", "-");
    this.service = _.get(this.requester, "job_title", "-");
    this.company =
      Ticket.companies.find(
        item => item.id === (original.company_id || 77000016632)
      ) || {};
    this.company.toString = function() {
      return this.name || "-";
    };
    // TODO: generate calculation function based on documentation
    this.open_hours = 0; // calculate
    this.open_in_business_hours = false;
    this.not_open_hours = 0; // calculate
    this.tpc = 0; // calculate:hold
    this.tpcCible = 0; // calculate
    this.tct = 0; // calculate
    this.tctCible = 0; // calculate
    this.tcr = 0; // calculate
    this.tcrCible = 0; // calculate
    this.waiting_form_client = 0; // calculate
    this.waiting_from_service = 0; // calculate
    //this.open_in
    this.satisfactions = Ticket.satisfactions.filter(
      item => item.ticket_id === this.id
    );
    if (this.satisfactions.length) {
      this.satisfaction = this.satisfactions.reduce(
        (total, item) =>
          (total += total + (item.ratings.default_question % 100)),
        0
      );
      if (this.satisfaction) this.satisfaction /= this.satisfactions.length;
    } else this.satisfaction = null;
    this.satisfactionText = _.get(
      Ticket.satisfactionRating,
      `${this.satisfaction}.text`,
      "-"
    );
    this.satisfactionIcon = _.get(
      Ticket.satisfactionRating,
      `${this.satisfaction}.icon`,
      "mdi-none"
    );
    this.satisfactionColor = _.get(
      Ticket.satisfactionRating,
      `${this.satisfaction}.color`,
      "transparent"
    );
    this.sla = _.get(
      Ticket.settings.find(
        sla =>
          _.get(sla, "applicable_to.ticket_types", []).indexOf(this.type) >= 0
      ) || Ticket.settings.find(sla => sla.is_default),
      "sla_target.priority_4",
      {
        respond_within: 360,
        resolve_within: 432000,
        business_hours: true,
        escalation_enabled: true,
        notConfig: true
      }
    );

    // Generation of calculated properties
    this.refreshTimes(Ticket.now);
  }
  refreshTimes(now) {
    let useNow = now || Ticket.now;
    this["#calculateHoHno"](useNow);
    this["#calculateTPC"](useNow);
    this["#calculateTCr"](useNow);
    this["#calculateTCt"](useNow);
  }
  ["#calculateHoHno"](now) {
    this.open_in_business_hours =
      Ticket.calculateHours(
        this.open_at,
        this.open_at.add(1, "s")
      ).open.asSeconds() == 1;
    let { open, close } = Ticket.calculateHours(
      this.open_at,
      this.closed_at || now
    );
    this.open_hours = open;
    this.not_open_hours = close;
  }
  ["#calculateTPC"](now) {
    if (!this.first_responded_at) this.tpc = null;
    else
      this.tpc = Ticket.calculateHours(
        this.open_at,
        this.first_responded_at
      ).open;
    this["#calculateTPCCible"](now);
  }
  ["#calculateTPCCible"](now) {
    this.tpcCible = Number(
      (
        ((
          this.tpc || Ticket.calculateHours(this.open_at, now).open
        ).asSeconds() /
          this.sla.respond_within) *
        100
      ).toFixed(2)
    );
  }
  ["#calculateTCr"](now) {
    if (!this.resolved_at) this.tcr = null;
    else
      this.tcr = Ticket.calculateHours(
        this.open_at,
        this.resolved_at || now
      ).open;
    this["#calculateTCrCible"](now);
  }
  ["#calculateTCrCible"](now) {
    this.tcrCible = (
      ((this.tcr || Ticket.calculateHours(this.open_at, now).open).asSeconds() /
        this.sla.resolve_within) *
      100
    ).toFixed(2);
  }
  ["#calculateTCt"](now) {
    if (!this.closed_at) this.tct = null;
    else this.tct = Ticket.calculateHours(this.open_at, this.closed_at).open;
    this["#calculateTCtCible"](now);
  }
  ["#calculateTCtCible"](now) {
    this.tctCible = (
      ((this.tct || Ticket.calculateHours(this.open_at, now).open).asSeconds() /
        (this.sla.next_respond_within || this.sla.resolve_within)) *
      100
    ).toFixed(2);
  }
  toSheet(lang) {
    let result = {};
    result[lang.t("$vuetify.ticke.id")] = this.id;
    result[lang.t("$vuetify.ticke.created_at")] = this.open_at.toDate();
    result[lang.t("$vuetify.ticke.updated_at")] = this.updated_at.toDate();
    result[lang.t("$vuetify.ticke.title")] = this.title;
    result[lang.t("$vuetify.ticke.software")] = this.software;
    result[lang.t("$vuetify.ticke.criticality")] = this.criticality;
    result[lang.t("$vuetify.ticke.type")] = this.type;
    result[lang.t("$vuetify.ticke.status")] = this.status;
    result[lang.t("$vuetify.ticke.tpc")] = this.tpcCible + "%";
    result[lang.t("$vuetify.ticke.tct")] = this.tctCible + "%";
    result[lang.t("$vuetify.ticke.tcr")] = this.tcrCible + "%";
    return result;
  }
}
