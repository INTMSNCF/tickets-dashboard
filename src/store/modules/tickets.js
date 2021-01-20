import request from "@/plugins/request";
import dayjs from "@/plugins/moment";
import Ticket from "@/models/Ticket";
import _ from "lodash";

const state = {
  loading: false,
  items: []
};

// getters
const getters = {};

window.setTimeout(() => {
  Ticket.now = dayjs();
}, 1000 * 60);

// actions
const actions = {
  queryItems(context) {
    context.state.loading = true;
    let contacts = context.dispatch("queryContactItems");
    let companies = context.dispatch("queryCompaniesItems");
    let satisfactions = context.dispatch("querySatisfactionItems");
    let tikets = request({
      url: "/api/v2/tickets?updated_since=2020-01-01&include=stats,description",
      method: "get"
    }).then(data => {
      context.commit("setTickets", data);
      context.state.loading = false;
    });
    return Promise.all([contacts, companies, satisfactions, tikets]);
  }
};

// mutations
const mutations = {
  setTickets(state, data) {
    Ticket.contacts = this.state.contacts.items;
    Ticket.companies = this.state.companies.items;
    Ticket.satisfactions = this.state.satisfactions.items;
    Ticket.businessHours = _.get(
      _.head(this.state.settings.business_hours),
      "business_hours",
      {}
    );
    Ticket.hollyDays = this.state.settings.holydays;
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
