<template>
  <router-view />
</template>
<script>
import favicon from "@/assets/favicon.ico";

export default {
  name: "TicketDashboardApp",
  mounted: function () {
    this.$nextTick(function () {
      var link =
        document.querySelector("link[rel*='icon']") ||
        document.createElement("link");
      link.type = "image/x-icon";
      link.rel = "shortcut icon";
      link.href = favicon;
      document.getElementsByTagName("head")[0].appendChild(link);
    });
  },
};
</script>
<style lang="scss">
:root {
  #app {
    &.theme--dark {
      --graph-ligne: rgba(255, 255, 255, 0.5);
    }
    --ticket-type-ab-color: rgb(0, 176, 80);
    --ticket-type-anb-color: rgb(0, 32, 96);
    --ticket-type-info-color: rgb(255, 255, 0);
    --ticket-type-admin-color: rgb(112, 48, 160);
    --ticket-type-none-color: rgb(192, 0, 0);
    --ticket-type--color: rgb(0, 112, 192);
    --ticket-type-ab-color-solid: rgba(0, 176, 80, 0.75);
    --ticket-type-anb-color-solid: rgba(0, 32, 96, 0.75);
    --ticket-type-info-color-solid: rgba(255, 255, 0, 0.75);
    --ticket-type-admin-color-solid: rgba(112, 48, 160, 0.75);
    --ticket-type-none-color-solid: rgba(192, 0, 0, 0.75);
    --ticket-type--color-solid: rgba(0, 112, 192, 0.75);
    --ticket-type-ab-color-trasparent: rgba(0, 176, 80, 0.5);
    --ticket-type-anb-color-trasparent: rgba(0, 32, 96, 0.5);
    --ticket-type-info-color-trasparent: rgba(255, 255, 0, 0.5);
    --ticket-type-admin-color-trasparent: rgba(112, 48, 160, 0.5);
    --ticket-type-none-color-trasparent: rgba(192, 0, 0, 0.5);
    --ticket-type--color-trasparent: rgba(0, 112, 192, 0.5);
    --ticket-status-1-color: rgb(31, 219, 31);
    --ticket-status-2-color: rgb(0, 137, 250);
    --ticket-status-3-color: rgb(237, 125, 49);
    --ticket-status-4-color: rgb(128, 128, 128);
    --ticket-status-5-color: rgb(128, 128, 128);
    --ticket-status-6-color: rgb(237, 125, 49);
    --ticket-status-7-color: rgb(237, 125, 49);
    --ticket-status-8-color: rgb(237, 125, 49);
    --ticket-status-11-color: rgb(255, 0, 0);
  }
}
</style>
