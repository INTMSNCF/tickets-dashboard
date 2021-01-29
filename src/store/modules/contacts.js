import request from "@/plugins/request";
import User from "@/models/User";

const state = {
    loading: false,
    dialog: false,
    currentUser: false,
    userSaveStatus: false,
    items: []
};

// getters
const getters = {};

// actions
const actions = {
    saveUser({ state, dispatch }, playground) {
        let userToSave = _.get(playground, "user") || state.currentUser;
        state.dialog = false;
        state.loading = true;
        request({
            url: "/api/v2/contacts",
            method: "POST",
            data: userToSave.toFreshDesk()
        }).then(data => {
            console.log("save complete", data);
            dispatch("sendInvitation", data.id);
            dispatch("queryContactItems");
        });
        // TODO: Error Handler / Promise catch and final
    },
    sendInvitation({ state, commit }, playground) {
        state.loading = true;
        state.dialog = false;
        return request({
            url: `/api/v2/contacts/${playground}/send_invite`,
            method: "PUT"
        }).then(data => {
            console.log("invitation sent", data);
            state.loading = false;
            commit("userSaved", "$vuetify.snackbar.body");
            setTimeout(function() {
                commit("userSaved", false);
            }, 2500);
        });
    },
    queryContactItems(context) {
        context.state.loading = true;
        let companies = this.cache.dispatch("queryCompaniesItems");
        let contacts = request({
            url: "/api/v2/contacts?per_page=100",
            method: "get"
        }).then(data => {
            context.commit("setContacts", data);
            context.state.loading = false;
            context.commit("userSaved", false);
        });
        return Promise.all([companies, contacts]);
    }
};

// mutations
const mutations = {
    setContacts(state, data) {
        User.companies = this.state.companies.items;
        state.items = data.map(item => new User(item));
    },
    userSaved(state, data) {
        state.userSaveStatus = data;
    },
    userDialog(state, { user, dialog }) {
        state.currentUser = user || new User({});
        state.dialog = !!dialog;
    }
};

export default {
    namespace: true,
    state,
    getters,
    actions,
    mutations
};