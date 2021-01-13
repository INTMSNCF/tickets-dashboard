import dayjs from "@/plugins/moment";
import _ from "lodash";

export default class Ticket {
  static now = dayjs();
  static contacts = [];
  static companies = [];
  static satisfactions = [];
  static settings = [];
  static tpyes = {
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
  static calculatenHours(start, end) {
    return openHourCalculation(
      start,
      end || now,
      Ticket.bussinesHours,
      Ticket.hollyDays
    );
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
    this.software = original.custom_fields.cf_logicielle || "-";
    this.software += original.custom_fields.cf_version
      ? " " + original.custom_fields.cf_version
      : "";
    this.criticality = original.custom_fields.cf_criticit || "-";
    this.typeDisplay = original.type;
    this.type = Ticket.tpyes[original.type];
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
    this.open_in_bussines_hours = false;
    this.not_open_hours = 0; // calculate
    this.tpc = 0; // calculate:hold
    this.tpcCible = 0; // calculate:hold
    this.tct = 0; // calculate
    this.tcr = 0; // calculate
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
    this["#calculateTPC"](useNow);
    this["#calculateTCr"](useNow);
    this["#calculateTCrCible"](useNow);
    this["#calculateHoHno"](useNow);
    this["#calculateTCt"](useNow);
    this["#calculateTCtCible"](useNow);
    this["#calculateTPCCible"](useNow);
  }
  ["#calculateTPC"](now) {
    if (!this.first_responded_at) this.tpc = null;
    else
      this.tpc = Ticket.calculatenHours(
        this.open_at,
        this.first_responded_at || now
      ).open;
  }
  ["#calculateTPCCible"](now) {
    this.tpcCible =
      (
        ((
          this.tpc || Ticket.calculatenHours(this.open_at, now).open
        ).asSeconds() /
          this.sla.respond_within) *
        100
      ).toFixed(2) + " %";
  }
  ["#calculateHoHno"](now) {
    this.open_in_bussines_hours =
      Ticket.calculatenHours(
        this.open_at,
        this.open_at.add(1, "s")
      ).open.asSeconds() == 1;
    let { open, close } = Ticket.calculatenHours(
      this.open_at,
      this.closed_at || now
    );
    this.open_hours = open;
    this.not_open_hours = close;
  }
  ["#calculateTCr"](now) {
    if (!this.resolved_at) this.tcr = null;
    else
      this.tcr = Ticket.calculatenHours(
        this.open_at,
        this.resolved_at || now
      ).open;
  }
  ["#calculateTCrCible"](now) {
    if (!this.tcr) this.tcrCible = null;
    else
      this.tcrCible = (
        (this.tcr.asSeconds() / this.sla.respond_within) *
        100
      ).toFixed(2);
  }
  ["#calculateTCt"](now) {
    if (!this.closed_at) this.tct = null;
    else
      this.tct = Ticket.calculatenHours(
        this.open_at,
        this.closed_at || now
      ).open;
  }
  ["#calculateTCtCible"]() {
    if (!this.tct) this.tctCible = null;
    else
      this.tctCible = (
        (this.tct.asSeconds() / this.sla.respond_within) *
        100
      ).toFixed(2);
  }
}
