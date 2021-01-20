<template >
  <v-container>
    <v-row>
      <v-col>
        <v-textarea
          name="input-7-1"
          :label="$vuetify.lang.t('$vuetify.ticke.title')"
          :value="item.title"
          rows="1"
          auto-grow
          readonly
          hide-details="auto"
          dense
          prepend-icon="mdi-text-subject"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-expansion-panels dark accordion>
          <v-expansion-panel>
            <v-expansion-panel-header v-slot="{ open }"
              >{{
                $vuetify.lang.t("$vuetify.ticke.description") +
                (open ? " : " : "")
              }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-container
                style="height: 20vh; overflow: auto"
                v-html="item.description.html"
              ></v-container>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          readonly
          hide-details="auto"
          dense
          :label="$vuetify.lang.t('$vuetify.ticke.open_at')"
          :value="item.open_at.format('L LTS')"
          prepend-icon="mdi-calendar"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          readonly
          hide-details="auto"
          dense
          :label="$vuetify.lang.t('$vuetify.ticke.first_responded_at')"
          :value="dayToDisplay(item.first_responded_at)"
          prepend-icon="mdi-pencil"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          readonly
          hide-details="auto"
          dense
          :label="$vuetify.lang.t('$vuetify.ticke.updated_at')"
          :value="item.updated_at.format('L LTS')"
          prepend-icon="mdi-update"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          readonly
          hide-details="auto"
          dense
          :label="$vuetify.lang.t('$vuetify.ticke.closed_at')"
          :value="dayToDisplay(item.closed_at)"
          prepend-icon="mdi-close"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          readonly
          hide-details="auto"
          dense
          :label="$vuetify.lang.t('$vuetify.ticke.software')"
          :value="item.software"
          prepend-icon="mdi-laptop"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          readonly
          hide-details="auto"
          dense
          :label="$vuetify.lang.t('$vuetify.ticke.criticality')"
          :value="item.criticality"
          prepend-icon="mdi-priority-low"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          readonly
          hide-details="auto"
          dense
          :label="$vuetify.lang.t('$vuetify.ticke.typeDisplay')"
          :value="item.typeDisplay"
          prepend-icon="mdi-format-list-bulleted-type"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          readonly
          hide-details="auto"
          dense
          :label="$vuetify.lang.t('$vuetify.ticke.statusDisplayLong')"
          :value="item.statusDisplayLong"
          prepend-icon="mdi-flag"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="4">
        <v-text-field
          readonly
          hide-details="auto"
          dense
          :label="$vuetify.lang.t('$vuetify.ticke.company')"
          :value="item.company"
          prepend-icon="mdi-domain"
        />
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          readonly
          hide-details="auto"
          dense
          :label="$vuetify.lang.t('$vuetify.ticke.requester')"
          :value="item.requester"
          prepend-icon="mdi-account"
        />
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          readonly
          hide-details="auto"
          dense
          :label="$vuetify.lang.t('$vuetify.ticke.service')"
          :value="item.service"
          prepend-icon="mdi-briefcase"
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
