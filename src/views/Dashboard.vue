<template>
  <v-container
    min-width="400"
    class="d-flex flex-column justify-space-around align-stretch"
    fluid
  >
    <v-row>
      <v-col cols="12" sm="6" lg="3">
        <material-stats-card
          color="success"
          icon="mdi-tag-plus"
          :title="$vuetify.lang.t('$vuetify.cards.created')"
          :value="items.length"
          sub-icon=""
          sub-text=""
        />
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <material-stats-card
          color="info"
          icon="mdi-ticket-confirmation"
          :title="$vuetify.lang.t('$vuetify.cards.open')"
          :value="items.length - getTicketbyStatus(5)"
          sub-icon=""
          sub-text=""
        />
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <material-stats-card
          color="grey"
          icon="mdi-ticket-outline"
          :title="$vuetify.lang.t('$vuetify.cards.closed')"
          :value="getTicketbyStatus(5)"
          sub-icon=""
          sub-text=""
        />
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <material-stats-card
          color="warning"
          icon="mdi-ticket-account"
          :title="$vuetify.lang.t('$vuetify.cards.assigned')"
          :value="getTicketbyStatus(8)"
          sub-icon=""
          sub-text=""
        />
      </v-col>
    </v-row>
    <char-tickets-by-type />
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { mapCacheActions } from "vuex-cache";
import asPercentage from "@/utilities/asPercentage";
import MaterialStatsCard from "@/components/base/MaterialStatsCard";
import CharTicketsByType from "@/components/chars/tickets/byType";

export default {
  components: {
    MaterialStatsCard,
    CharTicketsByType,
  },
  data: () => ({}),
  created() {
    this.getTickets();
  },
  computed: {
    ...mapState({
      loading: (state) => state.tickets.loading,
      items: (state) => state.tickets.items,
    }),
    ...mapGetters({
      getTicketbyStatus: "getTicketbyStatus",
    }),
  },
  methods: {
    ...mapCacheActions({ getTickets: "queryItems" }),
    asPercentage,
  },
};
</script>
