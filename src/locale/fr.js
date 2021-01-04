import fr from "vuetify/lib/locale/fr";

export default {
  // rules
  rule: {
    required: "{0} est requis"
  },
  //page login
  login: "Se connecter",
  logout: "Se deconnecter",
  username: "Email",
  password: "Mot de passe",
  login_account: "Compte",
  title: "Workspace",
  subtitle: "Connexion au tableau",
  option: "Rester connecté",

  //modal RGPD
  dialog_header: "Termes et Conditions",
  dialog_body:
    "Dans le cadre de la RGPD Règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016, relatif à la protection des personnes physiques à l'égard du traitement des données à caractère personnel et à la libre circulation de ces données, et abrogeant la directive 95/46/CE (règlement général sur la protection des données), nous vous informons que seule l’adresse mail et le mot de passe (mot de passe FRESHDESK) sont collectés et stockés sur le poste de travail",
  dialog_option1: "Désaccord",
  dialog_option2: "Accord",

  //menu
  dashboard: "Tableau",
  settings: (() => {
    let current = new String("Réglages");
    current.tickets = {
      title: "Tickets",
      info: "Demandes d’informations ou administrative",
      ab: "Anomalie Bloquante",
      anb: "Anomalie Non-Bloquante"
    };
    current.business_hours = {
      title: "Heures Ouvrées",
      day: "Jour",
      day_start: "Ouvrée",
      day_end: "Fermée",
      time_zone: "Fuseau horaire",
      dayeNames: {
        monday: "Lundi",
        tuesday: "Mardi",
        wednesday: "Mercredi",
        thursday: "Jeudi",
        friday: "Vendredi",
        saturday: "Samedi",
        sunday: "Dimanche"
      }
    };
    current.holydays = {
      title: "Jours fériés",
      name: "Nom",
      date: "Jour"
    };
    current.sla = {
      title: "Convention de Niveau de Service",
      name: "Nom",
      date: "Jour",
      priority: "Priorité",
      respond: "Response",
      resolve: "Resolve",
      priorities: {
        priority_4: "urgent",
        priority_3: "haut",
        priority_2: "moyen",
        priority_1: "faible"
      }
    };
    return current;
  })(),
  //footer
  footer: {
    copy: "droits de reproduction autorisée"
  },
  // Tickets
  ticke: {
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
    status: {
      label: "Statut",
      status_1: {
        color: "white",
        label: "-"
      },
      status_2: {
        color: "white",
        label: "Ouvert"
      },
      status_3: {
        color: "white",
        label: "En attente"
      },
      status_4: {
        color: "white",
        label: "Résolu"
      },
      status_5: {
        color: "white",
        label: "Fermé"
      }
    },
    subject: "Sujet", //Subject of the ticket
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
    id: "Id",
    type: "Catégorie",
    due_by: "Résolu", //Timestamp that denotes when the ticket is due to be resolved
    fr_due_by: "Réponse", //Timestamp that denotes when the first response is due
    is_escalated: "Escalade", //Set to true if the ticket has been escalated for any reason
    created_at: "Créé", //Ticket creation timestamp
    updated_at: "Mettre à jour", //Ticket updated timestamp
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
    software: "Software",
    criticality: "Criticité",
    responsable: "Qui",
    Phase: "Phase",
    open_hours: "HO",
    tpc: "TPC",
    tct: "TCt",
    tcr: "TCr",
    waiting_form_client: "TAC",
    waiting_from_service: "TAS",
    requester: "CH",
    responder: "Service",
    satisfaction: "Satisfaction",
    open_hours: "HO",
    not_open_hours: "HNO"
  },
  // general
  actions: "Actions",
  dialog_title: "Ticket",
  dialog_subtitle: "Ticket info:",
  dialog_close: "Close",

  ...fr
};
