<template>
  <v-app dark>
    <v-main>
      <router-view :key="$route.path"></router-view>
    </v-main>
    <intm-footer />
  </v-app>
</template>

<script>
import IntmFooter from "@/components/IntmFooter";

export default {
  components: {
    IntmFooter,
  },
  data: () => ({}),

  methods: {},
};
</script>
