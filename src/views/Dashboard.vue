<template>
  <v-container>
    <v-data-table
      dense
      :headers="headers"
      :loading="loading"
      :items="items"
      item-key="id"
      loading-text="Chargement des tickets... attendez"
    >
      <template v-slot:[`item.updated_at`]="{ item }">
        {{ formatDate(item.updated_at) }}
      </template>
      <template v-slot:[`item.created_at`]="{ item }">
        {{ formatDate(item.created_at) }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="infoItem(item)"
          >mdi-information</v-icon
        >
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Ticket #{{ selectedItem.id }} </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            ticket info:
            <p>{{ selectedItem }}</p>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import dayjs from "dayjs";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      selectedItem: { id: null },
      headers: [
        {
          text: this.$vuetify.lang.t("$vuetify.ticke.id"),
          align: "start",
          sortable: false,
          value: "id",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.ticke.subject"),
          align: "start",
          sortable: false,
          value: "subject",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.ticke.type"),
          align: "start",
          sortable: false,
          value: "type",
        },
        // {
        //   text: this.$vuetify.lang.t("$vuetify.ticke.status.label"),
        //   align: "start",
        //   sortable: false,
        //   value: "status",
        // },
        {
          text: this.$vuetify.lang.t("$vuetify.ticke.created_at"),
          align: "start",
          sortable: false,
          value: "created_at",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.ticke.updated_at"),
          align: "start",
          sortable: false,
          value: "updated_at",
        },
        // {
        //   text: this.$vuetify.lang.t("$vuetify.ticke.stats.agent_responded_at"),
        //   align: "start",
        //   sortable: false,
        //   value: "agent_responded_at",
        // },
        // {
        //   text: this.$vuetify.lang.t("$vuetify.ticke.stats.requester_responded_at"),
        //   align: "start",
        //   sortable: false,
        //   value: "requester_responded_at",
        // },
        // {
        //   text: this.$vuetify.lang.t("$vuetify.ticke.stats.first_responded_at"),
        //   align: "start",
        //   sortable: false,
        //   value: "first_responded_at",
        // },
        // {
        //   text: this.$vuetify.lang.t("$vuetify.ticke.stats.status_updated_at"),
        //   align: "start",
        //   sortable: false,
        //   value: "status_updated_at",
        // },
        // {
        //   text: this.$vuetify.lang.t("$vuetify.ticke.stats.reopened_at"),
        //   align: "start",
        //   sortable: false,
        //   value: "reopened_at",
        // },
        // {
        //   text: this.$vuetify.lang.t("$vuetify.ticke.stats.resolved_at"),
        //   align: "start",
        //   sortable: false,
        //   value: "resolved_at",
        // },
        // {
        //   text: this.$vuetify.lang.t("$vuetify.ticke.stats.closed_at"),
        //   align: "start",
        //   sortable: false,
        //   value: "closed_at",
        // },
        // {
        //   text: this.$vuetify.lang.t("$vuetify.ticke.stats.pending_since"),
        //   align: "start",
        //   sortable: false,
        //   value: "pending_since",
        // },
        {
          text: this.$vuetify.lang.t("$vuetify.actions"),
          value: "actions",
          sortable: false,
        },
      ],
    };
  },
  created() {
    this.getTickets();
  },
  computed: {
    ...mapState({
      loading: (state) => state.tickets.loading,
      items: (state) => state.tickets.items,
    }),
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
    ...mapActions({ getTickets: "queryItems" }),
    infoItem(item) {
      this.selectedItem = item;
      this.dialog = true;
    },
    formatDate(value) {
      return dayjs(value).format("L");
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.selectedItem = { id: null };
      });
    },
  },
};
</script>
