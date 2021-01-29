import dayjs from "@/plugins/moment";
import _ from "lodash";

const withOutCompany = {
    toString() {
        return this.name || "-";
    },
    valueOf() {
        return 0;
    }
};

export default class User {
    static companies = [];
    constructor(original) {
        this.active = original.active;
        this.address = _.get(original, "address", "-") || "-";
        this.company_id = original.company_id;
        this.description = _.get(original, "description", "-") || "-";
        this.email = original.email;
        this.id = original.id;
        this.job_title = _.get(original, "job_title", "-") || "-";
        this.language = "FR";
        this.mobile = _.get(original, "mobile", "-") || "-";
        this.name = original.name;
        this.phone = _.get(original, "phone", "-") || "-";
        this.time_zone = "Paris";
        this.twitter_id = null;
        this.societe =
            User.companies.find(item => item.id === this.company_id) ||
            withOutCompany;
        if (this.societe != withOutCompany) {
            this.societe.toString = function() {
                return this.name;
            };
        }
        this.societyName = this.societe.toString();
        this.facebook_id = null;
        this.created_at = dayjs(original.created_at);
        this.updated_at = dayjs(original.updated_at);
        this.csat_rating = null;
        this.preferred_source = "email";
        this.unique_external_id = null;
        this.twitter_profile_status = false;
        this.twitter_followers_count = null;
    }
    toFreshDesk() {
        return {
            name: this.name,
            email: this.email,
            job_title: this.job_title,
            mobile: this.mobile,
            description: this.description,
            address: this.address,
            company_id: this.company_id || 77000016631,
            language: "FR",
            time_zone: "Paris"
        };
    }
}