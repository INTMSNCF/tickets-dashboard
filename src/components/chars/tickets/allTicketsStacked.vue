<template>
  <bar
    :chartData="chartByStatus"
    :options="options"
    style="
        position: relative;
        max-height: 25em;
        background-color: rgba(0, 0, 0, 0.1);
        width: 100%;
        min-width: 80vw;
        padding: 1em 1em 0 0.5em;
      "
  />
</template>

<script>
import Bar from "@/components/chars/Bar";
import { mapGetters } from "vuex";

export default {
  name: "AllTicketsStacked",
  components: {
    Bar
  },
  data: () => ({
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: "right"
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              get color() {
                return getComputedStyle(
                  document.querySelector("#app")
                ).getPropertyValue("--graph-ligne");
              },
              get zeroLineColor() {
                return getComputedStyle(
                  document.querySelector("#app")
                ).getPropertyValue("--graph-ligne");
              }
            },
            ticks: {
              get fontColor() {
                return getComputedStyle(
                  document.querySelector("#app")
                ).getPropertyValue("--graph-ligne");
              }
            },
            stacked: true
          }
        ],
        yAxes: [
          {
            gridLines: {
              get color() {
                return getComputedStyle(
                  document.querySelector("#app")
                ).getPropertyValue("--graph-ligne");
              },
              get zeroLineColor() {
                return getComputedStyle(
                  document.querySelector("#app")
                ).getPropertyValue("--graph-ligne");
              }
            },
            ticks: {
              get fontColor() {
                return getComputedStyle(
                  document.querySelector("#app")
                ).getPropertyValue("--graph-ligne");
              },
              min: 0
            },
            stacked: true
          }
        ]
      },
      tooltips: {
        enabled: false
      },
      plugins: {
        datalabels: {
          anchor: "center",
          align: "center",
          color: "white"
        }
      }
    }
  }),
  mounted() {},
  computed: {
    ...mapGetters({
      getTicketbyStatus: "getTicketbyStatus",
      chartByStatus: "chartByStatus"
    })
  }
};
</script>
<style></style>
