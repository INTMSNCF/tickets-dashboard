import request from "@/plugins/request";

const state = {
  loading: false,
  items: []
};

// getters
const getters = {};

// actions
const actions = {
  queryContactItems(context) {
    context.state.loading = true;
    return request({
      url: "/api/v2/contacts",
      method: "get"
    }).then(data => {
      context.commit("setContacts", data);
      context.state.loading = false;
    });
  }
};

// mutations
const mutations = {
  setContacts(state, data) {
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
