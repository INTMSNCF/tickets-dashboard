import request from "@/plugins/request";
import router from "@/router";

const state = {
  isLoged: false,
  rememberMe: false,
  username: null,
  password: null
};
const getters = {
  getAccessToken: state => {
    return {
      username: state.username,
      password: state.password
    };
  },
  getIsLoged: state => state.isLoged,
  getUsername: state => state.username
};
const actions = {
  login({ commit, dispatch }) {
    return request({
      url: "/api/v2/settings/helpdesk",
      method: "get"
    }).then(() => {
      commit("SET_LOGED", true);
      dispatch("loadSettings");
    });
  },
  logout({ commit }) {
    commit("SET_LOGED", false);
    commit("SET_RGPD", false);
  }
};
const mutations = {
  SET_RGPD(state, playload) {
    state.rememberMe = playload;
    if (state.rememberMe) {
      window.localStorage.setItem("rememberMe", true);
    } else {
      window.localStorage.removeItem("rememberMe");
      window.localStorage.removeItem(window.localStorage.subdomine);
      window.localStorage.removeItem(window.sessionStorage.subdomine);
      router.push({ name: "login" });
    }
  },
  SET_CREDENTIALS(state, { username, password }) {
    state.username = username;
    state.password = password;
  },
  SET_LOGED(state, { loged }) {
    state.isLoged = loged;
  }
};

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
};
