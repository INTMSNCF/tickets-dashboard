<template>
  <v-app>
    <app-drawer ref="drawer" />
    <v-main>
      <router-view />
    </v-main>
    <intm-footer />
  </v-app>
</template>

<script>
import AppDrawer from "@/components/AppDrawer";
import IntmFooter from "@/components/IntmFooter";
import { mapState, mapActions } from "vuex";

export default {
  name: "LayoutDefault",
  components: {
    AppDrawer,
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
        let { sla, business_hours, holydays } = state.settings;
        return { sla, business_hours, holydays };
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
