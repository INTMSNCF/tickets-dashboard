<template>
  <v-container
    min-width="400"
    class="d-flex flex-column justify-space-around align-stretch"
    fluid
  >
    <v-data-table
      dense
      ref="table"
      :headers="tableHeaders"
      :loading="loading"
      :items="items"
      :group-by="groupping"
      item-key="id"
      fixed-header
      :footer-props="{ 'items-per-page-options': [20, 40, 60, 80, 100, -1] }"
      :items-per-page="itemsPerPage"
      :item-class="clickable"
      loading-text="Chargement en cours... veuillez patienter"
      @update:group-by="setGrouBy"
      @click:row="infoItem"
    >
      <template
        v-slot:[`group.header`]="{ group, groupBy, headers, toggle, isOpen }"
      >
        <td :colspan="headers.length">
          <v-btn @click="toggle" x-small icon :ref="group">
            <v-icon v-if="isOpen">mdi-chevron-down</v-icon>
            <v-icon v-else>mdi-chevron-right</v-icon>
          </v-btn>
          <span class="mx-5 font-weight-bold">
            {{
              tableHeaders.find((item) => groupBy.indexOf(item.value) >= 0).text
            }}
            :
            {{ group }}
          </span>
          <v-btn class="float-right" x-small icon @click="groupping = null">
            <v-icon>mdi-close-thick</v-icon>
          </v-btn>
        </td>
      </template>
      <template v-slot:[`header.custom_fields.socit_`]>
        <button
          @click="groupping = 'custom_fields.socit_'"
          style="white-space: nowrap"
        >
          {{ $vuetify.lang.t("$vuetify.user.custom_fields.socit_") }}
          <v-icon x-small>mdi-filter</v-icon>
        </button>
      </template>
      <template v-slot:[`item.created_at`]="{ item }">
        {{ formatDate(item.updated_at) }}
      </template>
      <template v-slot:[`item.updated_at`]="{ item }">
        {{ formatDate(item.updated_at) }}
      </template>
    </v-data-table>
    <v-dialog
      v-model="dialog"
      light
      scrollable
      :fullscreen="$vuetify.breakpoint.smAndDown"
      :hide-overlay="$vuetify.breakpoint.smAndDown"
      max-width="75vw"
    >
      <v-card>
        <v-toolbar dark flat dense max-height="3em">
          <v-toolbar-title
            >{{ $vuetify.lang.t("$vuetify.user.label.title") }} #{{
              selectedItem.id
            }}</v-toolbar-title
          >
        </v-toolbar>
        <v-card-text> user view component </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="font-weight-black"
            color="info"
            @click="close"
            elevation="5"
          >
            {{ $vuetify.lang.t("$vuetify.dialog.close") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { mapCacheActions } from "vuex-cache";
import dayjs from "@/plugins/moment";

export default {
  components: {},
  data() {
    return {
      itemsPerPage: 25,
      currentTime: dayjs,
      dialog: false,
      groupping: null,
      selectedItem: { id: null },
      tableHeaders: [
        {
          text: this.$vuetify.lang.t("$vuetify.user.nom"),
          align: "start",
          sortable: false,
          value: "name",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.user.email"),
          align: "start",
          sortable: false,
          value: "email",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.user.custom_fields.socit_"),
          align: "start",
          sortable: false,
          value: "custom_fields.socit_",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.user.created_at"),
          align: "start",
          width: "12.5em",
          sortable: false,
          value: "created_at",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.user.updated_at"),
          align: "start",
          width: "8em",
          sortable: false,
          value: "updated_at",
        },
      ],
    };
  },
  created() {},
  computed: {
    ...mapState({
      loading: (state) => state.contacts.loading,
      items: (state) => state.contacts.items,
    }),
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
    infoItem(e, row) {
      this.selectedItem = row.item;
      this.dialog = true;
    },
    formatDate(value) {
      let asDate = dayjs(value);
      return asDate.format("L");
    },
    setGrouBy(value) {
      if (!value) {
        this.groupping = null;
        this.itemsPerPage = 20;
      } else {
        this.itemsPerPage = -1;
        this.$nextTick(() => {
          let table = this.$refs.table;
          let keys = Object.keys(table.$vnode.componentInstance.openCache);
          keys.forEach((x) => {
            table.$vnode.componentInstance.openCache[x] = false;
          });
        });
      }
    },
    clickable(item) {
      let allClasses = ["clickable"];
      return allClasses.join(" ");
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.selectedItem = { id: null };
      });
    },
  },
};
</script>
<style>
.clickable {
  cursor: pointer;
  user-select: none;
}
</style>