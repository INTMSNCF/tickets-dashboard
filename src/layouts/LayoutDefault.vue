<template>
  <v-app>
    <app-drawer ref="drawer" />
    <app-bar ref="drawer" />
    <v-main>
      <router-view />
    </v-main>
    <intm-footer />
    <v-dialog
      v-model="dialogUser"
      light
      scrollable
      :fullscreen="$vuetify.breakpoint.smAndDown"
      :hide-overlay="$vuetify.breakpoint.smAndDown"
      max-width="75vw"
    >
      <v-card>
        <v-toolbar dark flat dense max-height="3em">
          <v-toolbar-title> Title </v-toolbar-title>
        </v-toolbar>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="font-weight-black"
            color="info"
            @click="closeUserDialog"
            elevation="5"
          >
            {{ $vuetify.lang.t("$vuetify.dialog.close") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogTicket"
      light
      scrollable
      :fullscreen="$vuetify.breakpoint.smAndDown"
      :hide-overlay="$vuetify.breakpoint.smAndDown"
      max-width="75vw"
    >
      <v-card>
        <v-toolbar dark flat dense max-height="3em">
          <v-toolbar-title
            >{{ $vuetify.lang.t("$vuetify.ticke.label.title") }} #{{
              selectedItem.id
            }}</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-chip
            class="text-h6"
            text-color="white"
            pill
            :input-value="true"
            :active-class="'status' + selectedItem.status"
          >
            {{ selectedItem.statusDisplayShort }}
          </v-chip>
        </v-toolbar>
        <v-card-text>
          <ticket-view :item="selectedItem" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-if="!selectedItem.id"
            class="font-weight-black"
            color="primary"
            @click="saveTicket()"
            elevation="5"
          >
            <v-icon left>mdi-content-save</v-icon>
            {{ $vuetify.lang.t("$vuetify.dialog.save") }}
          </v-btn>
          <v-btn
            class="font-weight-black"
            color="info"
            :outlined="!selectedItem.id"
            @click="ticketDialog({ dialog: false })"
            elevation="5"
          >
            {{ $vuetify.lang.t("$vuetify.dialog.close") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import AppDrawer from "@/components/AppDrawer";
import AppBar from "@/components/AppBar";
import IntmFooter from "@/components/IntmFooter";
import TicketView from "@/components/TicketView";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "LayoutDefault",
  components: {
    TicketView,
    AppDrawer,
    AppBar,
    IntmFooter,
  },

  data() {
    return {
      showDrawer: true,
    };
  },
  computed: {
    ...mapState({
      loading: (state) => state.settings.loading,
      dialogUser: (state) => state.contacts.dialog, // Vuex
      dialogTicket: (state) => state.tickets.dialog,
      selectedItem: (state) => state.tickets.currentTicket,
      settings: (state) => {
        let { sla, business_hours, holidays } = state.settings;
        return { sla, business_hours, holidays };
      },
    }),
  },
  created() {
    this.getSettings();
  },
  methods: {
    ...mapActions({
      saveTicket: "saveTicket",
      getSettings: "loadSettings",
    }),
    ...mapMutations({
      closeUserDialog: "closeUserDialog",
      ticketDialog: "ticketDialog",
    }),
    handleDrawerVisiable() {
      this.$refs.drawer.toggleDrawer();
    },
  },
};
</script>
