import dayjs from "@/plugins/moment";
import openHourCalculation from "@/utilities/openHourCalculation";
import _ from "lodash";
import XLSX from "xlsx";
import alasql from "@/../node_modules/alasql/dist/alasql.js";
import asPercentage from "@/utilities/asPercentage";

alasql["private"].externalXlsxLib = XLSX;

export function exportData(items, translate, type = "CSV") {
    let param = [
        `tickets-${dayjs().format("YYYY-MM-DD-HHmm")}`,
        { sheetid: "Tickets" },
        items.map(item => item.toSheet(translate, type))
    ];
    alasql(`SELECT * INTO ${type}(?, ?) FROM ?`, param);
}

export const ticketIcons = {
    type: {
        ab: "mdi-format-list-bulleted-square",
        anb: "mdi-format-list-checkbox",
        info: "mdi-format-list-bulleted-triangle ",
        admin: "mdi-format-list-bulleted ",
        none: "mdi-not-equal-variant",
        "": "mdi-format-list-bulleted-type "
    },
    stauts: {
        "0": "mdi-tag-plus",
        "2": "mdi-ticket-confirmation",
        "7": "mdi-ticket-account",
        "8": "mdi-ticket-account",
        "3": "mdi-ticket-account",
        "4": "mdi-ticket-outline",
        "5": "mdi-ticket-outline",
        "6": "mdi-ticket-account",
        "11": "mdi-ticket-outline"
    }
};

