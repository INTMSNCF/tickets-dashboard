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
