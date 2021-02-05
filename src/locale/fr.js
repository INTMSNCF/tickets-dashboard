import fr from "vuetify/lib/locale/fr";

export default {
    // rules
    fields: "* champs obligatoires",
    rule: {
        required: "{0} est obligatoire."
    },
    //page login
    login: "Se connecter",
    logout: "Se déconnecter",
    username: "Email",
    password: "Mot de passe",
    login_account: "Compte",
    title: "Workspace",
    subtitle: "Connexion au tableau",
    option: "Rester connecté",

    //modal RGPD
    dialog: {
        header: "Termes et Conditions",
        body: "Dans le cadre de la RGPD Règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016, relatif à la protection des personnes physiques à l'égard du traitement des données à caractère personnel et à la libre circulation de ces données, et abrogeant la directive 95/46/CE (règlement général sur la protection des données), nous vous informons que seule l’adresse mail et le mot de passe (mot de passe FRESHDESK) sont collectés et stockés sur le poste de travail",
        option1: "Désaccord",
        option2: "Accord",
        save: "Sauvegarder",
        close: "Fermer",
        send: "Envoyer un e-mail d'activation"
    },
    snackbar: {
        body: "E-mail d'activation envoyé"
    },
    //menu
    dashboard: "Tableau de bord",
    bar: {
        dateLabel: "Date sélectionnée"
    },
    settings: (() => {
        let current = new String("Paramètres");
        current.tickets = {
            title: "Tickets",
            info: "Demande administrative ou d’information",
            ab: "Anomalie Bloquante",
            anb: "Anomalie Non-Bloquante"
        };
        current.business_hours = {
            title: "Horaires d'ouvertures",
            day: "Jour",
            day_start: "Ouverture",
            day_end: "Fermeture",
            time_zone: "Fuseau horaire",
            dayNames: {
                monday: "Lundi",
                tuesday: "Mardi",
                wednesday: "Mercredi",
                thursday: "Jeudi",
                friday: "Vendredi",
                saturday: "Samedi",
                sunday: "Dimanche"
            }
        };
        current.holidays = {
            title: "Jours fériés",
            name: "Nom",
            date: "Date"
        };
        current.sla = {
            title: "Engagement de Service",
            name: "Nom",
            date: "Jour",
            priority: "Priorité",
            respond: "Réponse",
            resolve: "Résolution",
            priorities: {
                priority_4: "Urgent",
                priority_3: "Haut",
                priority_2: "Moyen",
                priority_1: "Faible"
            }
        };
        return current;
    })(),
    //footer
    footer: {
        copy: "droits de reproduction autorisée"
    },
    // General
    new: "Nouveau",
    new_: "Nouvel",
    // Users
    users: "Utilisateurs",
    user: {
        label: {
            title: "Utilisateur"
        },
        active: "Actif",
        address: "Adresse",
        company_id: "Identifiant de l'entreprise",
        description: "Description",
        email: "E-mail",
        id: "ID",
        job_title: "Profession",
        language: "Langue",
        mobile: "Téléphone Portable",
        name: "Nom",
        phone: "Téléphone",
        time_zone: "Fuseau horaire",
        twitter_id: "Twitter",
        custom_fields: {
            socit_: "Société"
        },
        facebook_id: "Facebook",
        created_at: "Crée",
        updated_at: "Mis à jour",
        csat_rating: "Rating",
        preferred_source: "Préférence",
        unique_external_id: "ID Externe",
        twitter_profile_status: "Twitter: Profile Status",
        twitter_followers_count: "Twitter: folowers"
    },
    // Tickets
    tickets: "Tickets",
    ticket: {
        label: {
            title: "Ticket"
        },
        cc_emails: "CC", //Email address added in the 'cc' field of the incoming ticket email
        fwd_emails: "FWD", //Email address(e)s added while forwarding a ticket
        reply_cc_emails: "CC", //Email address added while replying to a ticket
        ticket_cc_emails: "CC", //Email address added while replying to a ticket
        fr_escalated: "Escalade", //Set to true if the ticket has been escalated as the result of first response time being breached
        spam: "Spam", //Set to true if the ticket has been marked as spam
        email_config_id: "Email ID", //ID of email config which is used for this ticket
        group_id: "Groupe ID", //ID of the group to which the ticket has been assigned
        priority: {
            label: "Priorité",
            level_1: {
                color: "white",
                label: "faible"
            },
            level_2: {
                color: "white",
                label: "moyen"
            },
            level_3: {
                color: "white",
                label: "haut"
            },
            level_4: {
                color: "white",
                label: "urgent"
            }
        },
        requester_id: "Utilisateur ID", //User ID of the requester
        responder_id: "Agent ID", //ID of the agent to whom the ticket has been assigned
        source: {
            label: "Origine",
            source_1: {
                color: "white",
                label: "email"
            },
            source_2: {
                color: "white",
                label: "portail"
            },
            source_3: {
                color: "white",
                label: "téléphone"
            },
            source_7: {
                color: "white",
                label: "chat"
            },
            source_9: {
                color: "white",
                label: "widget"
            },
            source_10: {
                color: "white",
                label: "sortant"
            }
        }, //The channel through which the ticket was created
        company_id: "Entreprise ID", //Company ID of the requester
        company: "Entreprise", //Company ID of the requester
        status: (() => {
            let current = new String("Statut");
            current.status_1 = {
                color: "white",
                label: "-"
            };
            current.status_2 = {
                color: "white",
                label: "Ouvert"
            };
            current.status_3 = {
                color: "white",
                label: "En attente"
            };
            current.status_4 = {
                color: "white",
                label: "Résolu"
            };
            current.status_5 = {
                color: "white",
                label: "Fermé"
            };
            return current;
        })(),
        subject: "Objet", //Subject of the ticket
        title: "Objet", //Subject of the ticket
        description: "Description",
        association_type: {
            label: "Association",
            type_1: {
                color: "white",
                label: "Parent"
            },
            type_2: {
                color: "white",
                label: "Enfant"
            },
            type_3: {
                color: "white",
                label: "Traqueur"
            },
            type_4: {
                color: "white",
                label: "En relation"
            }
        },
        to_emails: "Destination", //Email addresses to which the ticket was originally sent
        product_id: "Produit ID", //D of the product to which the ticket is associated
        id: "ID",
        type: "Type",
        due_by: "Résolu", //Timestamp that denotes when the ticket is due to be resolved
        fr_due_by: "Réponse", //Timestamp that denotes when the first response is due
        is_escalated: "Escalade", //Set to true if the ticket has been escalated for any reason
        created_at: "Créé", //Ticket creation timestamp
        open_at: "Créé", //Ticket creation timestamp
        updated_at: "Mis à jour", //Ticket updated timestamp
        associated_tickets_count: "Assiciates",
        tags: "Mots clés", //Tags that have been associated with the ticket
        stats: {
            agent_responded_at: "Agent a répondu à",
            requester_responded_at: "Demandeur a répondu à",
            first_responded_at: "Premier répondant",
            status_updated_at: "Statut mis à jour à",
            reopened_at: "Rouvert à",
            resolved_at: "Résolu à",
            closed_at: "Fermé à",
            pending_since: "En attente depuis"
        },
        closed_at: "Fermé à",
        first_responded_at: "Première réponse",
        software: "Logiciel",
        criticality: "Priorité",
        responsable: "Qui",
        phase: "Statut",
        open_hours: "HO",
        typeDisplay: "Type",
        statusDisplayShort: "Statut",
        statusDisplayLong: "Statut detaillé",
        tpc: "TPC",
        tct: "TCt",
        tcr: "TCr",
        waiting_form_client: "TAC",
        waiting_from_service: "TAS",
        requester: "Demandeur",
        requesterDisplay: "Compte Habilité",
        responderDisplay: "Répondeur",
        responder: "Répondeur",
        service: "Service",
        satisfaction: "Satisfaction",
        open_hours: "HO",
        not_open_hours: "HNO"
    },
    // general
    actions: "Info",

    //tooltip
    tooltip: {
        refresh: "Rafraîchir",
        logout: "Déconnexion",
        create: "Créer",
        cvs: "Format CVS",
        excel: "Format Excel",
        download: "Télécharger"
    },

    error: {
        exist: "L'email existe déjà"
    },

    //dashboard cards
    cards: {
        closed: "Fermé",
        open: "Ouvert",
        created: "Crée",
        running: "En Cours"
    },
    ...fr
};