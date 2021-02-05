<template>
  <v-container
    min-width="400"
    class="d-flex flex-column justify-space-around align-stretch"
    fluid
  >
    <v-row>
      <v-col class="text-right">
        <tickets-stacked
          :right="true"
          color="purple"
          icon="mdi-chart-bar-stacked"
        />
      </v-col>
    </v-row>
    <v-row class="mt-5">
      <v-col cols="12" sm="6" lg="3">
        <material-stats-card
          color="success"
          icon="mdi-tag-plus"
          :title="$vuetify.lang.t('$vuetify.cards.created')"
          :value="items.length"
        />
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <material-stats-card
          color="info"
          icon="mdi-ticket-confirmation"
          :title="$vuetify.lang.t('$vuetify.cards.open')"
          :value="items.length - getTicketbyStatus(5)"
        />
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <material-stats-card
          color="grey"
          icon="mdi-ticket-outline"
          :title="$vuetify.lang.t('$vuetify.cards.closed')"
          :value="getTicketbyStatus(5)"
        />
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <material-stats-card
          color="warning"
          icon="mdi-ticket-account"
          :title="$vuetify.lang.t('$vuetify.cards.running')"
          :value="getTicketbyStatus(8)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { mapCacheActions } from "vuex-cache";
import asPercentage from "@/utilities/asPercentage";
import MaterialStatsCard from "@/components/base/MaterialStatsCard";
import TicketsStacked from "@/components/chars/TicketsStacked";

export default {
  components: { MaterialStatsCard, TicketsStacked },
  data: () => ({
    barData: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Data One",
          backgroundColor: "#ff00ff",
          data: [40, 39, 10, 40, 39, 80, 40]
        }
      ]
    },
    barOptions: { responsive: true, maintainAspectRatio: false }
  }),
  created() {
    this.getTickets();
  },
  computed: {
    ...mapState({
      loading: state => state.tickets.loading,
      items: state => state.tickets.items
    }),
    ...mapGetters({ getTicketbyStatus: "getTicketbyStatus" })
  },
  methods: {
    ...mapCacheActions({ getTickets: "queryItems" }),
    asPercentage
  }
};
</script>
<style></style>
