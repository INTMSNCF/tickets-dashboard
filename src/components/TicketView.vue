<template>
  <v-container>
    <v-row>
      <v-col>
        <v-textarea
          dense
          auto-grow
          name="input-7-1"
          rows="1"
          hide-details="auto"
          prepend-icon="mdi-text-subject"
          :readonly="item.id"
          :label="$vuetify.lang.t('$vuetify.ticke.title')"
          v-model="item.title"
        />
      </v-col>
    </v-row>
    <v-row v-if="item.id">
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
    <v-row else>
      <v-col>
        <tiptap-vuetify
          v-model="item.description.html"
          :extensions="extensions"
        />
      </v-col>
    </v-row>
    <v-row v-if="item.id">
      <v-col cols="12" sm="6">
        <v-text-field
          dense
          hide-details="auto"
          prepend-icon="mdi-calendar"
          :readonly="item.id"
          :label="$vuetify.lang.t('$vuetify.ticke.open_at')"
          :value="dayToDisplay(item.open_at)"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          dense
          hide-details="auto"
          prepend-icon="mdi-pencil"
          :readonly="item.id"
          :label="$vuetify.lang.t('$vuetify.ticke.first_responded_at')"
          :value="dayToDisplay(item.first_responded_at)"
        />
      </v-col>
    </v-row>
    <v-row v-if="item.id">
      <v-col cols="12" sm="6">
        <v-text-field
          dense
          hide-details="auto"
          prepend-icon="mdi-update"
          :readonly="item.id"
          :label="$vuetify.lang.t('$vuetify.ticke.updated_at')"
          :value="item.updated_at.format('L LTS')"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          dense
          hide-details="auto"
          prepend-icon="mdi-close"
          :readonly="item.id"
          :label="$vuetify.lang.t('$vuetify.ticke.closed_at')"
          :value="dayToDisplay(item.closed_at)"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          v-if="item.id"
          readonly
          dense
          hide-details="auto"
          prepend-icon="mdi-laptop"
          :label="$vuetify.lang.t('$vuetify.ticke.software')"
          :value="item.software"
        />
        <v-autocomplete
          else
          dense
          return-value
          hide-no-data
          hide-selected
          item-text="label"
          item-value="value"
          prepend-icon="mdi-laptop"
          v-model="item.software"
          :items="softwareList"
          :label="$vuetify.lang.t('$vuetify.ticke.software')"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-if="item.id"
          readonly
          dense
          hide-details="auto"
          prepend-icon="mdi-priority-low"
          :label="$vuetify.lang.t('$vuetify.ticke.criticality')"
          :value="item.criticality"
        />
        <v-select
          else
          dense
          prepend-icon="mdi-priority-low"
          v-model="item.criticality"
          :items="['Critique', 'Non critique']"
          :label="$vuetify.lang.t('$vuetify.ticke.criticality')"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          v-if="item.id"
          dense
          readonly
          hide-details="auto"
          prepend-icon="mdi-format-list-bulleted-type"
          :label="$vuetify.lang.t('$vuetify.ticke.typeDisplay')"
          :value="item.typeDisplay"
        />
        <v-select
          else
          dense
          prepend-icon="mdi-format-list-bulleted-type"
          v-model="item.criticality"
          :items="ticketTypes"
          :label="$vuetify.lang.t('$vuetify.ticke.typeDisplay')"
        />
      </v-col>
      <v-col v-if="item.id" cols="12" sm="6">
        <v-text-field
          dense
          hide-details="auto"
          prepend-icon="mdi-flag"
          :readonly="item.id"
          :label="$vuetify.lang.t('$vuetify.ticke.statusDisplayLong')"
          :value="item.statusDisplayLong"
        />
      </v-col>
    </v-row>
    <v-row v-if="item.id">
      <v-col cols="12" sm="4">
        <v-text-field
          dense
          hide-details="auto"
          prepend-icon="mdi-domain"
          :readonly="item.id"
          :label="$vuetify.lang.t('$vuetify.ticke.company')"
          :value="item.company"
        />
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          dense
          hide-details="auto"
          prepend-icon="mdi-account"
          :readonly="item.id"
          :label="$vuetify.lang.t('$vuetify.ticke.requester')"
          :value="item.requester"
        />
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          dense
          hide-details="auto"
          prepend-icon="mdi-briefcase"
          :readonly="item.id"
          :label="$vuetify.lang.t('$vuetify.ticke.service')"
          :value="item.service"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import {
  TiptapVuetify,
  Bold,
  Italic,
  Strike,
  Underline,
  CodeBlock,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History
} from "tiptap-vuetify";
import softwareList from "@/data/software_catalog.json";

export default {
  props: {
    item: Object
  },
  components: { TiptapVuetify },
  data: () => ({
    softwareList,
    ticketTypes: [
      "Anomalie bloquante",
      "Anomalie non bloquante",
      "Demande d'information",
      "Demande administrative",
      "Ne pas prendre en compte"
    ],
    extensions: [
      Bold,
      Italic,
      Strike,
      Underline,
      CodeBlock,
      ListItem,
      Link,
      Blockquote,
      HardBreak,
      HorizontalRule,
      History
    ]
  }),
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
<style>
.tiptap-vuetify-editor__content {
  overflow-y: auto;
  min-height: 10vh;
  max-height: 30vh;
}
</style>
