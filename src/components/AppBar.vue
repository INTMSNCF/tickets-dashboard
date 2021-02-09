<template>
  <v-app-bar absolute app color="transparent" flat>
    <v-toolbar-title class="hidden-xs-and-down">{{
      $vuetify.lang.t(`$vuetify.${$route.name}`)
    }}</v-toolbar-title>
    <v-spacer />
    <v-dialog light ref="dialog" v-model="dateModal" width="290px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn @click.prevent="addMonth" icon
          ><v-icon>mdi-calendar-arrow-right</v-icon></v-btn
        >
        <v-text-field
          dense
          hide-details="auto"
          type="date"
          v-model="simpleDate"
          :label="$vuetify.lang.t(`$vuetify.bar.dateLabel`)"
          readonly
          v-bind="attrs"
          v-on="on"
          class="shrink input-text-centered"
        ></v-text-field>
        <v-btn @click.prevent="subMonth" icon
          ><v-icon>mdi-calendar-arrow-left</v-icon></v-btn
        >
      </template>
      <v-date-picker
        v-model="simpleDate"
        scrollable
        min="2019-01-01"
        :max="maxDate.format('YYYY-MM-DD')"
        @input="dateModal = false"
      />
    </v-dialog>
    <v-menu offset-y left>
      <template v-slot:activator="{ attrs, on: menu }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn
              class="ml-2"
              min-width="0"
              icon
              v-bind="attrs"
              v-on="{ ...menu, ...tooltip }"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>{{ $vuetify.lang.t("$vuetify.tooltip.create") }}</span>
        </v-tooltip>
      </template>
      <v-list :tile="false" nav light dense>
        <v-list-item @click="addUser({ user: null, dialog: true })">
          <v-list-item-icon class="mr-1">
            <v-icon>mdi-account-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title
            >{{ $vuetify.lang.t("$vuetify.new_") }}
            {{
              $vuetify.lang.t("$vuetify.user.label.title")
            }}</v-list-item-title
          >
        </v-list-item>
        <v-list-item @click="addTicket({ ticket: null, dialog: true })">
          <v-list-item-icon class="mr-1">
            <v-icon>mdi-ticket-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title
            >{{ $vuetify.lang.t("$vuetify.new") }}
            {{
              $vuetify.lang.t("$vuetify.ticket.label.title")
            }}</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-menu>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon @click="refresh" v-bind="attrs" v-on="on">
          <v-icon>mdi-cached</v-icon>
        </v-btn>
      </template>
      <span>{{ $vuetify.lang.t("$vuetify.tooltip.refresh") }}</span>
    </v-tooltip>
    <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on: menu }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn
              class="ml-2"
              min-width="0"
              icon
              v-bind="attrs"
              v-on="{ ...menu, ...tooltip }"
            >
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>
          <span>{{ $vuetify.lang.t("$vuetify.tooltip.logout") }}</span>
        </v-tooltip>
      </template>
      <v-list :tile="false" nav light>
        <v-list-item @click="logout">
          <v-list-item-title>{{
            $vuetify.lang.t("$vuetify.logout")
          }}</v-list-item-title>
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import dayjs from "@/plugins/moment";

export default {
  name: "DashboardCoreAppBar",
  data: () => ({
    date: dayjs(),
    maxDate: dayjs(),
    minDate: dayjs("2019-01-01 00:00:00"),
    dateModal: false,
  }),
  computed: {
    simpleDate: {
      get: function () {
        return this.date.format("YYYY-MM-DD");
      },
      set: function (value) {
        this.date = dayjs(value, "YYYY-MM-DD");
        this.setDateCalculation(this.date);
      },
    },
  },
  methods: {
    ...mapActions({
      logout: "logout",
      setDateCalculation: "setDateCalculation",
    }),
    ...mapMutations({
      addUser: "userDialog",
      addTicket: "ticketDialog",
    }),
    addMonth() {
      this.date = dayjs.min(this.date.date(1).add(1, "M"), this.maxDate);
      this.setDateCalculation(this.date);
    },
    subMonth() {
      this.date = dayjs.max(this.date.date(1).subtract(1, "M"), this.minDate);
      this.setDateCalculation(this.date);
    },
    refresh() {
      this.$store.cache.clear();
      this.$nextTick(() => {
        this.$store.cache.dispatch("queryItems");
        this.$store.cache.dispatch("queryContactItems");
      });
    },
  },
};
</script>
<style>
.input-text-centered input {
  text-align: right !important;
}
</style>