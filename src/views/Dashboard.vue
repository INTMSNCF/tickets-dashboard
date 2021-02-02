<template>
  <v-container
    min-width="400"
    class="d-flex flex-column justify-space-around align-stretch"
    fluid
  >
    <v-row>
      <v-col>
        <v-card light> Matrix by month </v-card>
        <v-card light> Total tickets list (status)</v-card>
        <v-card light> First Response</v-card>
        <v-card light> SLA coverture</v-card>
        <v-card light> Radial type count by status </v-card>
        <v-card light> List Count by type </v-card>
        <v-card light> Radial type avg % TPC, TCt and TCr </v-card>
        <v-card light> Donut by TPC (g,j,r)</v-card>
        <v-card light> Donut by TCt (g,j,r)</v-card>
        <v-card light> Donut by TCr (g,j,r)</v-card>
        <v-card light> Donut by Satisfaction </v-card>
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
          data: [40, 39, 10, 40, 39, 80, 40],
        },
      ],
    },
    barOptions: { responsive: true, maintainAspectRatio: false },
  }),
  created() {
    this.getTickets();
  },
  computed: {
    ...mapState({
      loading: (state) => state.tickets.loading,
      items: (state) => state.tickets.items,
    }),
  },
  methods: {
    ...mapCacheActions({ getTickets: "queryItems" }),
    asPercentage,
  },
};
</script>
<style>
</style>