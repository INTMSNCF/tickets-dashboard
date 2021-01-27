import request from "@/plugins/request";
import User from "@/models/User";

const state = {
    loading: false,
    dialog: false,
    currentUser: false,
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
        // TODO: send user object to API
        console.log(
            "userSave",
            userToSave.toFreshDesk(document.body.getAttribute("version"))
        );
        dispatch("queryContactItems");
    },
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