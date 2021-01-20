<template>
  <v-app>
    <app-drawer ref="drawer" />
    <app-bar ref="drawer" />
    <v-main>
      <router-view />
    </v-main>
    <intm-footer />
  </v-app>
</template>

<script>
import AppDrawer from "@/components/AppDrawer";
import AppBar from "@/components/AppBar";
import IntmFooter from "@/components/IntmFooter";
import { mapState, mapActions } from "vuex";

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
    handleDrawerVisiable() {
      this.$refs.drawer.toggleDrawer();
    },
  },
};
</script>
