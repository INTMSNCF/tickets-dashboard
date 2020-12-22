<template>
  <v-footer app class="justify-space-between">
    <small>© {{ thisYear }}. All rights reserved.</small>
    <small>v{{ version }} (build : {{ build }})</small>
  </v-footer>
</template>

<script>
import dayjs from "@/plugins/moment";

export default {
  name: "IntmFooter",
  data: () => ({
    thisYear: dayjs().format("YYYY"),
    version: document.body.getAttribute("version"),
    build: document.body.getAttribute("build"),
  }),

  methods: {},
};
</script>
