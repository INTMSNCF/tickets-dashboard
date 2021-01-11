import request from "@/plugins/request";
import dayjs from "@/plugins/moment";
import Ticket from "@/models/Ticket";

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
    let tikets = request({
      url: "/api/v2/tickets?updated_since=2020-01-01&include=stats",
      method: "get"
    }).then(data => {
      context.commit("setTickets", data);
      context.state.loading = false;
    });
    return Promise.all([contacts, companies, tikets]);
  }
};

// mutations
const mutations = {
  setTickets(state, data) {
    Ticket.contacts = this.state.contacts.items;
    Ticket.companies = this.state.companies.items;
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
