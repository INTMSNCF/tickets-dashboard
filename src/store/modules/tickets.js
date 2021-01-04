import request from "@/plugins/request";
import dayjs from "@/plugins/moment";
import _ from "lodash";

const state = {
  loading: false,
  items: []
};

// getters
const getters = {};

class Ticket {
  static now = dayjs();
  static contacts = [];
  static tpyes = {
    "Anomalie bloquante": "ab",
    "Anomalie non bloquante": "anb",
    "Demande d'information": "info",
    "Demande administrative": "info",
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
  constructor(original) {
    this.id = original.id;
    this.open_at = dayjs(original.created_at);
    this.updated_at = dayjs(original.updated_at);
    this.title = original.subject;
    this.software = original.custom_fields.cf_logicielle || "-";
    this.software += original.custom_fields.cf_version
      ? " " + original.custom_fields.cf_version
      : "";
    this.criticality = original.custom_fields.cf_criticit || "";
    this.typeDisplay = original.type;
    this.type = Ticket.tpyes[original.type];
    this.status = original.status;
    this.statusDisplayShort = _.get(Ticket.statusList, this.status, "-")[0];
    this.statusDisplayLong = _.get(Ticket.statusList, this.status, "-")[1];
    this.responder = Ticket.contacts.find(
      item => item.id === original.responder_id
    );
    this.responderDisplay = _.get(this.responder, "email", "-");
    this.requester = Ticket.contacts.find(
      item => item.id === original.requester_id
    );
    this.requesterDisplay = _.get(this.requester, "email", "-");
    // TODO: generate calculation function based on documentation
    this.responsable = "?";
    this.tpc = 0; // calculate
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
  }
  ["#calculateOpenHours"](now) {
    this.open_hours = 0;
  }
}

window.setTimeout(() => {
  Ticket.now = dayjs();
}, 1000 * 60);

// actions
const actions = {
  queryItems(context) {
    context.state.loading = true;
    return request({
      url: "/api/v2/tickets?updated_since=2020-01-01&include=stats",
      method: "get"
    }).then(data => {
      context.commit("setTickets", data);
      context.state.loading = false;
    });
  }
};

// mutations
const mutations = {
  setTickets(state, data) {
    state.items = data.map(item => new Ticket(item));
  }
};

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
};
