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
          <v-toolbar-title v-if="selectedItemUser.id">
            {{ $vuetify.lang.t("$vuetify.user.label.title") }} #{{
              selectedItemUser.id
            }}
          </v-toolbar-title>
          <v-toolbar-title v-else>
            {{ $vuetify.lang.t("$vuetify.new") }}
            {{ $vuetify.lang.t("$vuetify.user.label.title") }}
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <user-view :item="selectedItemUser" @is-valid="userValid" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-if="!selectedItemUser.id"
            class="font-weight-black"
            color="primary"
            @click="saveUser()"
            elevation="5"
            :disabled="!isUserValid"
          >
            <v-icon left>mdi-content-save</v-icon>
            {{ $vuetify.lang.t("$vuetify.dialog.save") }}
          </v-btn>
          <v-btn
            class="font-weight-black"
            color="info"
            :outlined="!selectedItemUser.id"
            @click="userDialog({ dialog: false })"
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
          <v-toolbar-title v-if="selectedItem.id"
            >{{ $vuetify.lang.t("$vuetify.ticke.label.title") }} #{{
              selectedItem.id
            }}</v-toolbar-title
          >
          <v-toolbar-title v-else>
            {{ $vuetify.lang.t("$vuetify.new") }}
            {{ $vuetify.lang.t("$vuetify.ticke.label.title") }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-chip
            v-if="selectedItem.id"
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
          <ticket-view :item="selectedItem" @is-valid="ticketValid" />
        </v-card-text>
        <v-card-actions>
          <small v-if="!selectedItem.id" class="info--text">
            {{
              $vuetify.lang.t("$vuetify.rule.required", [
                $vuetify.lang.t("$vuetify.fields"),
              ])
            }}
          </small>
          <v-spacer></v-spacer>
          <v-btn
            v-if="!selectedItem.id"
            class="font-weight-black"
            color="primary"
            @click="saveTicket()"
            elevation="5"
            :disabled="!isTicketValid"
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
import UserView from "@/components/UserView";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "LayoutDefault",
  components: {
    TicketView,
    UserView,
    AppDrawer,
    AppBar,
    IntmFooter,
  },

  data() {
    return {
      isTicketValid: false,
      showDrawer: true,
    };
  },
  computed: {
    ...mapState({
      loading: (state) => state.settings.loading,
      selectedItem: (state) => state.tickets.currentTicket,
      settings: (state) => {
        let { sla, business_hours, holidays } = state.settings;
        return { sla, business_hours, holidays };
      },
    }),
    dialogTicket: {
      get() {
        return this.$store.state.tickets.dialog;
      },
      set(value) {
        if (!value) this.ticketDialog({ dialog: false });
      },
    },
    dialogUser: {
      get() {
        return this.$store.state.contacts.dialog;
      },
      set(value) {
        if (!value) this.userDialog({ dialog: false });
      },
    },
  },
  created() {
    this.getSettings();
  },
  methods: {
    ...mapActions({
      saveTicket: "saveTicket",
      saveUser: "saveUser",
      getSettings: "loadSettings",
    }),
    ...mapMutations({
      userDialog: "userDialog",
      ticketDialog: "ticketDialog",
    }),
    ticketValid(value) {
      this.isTicketValid = value;
    },
    userValid(value) {
      this.isUserValid = value;
    },
    handleDrawerVisiable() {
      this.$refs.drawer.toggleDrawer();
    },
  },
};
</script>
