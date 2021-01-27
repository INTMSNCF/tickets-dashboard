import dayjs from "@/plugins/moment";
import _ from "lodash";

export default class User {
    constructor(original) {
        this.user = {
            active: original.active,
            address: original.address,
            company_id: original.company_id,
            description: original.description,
            email: _.get(this.name, "email", "-"),
            id: original.id,
            job_title: original.job_title,
            language: "fr",
            mobile: _.get(this.name, "mobile", "-"),
            name: original.name,
            phone: _.get(this.name, "phone", "-"),
            time_zone: "Paris",
            twitter_id: null,
            custom_fields: {
                socit_: _.get(original, "custom_fields.socit_", "-")
            },
            facebook_id: null,
            created_at: dayjs(original.created_at),
            updated_at: dayjs(original.updated_at),
            csat_rating: null,
            preferred_source: "email",
            unique_external_id: null,
            twitter_profile_status: false,
            twitter_followers_count: null
        };
        return this.user;
    }
}