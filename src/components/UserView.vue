<template >
  <v-container>
    <v-row>
      <v-col cols="12" sm="4">
        <v-text-field
          readonly
          :label="$vuetify.lang.t('$vuetify.user.name')"
          :value="item.name === null ? '-' : item.name"
          prepend-icon="mdi-account"
        />
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          readonly
          :label="$vuetify.lang.t('$vuetify.user.job_title')"
          :value="item.job_title === null ? '-' : item.job_title"
          prepend-icon="mdi-briefcase"
        />
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          readonly
          :label="$vuetify.lang.t('$vuetify.user.custom_fields.socit_')"
          :value="item.custom_fields.socit_ === null ? '-' : item.custom_fields.socit_"
          prepend-icon="mdi-domain"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          readonly
          :label="$vuetify.lang.t('$vuetify.user.email')"
          :value="item.email === null ? '-' : item.email"
          prepend-icon="mdi-email"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          readonly
          :label="$vuetify.lang.t('$vuetify.user.mobile')"
          :value="item.mobile === null ? '-' : item.mobile"
          prepend-icon="mdi-phone"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="4">
        <v-text-field
          readonly
          :label="$vuetify.lang.t('$vuetify.user.language')"
          :value="item.language.toUpperCase() === null ? '-' : item.language.toUpperCase()"
          prepend-icon="mdi-translate" 
        />
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          readonly
          :label="$vuetify.lang.t('$vuetify.user.time_zone')"
          :value="item.time_zone === null ? '-' : item.time_zone"
          prepend-icon="mdi-clock-outline"
        />
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          readonly
          :label="$vuetify.lang.t('$vuetify.user.created_at')"
          :value="dayToDisplay(item.created_at)"
          prepend-icon="mdi-calendar"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          readonly
          :label="$vuetify.lang.t('$vuetify.user.address')"
          :value="item.address === null ? '-' : item.address"
          prepend-icon="mdi-map-marker"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          readonly
          :label="$vuetify.lang.t('$vuetify.user.description')"
          :value="item.description === null ? '-' : item.description"
          prepend-icon="mdi-information-outline"
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
  methods: {
    dayToDisplay(dayjs) {
      try {
        return dayjs ? dayjs.format("L LTS") : "-";
      } catch (e) {
        return "-";
      }
    },
  },
};
// xs,sm,md,lg,xl
// <600,<960,<1264,<1904,>1904
</script>
