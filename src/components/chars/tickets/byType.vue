<template>
  <div class="d-flex flex-row justify-space-between align-stretch">
    <bar
      :chartData="charByType({ year, month })"
      :options="options"
      style="
        position: relative;
        max-height: 18em;
        background-color: rgba(0, 0, 0, 0.1);
        min-width: 50vw;
        padding: 1em 1em 0 0.5em;
      "
    />
    <v-col min-width="">
      <div
        class="d-flex flex-row justify-space-between align-center align-center mb-2"
      >
        <v-btn @click.prevent="dateBefore" icon
          ><v-icon large>mdi-chevron-left</v-icon></v-btn
        >
        <v-select
          :items="years"
          v-model="year"
          dense
          solo
          hide-details="auto"
        />
        <v-select
          :items="months"
          item-value="value"
          item-text="label"
          v-model="month"
          hide-details="auto"
          dense
          solo
        />
        <v-btn @click.prevent="dateAfter" icon
          ><v-icon large>mdi-chevron-right</v-icon></v-btn
        >
      </div>
      <v-list elevation="3">
        <v-list-item
          v-for="legend in charByType({ year, month }).datasets"
          :key="legend.id"
          dense
          disabled
        >
          <v-list-item-icon>
            <v-icon :style="`color: var(--ticket-type-${legend.id}-color)`">{{
              legend.icon
            }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="legend.label"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <samp x-small>{{
              asPercentage(
                (legend.total / charByType({ year, month }).total) * 100
              )
            }}</samp>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-col>
  </div>
</template>

<script>
import Bar from "@/components/chars/Bar";
import { mapGetters } from "vuex";
import dayjs from "@/plugins/moment";
import asPercentage from "@/utilities/asPercentage";

let maxDate = dayjs();
let currentDate = dayjs("2019-01-01 00:00:00");
let years = [];
let months = [];
let selectedYear = null;
while (currentDate < maxDate) {
  let year = currentDate.year();
  if (years.indexOf(year) < 0) {
    years.unshift(year);
    selectedYear = year;
  }
  if (months.length < 12) {
    months.push({
      label: currentDate.format("MMM"),
      value: Number(currentDate.format("M")),
    });
    currentDate = currentDate.add(1, "M");
    continue;
  }
  currentDate = currentDate.add(1, "y");
}
months.unshift({
  label: "*",
  value: null,
});

export default {
  name: "CharTicketsByType",
  components: {
    Bar,
  },
  data: () => ({
    years,
    months,
    year: selectedYear,
    month: null,
    barLegends: null,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
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
              },
            },
            ticks: {
              get fontColor() {
                return getComputedStyle(
                  document.querySelector("#app")
                ).getPropertyValue("--graph-ligne");
              },
              max: 15,
              min: 0,
              stepSize: 1,
            },
          },
        ],
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
              },
            },
            ticks: {
              get fontColor() {
                return getComputedStyle(
                  document.querySelector("#app")
                ).getPropertyValue("--graph-ligne");
              },
            },
          },
        ],
      },
      tooltips: {
        enabled: false,
      },
      plugins: {
        datalabels: {
          anchor: "end",
          align: "top",
        },
      },
    },
  }),
  computed: {
    ...mapGetters({
      getTicketbyStatus: "getTicketbyStatus",
      charByType: "charByType",
    }),
  },
  methods: {
    dateBefore: function () {
      let date = dayjs(
        `${this.year}-${this.month || "1"}-01`,
        "YYYY-M-DD"
      ).subtract(1, "month");
      if (this.month) {
        this.month = date.month() + 1;
      }
      this.year = this.year = Math.max(
        this.years[this.years.length - 1],
        date.year()
      );
    },
    dateAfter: function () {
      let date = dayjs(
        `${this.year}-${this.month || "12"}-01`,
        "YYYY-M-DD"
      ).add(1, "month");
      if (this.month) {
        this.month = date.month() + 1;
      }
      this.year = Math.min(date.year(), this.years[0]);
    },
    asPercentage,
  },
};
</script>
<style>
.char-legends ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.char-legends li > span {
  padding: 0 0.5em;
  margin: 0 0.5em 0 0;
  border: solid 1px rgba(127, 127, 127, 0.75);
}
</style>
