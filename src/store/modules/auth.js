import request from '@/plugins/request'

const state = {
  access_token: null,
  expires_in: 3600,
  username: null,
  password: null,
  avatar: null
}
const getters = {
  getAccessToken: (state) => {
    return {
      username: state.username,
      password: state.password
    }
  },
  getAvatar: (state) => state.avatar,
  getUsername: (state) => state.username
}
const actions = {
  login({ commit, dispatch }) {
    return request({
      url: '/api/v2/settings/helpdesk',
      method: 'get'
    }).then((resp) => {
      // succes login
    })
  },
  logout({ commit }) {
    commit('SET_ACCESS_TOKEN', null)
  }
}
const mutations = {
  SET_CREDENTIALS(state, { username, password }) {
    state.username = username
    state.password = password
  }
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
}
