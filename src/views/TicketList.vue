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
      :must-sort="true"
      :footer-props="{ 'items-per-page-options': [20, 40, 60, 80, 100, -1] }"
      :items-per-page="itemsPerPage"
      :item-class="clickable"
      sort-by="id"
      :sort-desc="true"
      :header-props="{ sortIcon: 'mdi-chevron-up' }"
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
      <template v-slot:[`header.type`]>
        <button @click="groupping = 'type'" style="white-space: nowrap">
          {{ $vuetify.lang.t("$vuetify.ticke.type") }}
          <v-icon x-small>mdi-filter</v-icon>
        </button>
      </template>
      <template v-slot:[`header.statusDisplayShort`]>
        <button
          @click="groupping = 'statusDisplayShort'"
          style="white-space: nowrap"
        >
          {{ $vuetify.lang.t("$vuetify.ticke.statusDisplayShort") }}
          <v-icon x-small>mdi-filter</v-icon>
        </button>
      </template>
      <template v-slot:[`item.updated_at`]="{ item }">
        {{ item.updated_at.format("L") }}
      </template>
      <template v-slot:[`item.open_at`]="{ item }">
        {{ item.open_at.format("L") }}
        <span
          style="white-space: nowrap"
          :class="
            (item.open_in_business_hours ? 'primary' : 'accent') + '--text'
          "
          >{{ item.open_in_business_hours ? "HO" : "HNO" }}</span
        >
      </template>
      <template v-slot:[`item.tpcCible`]="{ item }">
        {{ formatDate(item.tpc) }}<br />
        <span
          style="white-space: nowrap"
          :class="{
            'success--text': succesTime(item, 'tpc'),
            'warning--text': warningTime(item, 'tpc'),
            'error--text': errorTime(item, 'tpc'),
          }"
          >{{ asPercentage(item.tpcCible) }}</span
        >
      </template>
      <template v-slot:[`item.tctCible`]="{ item }">
        {{ formatDate(item.tct) }}<br />
        <span
          style="white-space: nowrap"
          :class="{
            'success--text': succesTime(item, 'tct'),
            'warning--text': warningTime(item, 'tct'),
            'error--text': errorTime(item, 'tct'),
          }"
          >{{ asPercentage(item.tctCible) }}</span
        >
      </template>
      <template v-slot:[`item.tcrCible`]="{ item }">
        {{ formatDate(item.tcr) }}<br />
        <span
          style="white-space: nowrap"
          :class="{
            'success--text': succesTime(item, 'tcr'),
            'warning--text': warningTime(item, 'tcr'),
            'error--text': errorTime(item, 'tcr'),
          }"
          >{{ asPercentage(item.tcrCible) }}</span
        >
      </template>
      <template v-slot:[`item.open_hours`]="{ item }">
        {{ formatDate(item.open_hours) }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="infoItem(item)"
          >mdi-information-outline</v-icon
        >
      </template>
      <template v-slot:[`item.statusDisplayShort`]="{ item }">
        {{ item.statusDisplayShort }}
        <v-icon
          small
          class="mr-2"
          :color="item.satisfactionColor"
          :title="item.satisfactionText"
          >{{ item.satisfactionIcon }}</v-icon
        >
      </template>
      <template v-slot:footer>
        <div style="position: absolute">
          <v-speed-dial v-model="fab" top>
            <template v-slot:activator>
              <v-btn v-model="fab" icon dark :disabled="!items.length">
                <v-icon v-if="fab"> mdi-close </v-icon>
                <v-icon v-else> mdi-download </v-icon>
              </v-btn>
            </template>
            <v-btn fab light small @click="downloadData('CSV')">
              <v-icon>mdi-file-delimited</v-icon>
            </v-btn>
            <v-btn fab light small @click="downloadData('XLSX')">
              <v-icon>mdi-file-excel</v-icon>
            </v-btn>
          </v-speed-dial>
        </div>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { mapCacheActions } from "vuex-cache";
import dayjs from "@/plugins/moment";
import { exportData } from "@/models/Ticket";
import asPercentage from "@/utilities/asPercentage";

export default {
  components: {},
  data() {
    return {
      fab: false,
      itemsPerPage: 25,
      currentTime: dayjs,
      groupping: null,
      selectedItem: { id: null },
      tableHeaders: [
        {
          text: this.$vuetify.lang.t("$vuetify.ticke.id"),
          align: "start",
          sortable: true,
          value: "id",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.ticke.created_at"),
          align: "start",
          width: "12.5em",
          sortable: false,
          value: "open_at",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.ticke.updated_at"),
          align: "start",
          width: "8em",
          sortable: false,
          value: "updated_at",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.ticke.subject"),
          align: "start",
          sortable: false,
          value: "title",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.ticke.software"),
          align: "start",
          sortable: false,
          value: "software",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.ticke.criticality"),
          align: "start",
          width: "8em",
          sortable: false,
          value: "criticality",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.ticke.type"),
          align: "start",
          width: "4em",
          sortable: false,
          value: "type",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.ticke.status"),
          align: "start",
          width: "12em",
          sortable: false,
          value: "statusDisplayShort",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.ticke.tpc"),
          align: "end",
          sortable: true,
          value: "tpcCible",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.ticke.tct"),
          align: "end",
          sortable: true,
          value: "tctCible",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.ticke.tcr"),
          align: "end",
          sortable: true,
          value: "tcrCible",
        },
      ],
    };
  },
  created() {
    this.getTickets();
  },
  computed: {
    ...mapState({
      loading: (state) => state.tickets.loading,
      items: (state) => state.tickets.items,
    }),
  },
  methods: {
    ...mapCacheActions({ getTickets: "queryItems" }),
    ...mapMutations({
      ticketDialog: "ticketDialog",
    }),
    infoItem(e, row) {
      this.ticketDialog({
        dialog: true,
        ticket: row.item,
      });
    },
    formatDate(value) {
      if (!value) return "-";
      return Math.floor(value.as("hours")) + "h" + value.format("mm");
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
    succesTime(item, attr) {
      return item[attr + "Cible"] <= 90;
    },
    errorTime(item, attr) {
      return item[attr + "Cible"] > 90;
    },
    warningTime(item, attr) {
      return item[attr + "Cible"] > 90 && item[attr + "Cible"] <= 100;
    },
    clickable(item) {
      let allClasses = ["clickable", `status${item.status}`];
      return allClasses.join(" ");
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.selectedItem = { id: null };
      });
    },
    asPercentage,
    downloadData(type) {
      exportData(this.items, this.$vuetify.lang, type);
    },
  },
};
</script>
<style>
.clickable {
  cursor: pointer;
  user-select: none;
}
.status2 {
  background-color: rgba(0, 137, 250, 0.2);
}
.status7 {
  background-color: rgba(0, 137, 250, 0.3);
}
.status8 {
  background-color: rgba(0, 137, 250, 0.4);
}
.status3 {
  background-color: rgba(224, 133, 28, 0.95);
}
.status4 {
  background-color: rgba(31, 219, 31, 0);
}
.status5 {
  background-color: rgba(31, 219, 31, 0);
}
.status6 {
  background-color: rgba(0, 137, 250, 0.5);
}
.status11 {
  background-color: rgba(255, 0, 0, 0.5);
}
</style>