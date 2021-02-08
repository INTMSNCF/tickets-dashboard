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
          :title="$vuetify.lang.t('$vuetify.cards.assigned')"
          :value="getTicketbyStatus(8)"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <material-card
          class="v-card--material-chart"
          color="blue-grey"
          v-bind="$attrs"
          v-on="$listeners"
        >
          <template v-slot:heading>
            <char-tickets-by-type />
          </template>
          <h2 class="card-title font-weight-light mt-2 ml-2">
            Repartition Annuelle
          </h2>
          <v-divider class="mt-1 mb-3" />
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { mapCacheActions } from "vuex-cache";
import MaterialStatsCard from "@/components/base/MaterialStatsCard";
import MaterialCard from "@/components/base/MaterialCard";
import CharTicketsByType from "@/components/chars/tickets/byType";

export default {
  components: {
    MaterialStatsCard,
    CharTicketsByType,
    MaterialCard,
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
  },
};
</script>
