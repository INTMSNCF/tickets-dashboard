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
        request({
            url: "/api/v2/contacts",
            method: "POST",
            data: userToSave.toFreshDesk()
        }).then(data => {
            console.log("save complete", data);
            // TODO: 4. Dispatch SendInvitation
            dispatch("sendInvitation");
            dispatch("queryContactItems");
        });
    },
    // TODO: 1. Sendinvitation Function
    // TODO: 3. Do Request.
    sendInvitation({ state, dispatch }, playground) {
        //let userToInvite = _.get(playground, "user") || state.currentUser;
        state.loading = true;
        state.dialog = false;
        return request({
            url: "api/v2/contacts/432/send_invite",
            method: "PUT"
                //data: userToInvite.toFreshDesk()
        }).then(data => {
            console.log("invitation sent", data);
            dispatch("queryContactItems");
        });
    },
    queryContactItems(context) {
        context.state.loading = true;
        return request({
            url: "/api/v2/contacts?per_page=100",
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
        state.items = data.map(item => new User(item));
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