import dayjs from "@/plugins/moment";

export default class Ticket {
  static now = dayjs();
  static contacts = [];
  static companies = [];
  static tpyes = {
    "Anomalie bloquante": "ab",
    "Anomalie non bloquante": "anb",
    "Demande d'information": "info",
    "Demande administrative": "admin",
    "Ne pas prendre en compte": "none"
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
    // TODO: openHourCalculation(this.open_at, this.first_responded_at || now, Ticket.bussinesHours, Ticket.hollyDays)
    return {
      open: dayjs.duration((end || now).diff(start)),
      close: dayjs.duration(0)
    };
  }
  #oringinal = {};
  constructor(original) {
    this.#oringinal = original;
    this.id = original.id;
    this.open_at = dayjs(original.created_at);
    this.updated_at = dayjs(original.updated_at);
    this.closed_at = original.stats.closed_at
      ? dayjs(original.stats.closed_at)
      : null;
    this.first_responded_at = original.stats.first_responded_at
      ? dayjs(original.stats.first_responded_at)
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
    this.service = _.get(this.requester, "tags", []).join(", ") || "-";
    // TODO: generate calculation function based on documentation
    this.company =
      Ticket.companies.find(
        item => item.id === (original.company_id || 77000016632)
      ) || {};
    this.company.toString = function() {
      return this.name || "-";
    };
    this.tpc = 0; // calculate:hold
    this.tct = 0; // calculate
    this.tcr = 0; // calculate
    this.waiting_form_client = 0; // calculate
    this.waiting_from_service = 0; // calculate
    this.satisfaction = 0; // calculate
    this.open_hours = 0; // calculate
    this.not_open_hours = 0; // calculate
    // Generation of calculated properties
    this.refreshTimes(Ticket.now);
  }
  refreshTimes(now) {
    let useNow = now || Ticket.now;
    this["#calculateOpenHours"](useNow);
    this["#calculateTPC"](useNow);
  }
  ["#calculateOpenHours"](now) {
    now;
    this.open_hours = 0;
  }
  ["#calculateTPC"](now) {
    this.tpc = Ticket.calculatenHours(
      this.open_at,
      this.first_responded_at || now
    ).open;
  }
}
