import request from "@/plugins/request";

const holidaysDataFiles = require.context("@/data", true, /\.json$/);

const state = {
  loading: false,
  sla: [],
  business_hours: [],
  holydays: [],
  tickets: {
    info: 0.2,
    ab: 0.2,
    anb: 0.6,
    total: 50
  }
};

holidaysDataFiles.keys().forEach(fileName => {
  let hd = holidaysDataFiles(fileName);
  state.holydays = [...state.holydays, ...hd];
});

// getters
const getters = {
  ticketsSettings: state => {
    return [
      {
        label: "info",
        quantity: state.tickets.info * state.tickets.total,
        percentage: state.tickets.info * 100
      },
      {
        label: "anb",
        quantity: state.tickets.anb * state.tickets.total,
        percentage: state.tickets.anb * 100
      },
      {
        label: "ab",
        quantity: state.tickets.ab * state.tickets.total,
        percentage: state.tickets.ab * 100
      }
    ];
  }
};

// actions
const actions = {
  loadSettings({ commit, state }) {
    commit("setLoading", true);
    let sla = !state.sla.length
      ? request({
          url: "/api/v2/sla_policies",
          method: "get"
        })
      : state.sla;
    let hours = !state.business_hours.length
      ? request({
          url: "/api/v2/business_hours",
          method: "get"
        })
      : state.business_hours;
    return Promise.all([sla, hours])
      .then(response => {
        commit("SET_SLA", response[0]);
        commit("SET_HOURS", response[1]);
      })
      .finally(() => commit("setLoading", false));
  },
  forceLoadSettings({ commit, dispatch }) {
    commit("SET_SLA", []);
    commit("SET_HOURS", []);
    dispatch("loadSettings");
  }
};

// mutations
const mutations = {
  setLoading(state, payload) {
    state.loading = payload;
  },
  SET_SLA(state, payload) {
    state.sla = payload;
  },
  SET_HOURS(state, payload) {
    state.business_hours = payload;
  }
};

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
};
