<template>
  <v-container fill-height="fill-height">
    <v-layout align-center="align-center" justify-center="justify-center">
      <v-flex class="login-form text-xs-center">
        <div class="display-1 mb-3">
          <v-icon class="mr-2" large="large">mdi-ticket</v-icon> Workspace
        </div>
        <v-form ref="frmLogin" lazy-validation v-model="formValid">
          <v-card light>
            <v-card-title>Connexion au tableau</v-card-title>
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
              <v-checkbox
                v-model="remember"
                light
                hide-details
                label="Rester connecté ?"
              />
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
    return {
      remember: false,
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
    handleSocialLogin() {},
  },
};
</script>
<style scoped>
.login-form {
  max-width: 500px;
}
</style>