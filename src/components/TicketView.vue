<template >
  <v-container>
    <v-row>
      <v-col>
        <v-textarea
          :label="$vuetify.lang.t('$vuetify.ticke.title')"
          :value="item.title"
          rows="1"
          auto-grow
          disabled
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          disabled
          :label="$vuetify.lang.t('$vuetify.ticke.open_at')"
          :value="item.open_at.format('L LTS')"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          disabled
          :label="$vuetify.lang.t('$vuetify.ticke.first_responded_at')"
          :value="dayToDisplay(item.first_responded_at)"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          disabled
          :label="$vuetify.lang.t('$vuetify.ticke.updated_at')"
          :value="item.updated_at.format('L LTS')"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          disabled
          :label="$vuetify.lang.t('$vuetify.ticke.closed_at')"
          :value="dayToDisplay(item.closed_at)"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          disabled
          :label="$vuetify.lang.t('$vuetify.ticke.software')"
          :value="item.software"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          disabled
          :label="$vuetify.lang.t('$vuetify.ticke.criticality')"
          :value="item.criticality"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          disabled
          :label="$vuetify.lang.t('$vuetify.ticke.typeDisplay')"
          :value="item.typeDisplay"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          disabled
          :label="$vuetify.lang.t('$vuetify.ticke.statusDisplayLong')"
          :value="item.statusDisplayLong"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="4">
        <v-text-field
          disabled
          :label="$vuetify.lang.t('$vuetify.ticke.company')"
          :value="item.company"
        />
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          disabled
          :label="$vuetify.lang.t('$vuetify.ticke.requester')"
          :value="item.requester"
        />
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          disabled
          :label="$vuetify.lang.t('$vuetify.ticke.service')"
          :value="item.service"
        />
      </v-col>
    </v-row>
    <!--v-row v-for="(value, key) in item" :key="key">
      <v-col cols="12">
        <v-text-field
          disabled
          :label="$vuetify.lang.t(`$vuetify.ticke.${key}`)"
          :value="value"
        />
      </v-col>
    </v-row-->
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
