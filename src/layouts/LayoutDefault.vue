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
              <v-toolbar-title>
                Title
                </v-toolbar-title>
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
  </v-app>
</template>

<script>
import AppDrawer from "@/components/AppDrawer";
import AppBar from "@/components/AppBar";
import IntmFooter from "@/components/IntmFooter";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "LayoutDefault",
  components: {
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
      dialogUser: (state) => state.contacts.dialog,// Vuex
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
    ...mapActions({ getSettings: "loadSettings" }),
    ...mapMutations({closeUserDialog: "closeUserDialog"}),
    handleDrawerVisiable() {
      this.$refs.drawer.toggleDrawer();
    },
  },
};
</script>
