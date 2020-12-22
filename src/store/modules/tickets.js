import request from "@/plugins/request";

const state = {
  loading: false,
  items: []
};

// getters
const getters = {};

// actions
const actions = {
  queryItems(context) {
    return request({
      url: "/api/v2/tickets?updated_since=2020-01-01&include=stats",
      method: "get"
    }).then(data => {
      context.commit("setTickets", data);
    });
  }
};

// mutations
const mutations = {
  setPagination(state, payload) {
    state.pagination = payload;
  },
  setTickets(state, data) {
    state.items = data;
  }
};

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
};
