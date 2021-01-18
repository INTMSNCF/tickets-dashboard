import request from "@/plugins/request";

const state = {
  loading: false,
  items: []
};

// getters
const getters = {};

// actions
const actions = {
  querySatisfactionItems(context) {
    context.state.loading = true;
    return request({
      url: "/api/v2/surveys/satisfaction_ratings?created_since=2020-01-01",
      method: "get"
    }).then(data => {
      context.commit("setSatisfactions", data);
      context.state.loading = false;
    });
  }
};

// mutations
const mutations = {
  setSatisfactions(state, data) {
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
