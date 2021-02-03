import request from "@/plugins/request";
import dayjs from "@/plugins/moment";
import Ticket from "@/models/Ticket";
import _ from "lodash";

const state = {
  loading: false,
  dialog: false,
  currentTicket: false,
  itemsAll: [],
  items: []
};

// getters
const getters = {
  getTicketbyStatus: state => statusFilter =>
    state.items.filter(item => item.status == statusFilter).length
};

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
    }).then(() => {
      dispatch("queryItems");
    });
  },
  setDateCalculation({ state, commit }, calculatinDate) {
    commit("setLoader", true);
    state.loading = true;
    new Promise(resolve => {
      let items = state.itemsAll.reduce((result, item) => {
        if (item.open_at.isBefore(calculatinDate))
          result.push(item.refreshTimes(calculatinDate));
        return result;
      }, []);
      resolve(items);
    })
      .then(data => commit("setTickets", data))
      .finally(() => commit("setLoader", false));
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
      context.commit("setStoredTickets", data);
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
    state.items = data;
  },
  setLoader(state, data) {
    state.loading = data;
  },
  setStoredTickets(state, data) {
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
    state.itemsAll = data.map(item => new Ticket(item));
    state.items = state.itemsAll;
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
