<template>
  <v-container
    min-width="400"
    class="d-flex flex-column justify-space-around align-stretch"
    fluid
  >
    <v-row>
      <v-col cols="12" sm="6" lg="3">
        <v-card class="ma-3">
          <v-list-item>
            <v-list-item-avatar tile class="mt-n7">
              <v-sheet color="success" width="100" height="100" elevation="10">
              </v-sheet>
            </v-list-item-avatar>
            <v-list-item-content>
              <div class="overline text-right">
                {{ $vuetify.lang.t("$vuetify.cards.created") }}
              </div>
              <v-list-item-title class="headline mb-1 text-right"
                >6</v-list-item-title
              >
              <div><v-divider></v-divider></div>
            </v-list-item-content>
          </v-list-item>
        </v-card> </v-col
      ><v-col cols="12" sm="6" lg="3">
        <v-card class="ma-3">
          <v-list-item>
            <v-list-item-avatar tile class="mt-n7">
              <v-sheet color="info" width="100" height="100" elevation="10">
              </v-sheet>
            </v-list-item-avatar>
            <v-list-item-content>
              <div class="overline text-right">
                {{ $vuetify.lang.t("$vuetify.cards.open") }}
              </div>
              <v-list-item-title class="headline mb-1 text-right"
                >6</v-list-item-title
              >
              <div><v-divider></v-divider></div>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <v-card class="ma-3">
          <v-list-item>
            <v-list-item-avatar tile class="mt-n7">
              <v-sheet color="grey" width="100" height="100" elevation="10">
              </v-sheet>
            </v-list-item-avatar>
            <v-list-item-content>
              <div class="overline text-right">
                {{ $vuetify.lang.t("$vuetify.cards.closed") }}
              </div>
              <v-list-item-title class="headline mb-1 text-right"
                >6</v-list-item-title
              >
              <div><v-divider></v-divider></div>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <v-card class="ma-3">
          <v-list-item>
            <v-list-item-avatar tile class="mt-n7">
              <v-sheet color="warning" width="100" height="100" elevation="10">
              </v-sheet>
            </v-list-item-avatar>
            <v-list-item-content>
              <div class="overline text-right">
                {{ $vuetify.lang.t("$vuetify.cards.assigned") }}
              </div>
              <v-list-item-title class="headline mb-1 text-right"
                >6</v-list-item-title
              >
              <div><v-divider></v-divider></div>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { mapCacheActions } from "vuex-cache";
import asPercentage from "@/utilities/asPercentage";

export default {
  components: {},
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
    })
  },
  methods: {
    ...mapCacheActions({ getTickets: "queryItems" }),
    asPercentage
  }
};
</script>
<style></style>
