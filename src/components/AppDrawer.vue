<template>
  <v-navigation-drawer app permanent expand-on-hover :dark="$vuetify.dark">
    <v-list dense nav>
      <v-list-item class="px-2">
        <v-list-item-title>
          <v-img
            contain
            :src="logoIntm"
            max-height="40"
            position="center left"
          />
        </v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <template v-for="(item, key) in computeMenu">
        <v-list-item
          v-if="!item.meta.hiddenInMenu"
          link
          :key="key"
          :to="item.path"
        >
          <v-list-item-icon>
            <v-icon>{{ item.meta.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ $vuetify.lang.t(`$vuetify.${item.meta.title}`) }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { protectedRoute as routes } from "@/router/config";

import logoIntm from "@/assets/intm_logo.png";

export default {
  name: "AppDrawer",
  components: {},
  data() {
    return {
      logoIntm,
    };
  },

  computed: {
    subdomine() {
      return window.localStorage.subdomine.toUpperCase();
    },
    computeMenu() {
      return routes[0].children;
    },
  },
  created() {},

  methods: {
    toggleDrawer() {
      this.mini = !this.mini;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>