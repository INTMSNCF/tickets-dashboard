import dayjs from "@/plugins/moment";
import _ from "lodash";

export default class User {
  constructor(original) {
    this.active = original.active;
    this.address = original.address;
    this.company_id = original.company_id;
    this.description = original.description;
    this.email = original.email;
    this.id = original.id;
    this.job_title = original.job_title;
    this.language = "FR";
    this.mobile = original.mobile;
    this.name = original.name;
    this.phone = original.phone;
    this.time_zone = "Paris";
    this.twitter_id = null;
    this.societe = _.get(original, "custom_fields.socit_", "-") || "-";
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
      custom_fields: {
        socit_: _.get(this, "societe")
      },
      language: "FR",
      time_zone: "Paris"
    };
  }
}
