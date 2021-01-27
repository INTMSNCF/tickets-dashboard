<template>
  <v-app-bar absolute app color="transparent" flat>
    <v-toolbar-title class="hidden-xs-and-down">{{
      $vuetify.lang.t(`$vuetify.${$route.name}`)
    }}</v-toolbar-title>
    <v-spacer />
    <v-menu offset-y left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="ml-2" min-width="0" icon v-bind="attrs" v-on="on">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-list :tile="false" nav light dense>
        <v-list-item @click="addUser({ user: null, dialog: true })">
          <v-list-item-icon class="mr-1">
            <v-icon>mdi-account-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title
            >{{ $vuetify.lang.t("$vuetify.new") }}
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
              $vuetify.lang.t("$vuetify.ticke.label.title")
            }}</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn icon @click="refresh">
      <v-icon>mdi-cached</v-icon>
    </v-btn>
    <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn class="ml-2" min-width="0" icon v-bind="attrs" v-on="on">
          <v-icon>mdi-account</v-icon>
        </v-btn>
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
// Utilities
import { mapActions, mapMutations } from "vuex";

export default {
  name: "DashboardCoreAppBar",

  methods: {
    ...mapActions({
      logout: "logout",
    }),
    ...mapMutations({
      addUser: "userDialog",
      addTicket: "ticketDialog",
    }),
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
