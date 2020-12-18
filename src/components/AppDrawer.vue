<template>
  <v-navigation-drawer
    app
    permanent
    :expand-on-hover="!bloked"
    :dark="$vuetify.dark"
  >
    <v-list dense nav>
      <v-list-item class="px-2">
        <v-list-item-title>INTM</v-list-item-title>
        <v-btn icon @click.stop="bloked = !bloked">
          <v-icon>mdi-lock{{ !bloked ? "-open" : "" }}</v-icon>
        </v-btn>
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

export default {
  name: "AppDrawer",
  components: {},
  props: {
    bloked: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scrollSettings: {
        maxScrollbarLength: 160,
      },
      sponsor: {
        href: "https://www.theopticalfiber.com/",
        src: "https://www.theopticalfiber.com/logo/logo.png",
        srcMini: "https://www.theopticalfiber.com/logo/logo_mini.png",
      },
    };
  },

  computed: {
    computeLogo() {
      return "/static/m.png";
    },
    computeMenu() {
      return routes[0].children;
    },
  },
  created() {},

  methods: {
    handleDrawerCollapse() {
      this.drawerWidth = this.drawerWidth === 256 ? 64 : 256;
    },
    toggleDrawer() {
      this.bloked = !this.bloked;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>