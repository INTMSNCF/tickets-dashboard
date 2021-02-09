import request from "@/plugins/request";
import _ from "lodash";

const state = {
    loading: false,
    dialog: false,
    fields: [],
    softwares: []
};

// getters
const getters = {};

// actions
const actions = {
    queryFields(context) {
        context.state.loading = true;
        return request({
            url: "https://intm.freshdesk.com/api/v2/ticket_fields?per_page=100",
            method: "get"
        }).then(data => {
            context.commit("setFieldList", data);
            return data;
        });
    },
    querySoftwareItems(context) {
        context.state.loading = true;
        return context.dispatch("queryFields").then(data => {
            context.commit(
                "setSoftwareList",
                data.find(item => item.name === "cf_logicielle")
            );
            context.state.loading = false;
        });
    }
};

// mutations
const mutations = {
    setFieldList(state, data) {
        state.fields = data;
    },
    setSoftwareList(state, field) {
        state.softwares = _.reduce(
            field.choices,
            (result, versions, software) => {
                let softwareVersions = Object.keys(versions).map(version => ({
                    label: `${software} ${version}`,
                    value: {
                        name: software,
                        version
                    }
                }));
                return [...result, ...softwareVersions];
            }, []
        );
    }
};

export default {
    namespace: true,
    state,
    getters,
    actions,
    mutations
};