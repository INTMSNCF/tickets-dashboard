<template>
  <v-container
    min-width="400"
    class="d-flex flex-column justify-space-around align-stretch"
    fluid
  >
    <v-data-table
      dense
      :headers="headers"
      :loading="loading"
      :items="items"
      :group-by="groupping"
      item-key="id"
      fixed-header
      :footer-props="{ 'items-per-page-options': [20, 40, 60, 80, 100, -1] }"
      :items-per-page="itemsPerPage"
      loading-text="Chargement des tickets... attendez"
      @update:group-by="setGrouBy"
    >
      <template v-slot:[`header.type`]>
        <button @click="groupping = 'type'">
          {{ $vuetify.lang.t("$vuetify.ticke.type") }}
          <v-icon x-small>mdi-filter</v-icon>
        </button>
      </template>
      <template v-slot:[`item.updated_at`]="{ item }">
        {{ item.updated_at.format("L") }}
      </template>
      <template v-slot:[`item.created_at`]="{ item }">
        {{ item.open_at.format("L") }}
      </template>
      <template v-slot:[`item.tpc`]="{ item }">
        {{ item.tpc.humanize() }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="infoItem(item)"
          >mdi-information-outline</v-icon
        >
      </template>
      <template v-slot:[`item.satisfactionIcon`]="{ item }">
        <v-icon
          small
          class="mr-2"
          :color="item.satisfactionColor"
          :title="item.satisfactionText"
          >{{ item.satisfactionIcon }}</v-icon
        >
      </template>
    </v-data-table>
    <v-dialog
      v-model="dialog"
      light
      scrollable
      :fullscreen="$vuetify.breakpoint.smAndDown"
      :hide-overlay="$vuetify.breakpoint.smAndDown"
      max-width="75vw"
    >
      <v-card>
        <v-card-title>
          <span class="headline"
            >{{ $vuetify.lang.t("$vuetify.ticke.label.title") }} #{{
              selectedItem.id
            }}
          </span>
        </v-card-title>
        <v-card-text>
          <ticket-view :item="selectedItem" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">
            {{ $vuetify.lang.t("$vuetify.dialog.close") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import dayjs from "@/plugins/moment";
import { mapState } from "vuex";
import { mapCacheActions } from "vuex-cache";
import TicketView from "@/components/TicketView.vue";

export default {
  components: { TicketView },
  data() {
    return {
      itemsPerPage: 25,
      dialog: false,
      groupping: null,
      selectedItem: { id: null },
      headers: [
        {
          text: this.$vuetify.lang.t("$vuetify.ticke.id"),
          align: "start",
          sortable: false,
          value: "id",
        },
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
        {
          text: this.$vuetify.lang.t("$vuetify.ticke.open_hours"),
          align: "start",
          sortable: false,
          value: "open_hours",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.ticke.subject"),
          align: "start",
          sortable: false,
          value: "title",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.ticke.software"),
          align: "start",
          sortable: false,
          value: "software",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.ticke.criticality"),
          align: "start",
          sortable: false,
          value: "criticality",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.ticke.type"),
          align: "start",
          sortable: false,
          value: "type",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.ticke.status"),
          align: "start",
          sortable: false,
          value: "statusDisplayShort",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.ticke.tpc"),
          align: "start",
          sortable: false,
          value: "tpc",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.ticke.tct"),
          align: "start",
          sortable: false,
          value: "tct",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.ticke.tcr"),
          align: "start",
          sortable: false,
          value: "tcr",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.ticke.satisfaction"),
          align: "start",
          sortable: false,
          value: "satisfactionIcon",
        },
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
    ...mapCacheActions({ getTickets: "queryItems" }),
    infoItem(item) {
      this.selectedItem = item;
      this.dialog = true;
    },
    formatDate(value) {
      return dayjs(value).format("L");
    },
    setGrouBy(value) {
      if (!value) {
        this.groupping = null;
        this.itemsPerPage = 20;
      } else this.itemsPerPage = -1;
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
