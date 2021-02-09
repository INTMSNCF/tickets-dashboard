<template>
  <v-form ref="form" v-model="valid">
    <v-row>
      <v-col>
        <v-textarea
          dense
          auto-grow
          name="input-7-1"
          rows="1"
          hide-details="auto"
          prepend-icon="mdi-text-subject"
          v-model="item.title"
          :rules="[
            rules.requiered(
              $vuetify.lang.t('$vuetify.rule.required', [
                $vuetify.lang.t('$vuetify.ticket.title'),
              ])
            ),
          ]"
          :readonly="!!item.id"
          :label="
            $vuetify.lang.t('$vuetify.ticket.title') + (item.id ? '' : ' *')
          "
        />
      </v-col>
    </v-row>
    <v-row v-if="item.id">
      <v-col>
        <v-expansion-panels dark accordion>
          <v-expansion-panel>
            <v-expansion-panel-header v-slot="{ open }"
              >{{
                $vuetify.lang.t("$vuetify.ticket.description") +
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
    <v-row v-else>
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
          readonly
          :label="$vuetify.lang.t('$vuetify.ticket.open_at')"
          :value="dayToDisplay(item.open_at)"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          dense
          hide-details="auto"
          prepend-icon="mdi-pencil"
          readonly
          :label="$vuetify.lang.t('$vuetify.ticket.first_responded_at')"
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
          readonly
          :label="$vuetify.lang.t('$vuetify.ticket.updated_at')"
          :value="item.updated_at.format('L LTS')"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          dense
          hide-details="auto"
          prepend-icon="mdi-close"
          readonly
          :label="$vuetify.lang.t('$vuetify.ticket.closed_at')"
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
          :label="$vuetify.lang.t('$vuetify.ticket.software')"
          :value="item.software"
        />
        <v-autocomplete
          v-else
          dense
          return-value
          hide-no-data
          hide-selected
          item-text="label"
          item-value="value"
          prepend-icon="mdi-laptop"
          v-model="item.software"
          :rules="[
            rules.requiered(
              $vuetify.lang.t('$vuetify.rule.required', [
                $vuetify.lang.t('$vuetify.ticket.software'),
              ])
            ),
          ]"
          :items="softwareList"
          :label="$vuetify.lang.t('$vuetify.ticket.software') + ' *'"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-if="item.id"
          readonly
          dense
          hide-details="auto"
          prepend-icon="mdi-priority-low"
          :label="$vuetify.lang.t('$vuetify.ticket.criticality')"
          :value="item.criticality"
        />
        <v-select
          v-else
          dense
          prepend-icon="mdi-priority-low"
          v-model="item.criticality"
          :rules="[
            rules.requiered(
              $vuetify.lang.t('$vuetify.rule.required', [
                $vuetify.lang.t('$vuetify.ticket.criticality'),
              ])
            ),
          ]"
          :items="['Critique', 'Non critique']"
          :label="$vuetify.lang.t('$vuetify.ticket.criticality') + ' *'"
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
          :label="$vuetify.lang.t('$vuetify.ticket.typeDisplay')"
          :value="item.typeDisplay"
        />
        <v-select
          v-else
          dense
          prepend-icon="mdi-format-list-bulleted-type"
          v-model="item.type"
          :rules="[
            rules.requiered(
              $vuetify.lang.t('$vuetify.rule.required', [
                $vuetify.lang.t('$vuetify.ticket.typeDisplay'),
              ])
            ),
          ]"
          :items="ticketTypes"
          :label="$vuetify.lang.t('$vuetify.ticket.typeDisplay') + ' *'"
        />
      </v-col>
      <v-col v-if="item.id" cols="12" sm="6">
        <v-text-field
          dense
          hide-details="auto"
          prepend-icon="mdi-flag"
          readonly
          :label="$vuetify.lang.t('$vuetify.ticket.statusDisplayLong')"
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
          readonly
          :label="$vuetify.lang.t('$vuetify.ticket.company')"
          :value="item.company"
        />
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          dense
          hide-details="auto"
          prepend-icon="mdi-account"
          readonly
          :label="$vuetify.lang.t('$vuetify.ticket.requester')"
          :value="item.requester"
        />
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          dense
          hide-details="auto"
          prepend-icon="mdi-briefcase"
          readonly
          :label="$vuetify.lang.t('$vuetify.ticket.service')"
          :value="item.service"
        />
      </v-col>
    </v-row>
  </v-form>
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
  History,
} from "tiptap-vuetify";
import { mapState } from "vuex";
import { mapCacheActions } from "vuex-cache";

export default {
  props: {
    item: Object,
  },
  components: { TiptapVuetify },
  data: () => ({
    valid: false,
    rules: {
      requiered: (message) => (v) => (!!v && v != "-") || message,
    },
    ticketTypes: [
      "Anomalie bloquante",
      "Anomalie non bloquante",
      "Demande d'information",
      "Demande administrative",
      "Ne pas prendre en compte",
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
      History,
    ],
  }),
  watch: {
    valid: function (value) {
      this.$emit("is-valid", value);
    },
  },
  computed: {
    ...mapState({
      softwareList: (state) => state.fields.softwares,
    }),
  },
  created() {
    this.valid = false;
    this.getSoftware();
  },
  methods: {
    ...mapCacheActions({ getSoftware: "querySoftwareItems" }),
    dayToDisplay(dayjs) {
      try {
        return dayjs ? dayjs.format("L LTS") : "-";
      } catch (e) {
        return "-";
      }
    },
  },
};
</script>
<style>
.tiptap-vuetify-editor__content {
  overflow-y: auto;
  min-height: 10vh;
  max-height: 30vh;
}
</style>
