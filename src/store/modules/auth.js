import request from "@/plugins/request";

const state = {
  isLoged: false,
  expires_in: 3600,
  username: null,
  password: null,
  avatar: null
};
const getters = {
  getAccessToken: state => {
    return {
      username: state.username,
      password: state.password
    };
  },
  getIsLoged: state => state.isLoged,
  getAvatar: state => state.avatar,
  getUsername: state => state.username
};
const actions = {
  login({ commit }) {
    return request({
      url: "/api/v2/settings/helpdesk",
      method: "get"
    }).then(() => {
      commit("SET_LOGED", true);
    });
  },
  logout({ commit }) {
    commit("SET_LOGED", false);
  }
};
const mutations = {
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
