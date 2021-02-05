<template>
  <material-card
    class="v-card--material-stats"
    v-bind="$attrs"
    v-on="$listeners"
  >
  </material-card>
</template>

<script>
//import stackedChart from "@/components/chars/stackedChart.js";
import MaterialCard from "@/components/base/MaterialCard";

export default {
  name: "TicketsStacked",
  components: {
    MaterialCard
  },
  data() {
    return {
      chartData: null,
      chartOptions: null
    };
  }
};
</script>
