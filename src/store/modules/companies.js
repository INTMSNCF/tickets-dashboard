import request from "@/plugins/request";

const state = {
    loading: false,
    items: []
};

// getters
const getters = {};

// actions
const actions = {
    queryCompaniesItems(context) {
        context.state.loading = true;
        return request({
            url: "/api/v2/companies",
            method: "get"
        }).then(data => {
            context.commit("setCompanies", data);
            context.state.loading = false;
        });
    }
};

// mutations
const mutations = {
    setCompanies(state, data) {
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