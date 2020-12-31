<template>
  <v-container
    min-width="400"
    class="d-flex flex-column justify-space-around align-stretch"
    fluid
  >
    <v-card class="my-2">
      <v-card-title>
        {{ $vuetify.lang.t("$vuetify.settings.tickets.title") }}
      </v-card-title>
      <v-card-subtitle>
        {{ settings.tickets.total }}
        <v-icon>{{ "mdi-ticket" }}</v-icon>
      </v-card-subtitle>
      <v-list light>
        <v-list-item v-for="item in ticketsSettings" :key="item.label">
          <v-list-item-title>
            {{ $vuetify.lang.t(`$vuetify.settings.tickets.${item.label}`) }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-right">
            {{ item.quantity }}
            <v-icon>{{ "mdi-ticket-outline" }}</v-icon>
          </v-list-item-subtitle>
          <v-list-item-subtitle class="text-right">
            {{ item.percentage }}
            <v-icon>{{ "mdi-ticket-percent-outline" }}</v-icon>
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card>
    <v-card class="my-2">
      <v-card-title>
        {{ $vuetify.lang.t("$vuetify.settings.business_hours.title") }}
      </v-card-title>
      <v-expansion-panels light>
        <v-expansion-panel
          v-for="itemConfig in settings.business_hours"
          :key="itemConfig.id"
        >
          <v-expansion-panel-header>
            <strong>{{ itemConfig.description }}</strong>
            {{ itemConfig.name }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-list class="transparent" dense>
              <v-list-item>
                <v-list-item-title>
                  {{
                    $vuetify.lang.t(
                      "$vuetify.settings.business_hours.time_zone"
                    )
                  }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-right"
                  >{{ itemConfig.time_zone }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
            <hr />
            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      {{
                        $vuetify.lang.t("$vuetify.settings.business_hours.day")
                      }}
                    </th>
                    <th class="text-left">
                      {{
                        $vuetify.lang.t(
                          "$vuetify.settings.business_hours.day_start"
                        )
                      }}
                    </th>
                    <th class="text-left">
                      {{
                        $vuetify.lang.t(
                          "$vuetify.settings.business_hours.day_end"
                        )
                      }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(itemDay, dayName) in itemConfig.business_hours"
                    :key="dayName"
                  >
                    <td>
                      {{
                        $vuetify.lang.t(
                          `$vuetify.settings.business_hours.dayeNames.${dayName}`
                        )
                      }}
                    </td>
                    <td>{{ hourToLocal(itemDay.start_time) }}</td>
                    <td>{{ hourToLocal(itemDay.end_time) }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <hr />
            <v-simple-table dense fixed-header height="300px">
              <template v-slot:default>
                <caption>
                  {{
                    $vuetify.lang.t("$vuetify.settings.holydays.title")
                  }}
                </caption>
                <thead>
                  <tr>
                    <th class="text-left">
                      {{ $vuetify.lang.t("$vuetify.settings.holydays.name") }}
                    </th>
                    <th class="text-left">
                      {{ $vuetify.lang.t("$vuetify.settings.holydays.date") }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="itemDay in settings.holydays" :key="itemDay.date">
                    <td>
                      {{ itemDay.localName }} {{ dateToYear(itemDay.date) }}
                    </td>
                    <td>{{ dateToLocal(itemDay.date) }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
    <v-card class="my-2">
      <v-card-title>
        {{ $vuetify.lang.t("$vuetify.settings.sla.title") }}
      </v-card-title>
      <v-expansion-panels light>
        <v-expansion-panel
          v-for="itemConfig in settings.sla"
          :key="itemConfig.id"
        >
          <v-expansion-panel-header>
            <strong>{{ itemConfig.description }}</strong>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      {{ $vuetify.lang.t("$vuetify.settings.sla.priority") }}
                    </th>
                    <th class="text-left">
                      {{ $vuetify.lang.t("$vuetify.settings.sla.respond") }}
                    </th>
                    <th class="text-left">
                      {{ $vuetify.lang.t("$vuetify.settings.sla.resolve") }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, itemName) in itemConfig.sla_target"
                    :key="itemName"
                  >
                    <td>
                      {{
                        $vuetify.lang.t(
                          `$vuetify.settings.sla.priorities.${itemName}`
                        )
                      }}
                    </td>
                    <td>{{ lapsToHuman(item.respond_within) }}</td>
                    <td>{{ lapsToHuman(item.resolve_within) }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </v-container>
</template>

<script>
import dayjs from "@/plugins/moment";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState({
      settings: (state) => state.settings,
    }),
    ...mapGetters(["ticketsSettings"]),
  },
  methods: {
    hourToLocal(value) {
      return (
        dayjs("2020-01-01 " + value, "YYYY-MM-DD h:mm a").format("H") + "h"
      );
    },
    dateToLocal(value) {
      return dayjs(value).format("dddd D MMMM");
    },
    dateToYear(value) {
      return dayjs(value).format("YYYY");
    },
    lapsToHuman(value) {
      return dayjs.duration({ seconds: value }).humanize();
    },
  },
};
</script>
