<template >
  <v-container>
    <v-row v-for="(value, key) in item" :key="key">
      <v-col cols="12">
        <v-text-field
          disabled
          :label="$vuetify.lang.t(`$vuetify.ticke.${key}`)"
          :value="value"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: {
    item: Object,
  },
};
</script>
