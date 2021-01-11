<template>
  <v-container fill-height="fill-height">
    <v-layout align-center="align-center" justify-center="justify-center">
      <v-flex class="login-form text-xs-center">
        <div class="display-1 mb-3">
          <v-icon class="mr-2" large="large">mdi-ticket</v-icon>
          {{ $vuetify.lang.t("$vuetify.title") }}
        </div>
        <v-form ref="frmLogin" lazy-validation v-model="formValid">
          <v-card light>
            <v-card-title>
              {{ $vuetify.lang.t("$vuetify.subtitle") }}
            </v-card-title>
            <v-card-text>
              <v-text-field
                prepend-icon="mdi-email"
                autocomplete="off"
                name="login"
                :label="$vuetify.lang.t('$vuetify.username')"
                :placeholder="$vuetify.lang.t('$vuetify.username')"
                type="email"
                required
                :rules="formRule.username"
                v-model="formModel.username"
              />
              <v-text-field
                prepend-icon="mdi-lock"
                autocomplete="off"
                name="password"
                :label="$vuetify.lang.t('$vuetify.password')"
                :placeholder="$vuetify.lang.t('$vuetify.password')"
                type="password"
                :rules="formRule.password"
                required
                v-model="formModel.password"
                v-on:keyup.enter="login"
              />
              <v-checkbox v-model="rememberMe" hide-details light>
                <template slot="label">
                  {{ $vuetify.lang.t("$vuetify.option") }}
                  <v-dialog
                    v-model="dialog"
                    persistent
                    scrollable
                    :fullscreen="$vuetify.breakpoint.smAndDown"
                    :hide-overlay="$vuetify.breakpoint.smAndDown"
                    max-width="50vw"
                  >
                    <template v-slot:[`activator`]="{ on, attrs }">
                      <v-icon
                        class="mx-1"
                        style="margin-top: -1em"
                        x-small
                        color="blue darken-1"
                        v-bind="attrs"
                        v-on="on"
                        >mdi-information-outline</v-icon
                      >
                    </template>
                    <v-card>
                      <v-card-title class="headline">{{
                        $vuetify.lang.t("$vuetify.dialog.header")
                      }}</v-card-title>
                      <v-card-text>
                        <v-container>{{
                          $vuetify.lang.t("$vuetify.dialog.body")
                        }}</v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="
                            dialog = false;
                            checkbox = false;
                          "
                          >{{
                            $vuetify.lang.t("$vuetify.dialog.option1")
                          }}</v-btn
                        >
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="
                            dialog = false;
                            checkbox = true;
                          "
                          >{{
                            $vuetify.lang.t("$vuetify.dialog.option2")
                          }}</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </template>
              </v-checkbox>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                large
                tile
                :disabled="!formValid"
                color="primary"
                @click="login"
                :loading="loading"
              >
                {{ $vuetify.lang.t("$vuetify.login") }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "Login",
  data() {
    console.log(this.$vuetify);
    return {
      rememberMe: false,
      dialog: false,
      loading: false,
      formValid: false,
      formModel: {
        username: null,
        password: null,
      },
      formRule: {
        username: [
          (v) =>
            !!v ||
            this.$vuetify.lang.t("$vuetify.rule.required", [
              this.$vuetify.lang.t("$vuetify.username"),
            ]),
        ],
        password: [
          (v) =>
            !!v ||
            this.$vuetify.lang.t("$vuetify.rule.required", [
              this.$vuetify.lang.t("$vuetify.password"),
            ]),
        ],
      },
    };
  },
  computed: {
    prefix: () => "",
  },
  methods: {
    login() {
      if (this.$refs.frmLogin.validate()) {
        this.loading = true;
        this.$store.commit("SET_RGPD", this.rememberMe);
        this.$store.commit("SET_CREDENTIALS", this.formModel);
        this.$store
          .dispatch("login")
          .then(() => {
            this.loading = false;
            this.$router.push("/dashboard");
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },
  },
};
</script>
<style scoped>
.login-form {
  max-width: 500px;
}
</style>