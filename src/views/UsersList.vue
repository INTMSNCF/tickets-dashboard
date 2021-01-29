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
              tableHeaders.find(item => groupBy.indexOf(item.value) >= 0).text
            }}
            :
            {{ group }} ({{ itemsInGroup[group] }})
          </span>
          <v-btn class="float-right" x-small icon @click="groupping = null">
            <v-icon>mdi-close-thick</v-icon>
          </v-btn>
        </td>
      </template>
      <template v-slot:[`header.societyName`]>
        <button @click="groupping = 'societyName'" style="white-space: nowrap">
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
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { mapCacheActions } from "vuex-cache";
import dayjs from "@/plugins/moment";

export default {
  components: {},
  data() {
    return {
      itemsPerPage: 20,
      currentTime: dayjs,
      groupping: null,
      selectedItemUser: { id: null },
      tableHeaders: [
        {
          text: this.$vuetify.lang.t("$vuetify.user.name"),
          align: "start",
          sortable: false,
          value: "name"
        },
        {
          text: this.$vuetify.lang.t("$vuetify.user.email"),
          align: "start",
          sortable: false,
          value: "email"
        },
        {
          text: this.$vuetify.lang.t("$vuetify.user.custom_fields.socit_"),
          align: "start",
          sortable: false,
          value: "societyName"
        },
        {
          text: this.$vuetify.lang.t("$vuetify.user.created_at"),
          align: "start",
          width: "12.5em",
          sortable: false,
          value: "created_at"
        },
        {
          text: this.$vuetify.lang.t("$vuetify.user.updated_at"),
          align: "start",
          width: "8em",
          sortable: false,
          value: "updated_at"
        }
      ]
    };
  },
  created() {
    this.getUsers();
  },
  computed: {
    ...mapState({
      loading: state => state.contacts.loading,
      items: state => state.contacts.items
    }),
    itemsInGroup: function() {
      if (!this.groupping) return 0;
      return this.items.reduce((result, item) => {
        if (!result[item[this.groupping]])
          _.set(result, item[this.groupping], 0);
        result[item[this.groupping]]++;
        return result;
      }, {});
    }
  },
  methods: {
    ...mapCacheActions({ getUsers: "queryContactItems" }),
    ...mapMutations({
      userDialog: "userDialog"
    }),
    infoItem(e, row) {
      this.userDialog({
        dialog: true,
        user: row.item
      });
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
          try {
            keys.forEach(x => {
              table.$vnode.componentInstance.openCache[x] = false;
            });
          } catch (e) {}
        });
      }
    },
    clickable(item) {
      let allClasses = ["clickable", `status${item.status}`];
      return allClasses.join(" ");
    }
  }
};
</script>
<style>
.clickable {
  cursor: pointer;
  user-select: none;
}
</style>