export default class Ticket {
    static now = dayjs();
    static contacts = [];
    static companies = [];
    static satisfactions = [];
    static settings = [];
    static types = {
        "Anomalie bloquante": "ab",
        "Anomalie non bloquante": "anb",
        "Demande d'information": "info",
        "Demande administrative": "admin",
        "Ne pas prendre en compte": "none"
    };
    static satisfactionRating = {
        "3": {
            text: "Extremely Happy",
            color: "success",
            icon: "mdi-emoticon-happy-outline"
        },
        "2": {
            text: "Very Happy",
            color: "success",
            icon: "mdi-emoticon-happy-outline"
        },
        "1": {
            text: "Happy",
            color: "success",
            icon: "mdi-emoticon-happy-outline"
        },
        "0": {
            text: "Neutral",
            color: "primary",
            icon: "mdi-emoticon-neutral-outline"
        },
        "-1": {
            text: "Unhappy",
            color: "error",
            icon: "mdi-emoticon-angry-outline"
        },
        "-2": {
            text: "Very Unhappy",
            color: "error",
            icon: "mdi-emoticon-angry-outline"
        },
        "-3": {
            text: "Extremely Unhappy",
            color: "error",
            icon: "mdi-emoticon-angry-outline"
        }
    };
    static statusList = {
        "2": ["Open", "Ouvert"],
        "7": ["Waiting on Third Party", "En attente d'un tiers"],
        "8": ["In Progress", "En cours de traitement"],
        "3": ["Pending", "En attente de votre réponse"],
        "4": ["Resolved", "Le ticket a été résolu"],
        "5": ["Closed", "Le ticket a été fermé"],
        "6": ["Waiting on Customer", "En attente de votre réponse"],
        "11": ["Canceled", "Annulé"]
    };
    static calculateHours(start, end) {
        return openHourCalculation(
            start,
            end || now,
            Ticket.businessHours,
            Ticket.hollyDays
        );
    }
    static async factory(obj) {
        return new Ticket(obj);
    }
    oringinal = {};
    constructor(original) {
        this.oringinal = original;
        this.id = original.id;
        this.open_at = null;
        if (original.created_at) this.open_at = dayjs(original.created_at);
        let firstRespondedAt = _.get(original, "stats.first_responded_at", null);
        this.first_responded_at = firstRespondedAt ? dayjs(firstRespondedAt) : null;
        let resolvedAt = _.get(original, "stats.resolved_at", null);
        this.resolved_at = resolvedAt ? dayjs(resolvedAt) : null;
        this.updated_at = dayjs(original.updated_at);
        let closedAt = _.get(original, "stats.closed_at", null);
        this.closed_at = closedAt ? dayjs(closedAt) : null;
        this.title = original.subject;
        this.description = {
            html: original.description,
            plain: original.description_text
        };
        let software = _.get(original, "custom_fields.cf_logicielle", "-") || "-";
        let version = _.get(original, "custom_fields.cf_version", "") || "";
        this.software = `${software} ${version}`.trim();
        this.criticality = _.get(original, "custom_fields.cf_criticit", "-") || "-";
        this.typeDisplay = original.type;
        this.type = Ticket.types[original.type];
        this.status = original.status;
        this.statusDisplayShort = _.get(Ticket.statusList, this.status, "-")[0];
        this.statusDisplayLong = _.get(Ticket.statusList, this.status, "-")[1];
        this.requester =
            Ticket.contacts.find(item => item.id === original.requester_id) || {};
        this.requester.toString = function() {
            return this.name || "-";
        };
        this.requesterDisplay = _.get(this.requester, "email", "-");
        this.service = _.get(this.requester, "job_title", "-");
        this.company =
            Ticket.companies.find(
                item => item.id === (original.company_id || 77000016631)
            ) || {};
        this.company.toString = function() {
            return this.name || "-";
        };
        this.open_hours = 0;
        this.open_in_business_hours = false;
        this.not_open_hours = 0;
        this.tpc = 0;
        this.tpcCible = 0;
        this.tct = 0;
        this.tctCible = 0;
        this.tcr = 0;
        this.tcrCible = 0;
        this.waiting_form_client = 0;
        this.waiting_from_service = 0;
        this.satisfactions = Ticket.satisfactions.filter(
            item => item.ticket_id === this.id
        );
        if (this.satisfactions.length) {
            this.satisfaction = this.satisfactions.reduce(
                (total, item) =>
                (total += total + (_.get(item, "ratings.default_question", 0) % 100)),
                0
            );
            if (this.satisfaction) this.satisfaction /= this.satisfactions.length;
        } else this.satisfaction = null;
        this.satisfactionText = _.get(
            Ticket.satisfactionRating,
            `${this.satisfaction}.text`,
            "-"
        );
        this.satisfactionIcon = _.get(
            Ticket.satisfactionRating,
            `${this.satisfaction}.icon`,
            "mdi-none"
        );
        this.satisfactionColor = _.get(
            Ticket.satisfactionRating,
            `${this.satisfaction}.color`,
            "transparent"
        );
        this.sla = _.get(
            Ticket.settings.find(
                sla =>
                _.get(sla, "applicable_to.ticket_types", []).indexOf(this.type) >= 0
            ) || Ticket.settings.find(sla => sla.is_default),
            "sla_target.priority_4", {
                respond_within: 360,
                resolve_within: 432000,
                business_hours: true,
                escalation_enabled: true,
                notConfig: true
            }
        );

        // Generation of calculated properties
        this.refreshTimes(Ticket.now);
    }
    refreshTimes(now) {
            if (!dayjs.isDayjs(now)) throw "Calculation is not Dayjs";
            if (dayjs.isDayjs(this.open_at)) {
                let useNow = now || Ticket.now;
                this["#calculateHoHno"](useNow);
                this["#calculateTPC"](useNow);
                this["#calculateTCr"](useNow);
                this["#calculateTCt"](useNow);
            }
            return this;
        }
        ["#calculateHoHno"](now) {
            this.open_in_business_hours =
                Ticket.calculateHours(
                    this.open_at,
                    this.open_at.add(1, "s")
                ).open.asSeconds() == 1;
            let { open, close } = Ticket.calculateHours(
                this.open_at,
                this.closed_at || now
            );
            this.open_hours = open;
            this.not_open_hours = close;
        }
        ["#calculateTPC"](now) {
            if (!this.first_responded_at) this.tpc = null;
            else
                this.tpc = Ticket.calculateHours(
                    this.open_at,
                    dayjs.min(this.first_responded_at, now)
                ).open;
            this["#calculateTPCCible"](now);
        }
        ["#calculateTPCCible"](now) {
            let secondsCalculation;
            try {
                secondsCalculation = (
                    this.tpc || Ticket.calculateHours(this.open_at, now).open
                ).asSeconds();
            } catch {
                secondsCalculation = 0;
            }
            this.tpcCible = Number(
                ((secondsCalculation / this.sla.respond_within) * 100).toFixed(2)
            );
        }
        ["#calculateTCr"](now) {
            if (!this.closed_at) this.tcr = null;
            else
                this.tcr = Ticket.calculateHours(
                    this.open_at,
                    dayjs.min(this.closed_at || now, now)
                ).open;
            this["#calculateTCrCible"](now);
        }
        ["#calculateTCrCible"](now) {
            let secondsCalculation;
            try {
                secondsCalculation = (
                    this.tcr || Ticket.calculateHours(this.open_at, now).open
                ).asSeconds();
            } catch {
                secondsCalculation = 0;
            }
            this.tcrCible = Number(
                ((secondsCalculation / this.sla.resolve_within) * 100).toFixed(2)
            );
        }
        ["#calculateTCt"](now) {
            if (!this.resolved_at) this.tct = null;
            else
                this.tct = Ticket.calculateHours(
                    this.open_at,
                    dayjs.min(this.resolved_at, now)
                ).open;
            this["#calculateTCtCible"](now);
        }
        ["#calculateTCtCible"](now) {
            let secondsCalculation;
            try {
                secondsCalculation = (
                    this.tct || Ticket.calculateHours(this.open_at, now).open
                ).asSeconds();
            } catch {
                secondsCalculation = 0;
            }
            this.tctCible = Number(
                (
                    (secondsCalculation /
                        (this.sla.next_respond_within || this.sla.resolve_within)) *
                    100
                ).toFixed(2)
            );
        }
    toFreshDesk(version) {
        let htmlText = _.get(this, "description.html", "");
        return {
            description: this.description_text,
            subject: this.title,
            requester_id: this.requester.id || this.oringinal.requester_id,
            company_id: this.requester.company_id || this.oringinal.company_id,
            priority: 4,
            source: 2,
            status: 2,
            description: htmlText,
            type: this.type,
            custom_fields: {
                cf_logicielle: _.get(this, "software.name", ""),
                cf_version: _.get(this, "software.version", ""),
                cf_criticit: _.get(this, "criticality", "Non critique")
            },
            tags: ["Tableau de bord v" + version]
        };
    }
    toSheet(lang, type) {
        let result = {};
        result[lang.t("$vuetify.ticket.id")] = this.id;
        result[lang.t("$vuetify.ticket.created_at")] =
            type === "CSV" ? this.open_at.format("L LTS") : this.open_at.toDate();
        result[lang.t("$vuetify.ticket.updated_at")] =
            type === "CSV" ?
            this.updated_at.format("L LTS") :
            this.updated_at.toDate();
        result[lang.t("$vuetify.ticket.title")] = this.title;
        result[lang.t("$vuetify.ticket.software")] = this.software;
        result[lang.t("$vuetify.ticket.criticality")] = this.criticality;
        result[lang.t("$vuetify.ticket.type")] = this.type;
        result[lang.t("$vuetify.ticket.status")] = this.status;
        result[lang.t("$vuetify.ticket.tpc")] = asPercentage(this.tpcCible);
        result[lang.t("$vuetify.ticket.tct")] = asPercentage(this.tctCible);
        result[lang.t("$vuetify.ticket.tcr")] = asPercentage(this.tcrCible);
        return result;
    }
}