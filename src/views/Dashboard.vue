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
      <template v-slot:item.updated_at="{ item }">
        {{ formatDate(item.updated_at) }}
      </template>
      <template v-slot:item.created_at="{ item }">
        {{ formatDate(item.created_at) }}
      </template>
      <template v-slot:item.actions="{ item }">
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
          text: "id",
          align: "start",
          sortable: false,
          value: "id",
        },
        {
          text: "Sujet",
          align: "start",
          sortable: false,
          value: "subject",
        },
        {
          text: "Type",
          align: "start",
          sortable: false,
          value: "type",
        },
        // {
        //   text: "Status",
        //   align: "start",
        //   sortable: false,
        //   value: "status",
        // },
        {
          text: "Créé à",
          align: "start",
          sortable: false,
          value: "created_at",
        },
        {
          text: "mis à jour à",
          align: "start",
          sortable: false,
          value: "updated_at",
        },
        // {
        //   text: "l'agent a répondu à",
        //   align: "start",
        //   sortable: false,
        //   value: "agent_responded_at",
        // },
        // {
        //   text: "le demandeur a répondu à",
        //   align: "start",
        //   sortable: false,
        //   value: "requester_responded_at",
        // },
        // {
        //   text: "a répondu pour la première fois à",
        //   align: "start",
        //   sortable: false,
        //   value: "first_responded_at",
        // },
        // {
        //   text: "id",
        //   align: "start",
        //   sortable: false,
        //   value: "statut mis à jour à",
        // },
        // {
        //   text: "rouvert à",
        //   align: "start",
        //   sortable: false,
        //   value: "reopened_at",
        // },
        // {
        //   text: "résolu à",
        //   align: "start",
        //   sortable: false,
        //   value: "resolved_at",
        // },
        // {
        //   text: "fermé à",
        //   align: "start",
        //   sortable: false,
        //   value: "closed_at",
        // },
        // {
        //   text: "en attente depuis",
        //   align: "start",
        //   sortable: false,
        //   value: "pending_since",
        // },
        { text: "Actions", value: "actions", sortable: false },
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
