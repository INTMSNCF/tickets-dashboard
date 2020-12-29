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
  methods: {
    handleDrawerVisiable() {
      this.$refs.drawer.toggleDrawer();
    },
  },
};
</script>
