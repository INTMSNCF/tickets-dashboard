<template>
  <v-app-bar absolute app color="transparent">
    <v-toolbar-title class="hidden-xs-and-down">{{
      $vuetify.lang.t(`$vuetify.${$route.name}`)
    }}</v-toolbar-title>
    <v-spacer />
    <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn class="ml-2" min-width="0" text v-bind="attrs" v-on="on">
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
import { mapActions } from "vuex";

export default {
  name: "DashboardCoreAppBar",

  methods: {
    ...mapActions({ logout: "logout" }),
  },
};
</script>