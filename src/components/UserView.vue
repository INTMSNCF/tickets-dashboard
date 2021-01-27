<template>
  <v-form ref="form" v-model="valid">
    <v-row>
      <v-col cols="12" sm="4">
        <v-text-field
          dense
          hide-details="auto"
          prepend-icon="mdi-account"
          v-model="item.name"
          :readonly="!!item.id"
          :label="
            item.id
              ? $vuetify.lang.t('$vuetify.user.name')
              : $vuetify.lang.t('$vuetify.user.name') + ' *'
          "
          :rules="[
            rules.required(
              $vuetify.lang.t('$vuetify.rule.required', [
                $vuetify.lang.t('$vuetify.user.name')
              ])
            )
          ]"
        />
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          dense
          hide-details="auto"
          prepend-icon="mdi-briefcase"
          v-model="item.job_title"
          :readonly="!!item.id"
          :label="$vuetify.lang.t('$vuetify.user.job_title')"
        />
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          dense
          hide-details="auto"
          prepend-icon="mdi-domain"
          v-model="item.custom_fields.socit_"
          :readonly="!!item.id"
          :label="$vuetify.lang.t('$vuetify.user.custom_fields.socit_')"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          dense
          hide-details="auto"
          prepend-icon="mdi-email"
          required
          v-model="item.email"
          :readonly="!!item.id"
          :label="
            item.id
              ? $vuetify.lang.t('$vuetify.user.email')
              : $vuetify.lang.t('$vuetify.user.email') + ' *'
          "
          :rules="[
            rules.required(
              $vuetify.lang.t('$vuetify.rule.required', [
                $vuetify.lang.t('$vuetify.user.email')
              ])
            )
          ]"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          dense
          hide-details="auto"
          prepend-icon="mdi-phone"
          v-model="item.mobile"
          :readonly="!!item.id"
          :label="$vuetify.lang.t('$vuetify.user.mobile')"
        />
      </v-col>
    </v-row>
    <v-row v-if="item.id">
      <v-col cols="12" sm="4">
        <v-text-field
          dense
          prepend-icon="mdi-translate"
          readonly
          :label="$vuetify.lang.t('$vuetify.user.language')"
          :value="
            item.language.toUpperCase() === null
              ? '-'
              : item.language.toUpperCase()
          "
        />
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          dense
          prepend-icon="mdi-clock-outline"
          readonly
          :label="$vuetify.lang.t('$vuetify.user.time_zone')"
          :value="item.time_zone === null ? '-' : item.time_zone"
        />
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          dense
          prepend-icon="mdi-calendar"
          readonly
          :label="$vuetify.lang.t('$vuetify.user.created_at')"
          :value="dayToDisplay(item.created_at)"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          dense
          hide-details="auto"
          prepend-icon="mdi-map-marker"
          v-model="item.address"
          :readonly="!!item.id"
          :label="$vuetify.lang.t('$vuetify.user.address')"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          dense
          hide-details="auto"
          prepend-icon="mdi-information-outline"
          v-model="item.description"
          :readonly="!!item.id"
          :label="$vuetify.lang.t('$vuetify.user.description')"
        />
      </v-col>
    </v-row>
  </v-form>
</template>
<script>
export default {
  data: () => ({
    valid: false,
    rules: {
      required: message => v => (!!v && v != "-") || message
    }
  }),
  props: {
    item: Object
  },
  watch: {
    valid: function(value) {
      this.$emit("is-valid", value);
    }
  },
  methods: {
    dayToDisplay(dayjs) {
      try {
        return dayjs ? dayjs.format("L LTS") : "-";
      } catch (e) {
        return "-";
      }
    }
  }
};
// xs,sm,md,lg,xl
// <600,<960,<1264,<1904,>1904
</script>
