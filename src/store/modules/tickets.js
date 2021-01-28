import request from "@/plugins/request";
import dayjs from "@/plugins/moment";
import Ticket from "@/models/Ticket";
import _ from "lodash";

const state = {
  loading: false,
  dialog: false,
  currentTicket: false,
  items: []
};

// getters
const getters = {};

window.setTimeout(() => {
  Ticket.now = dayjs();
}, 1000 * 60);

// actions
const actions = {
  saveTicket({ state, dispatch }, playground) {
    let ticketToSave = _.get(playground, "ticket") || state.currentTicket;
    state.dialog = false;
    state.loading = true;
    request({
      url: "/api/v2/tickets",
      method: "POST",
      data: ticketToSave.toFreshDesk(document.body.getAttribute("version"))
    }).then(data => {
      console.log("save complete", data);
      dispatch("queryItems");
    });
  },
  queryItems(context) {
    context.state.loading = true;
    let contacts = this.cache.dispatch("queryContactItems");
    let satisfactions = context.dispatch("querySatisfactionItems");
    let tikets = request({
      url:
        "/api/v2/tickets?updated_since=2020-01-01&include=stats,description&per_page=100",
      method: "get"
    }).then(data => {
      context.commit("setTickets", data);
      context.state.loading = false;
    });
    return Promise.all([contacts, satisfactions, tikets]);
  }
};

// mutations
const mutations = {
  ticketDialog(state, { ticket, dialog }) {
    let logedContact = this.state.contacts.items.find(
      item => item.email === this.state.auth.username
    ) || { id: 77045190367, company_id: 77000016631 };
    state.currentTicket =
      ticket ||
      new Ticket({
        requester_id: logedContact.id,
        company_id: logedContact.company_id
      });
    state.dialog = !!dialog;
  },
  setTickets(state, data) {
    Ticket.contacts = this.state.contacts.items;
    Ticket.companies = this.state.companies.items;
    Ticket.satisfactions = this.state.satisfactions.items;
    Ticket.businessHours = _.get(
      _.head(this.state.settings.business_hours),
      "business_hours",
      {}
    );
    Ticket.hollyDays = this.state.settings.holidays;
    Ticket.settings = this.state.settings.sla;
    let start = new Date();
    state.items = data.map(item => new Ticket(item));
    let end = new Date();
    console.log("duration", end - start);
  }
};

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
};
