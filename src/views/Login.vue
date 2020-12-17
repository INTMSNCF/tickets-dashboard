<template>
  <v-app dark>
    <v-main>
      <v-container fill-height="fill-height">
        <v-layout align-center="align-center" justify-center="justify-center">
          <v-flex class="login-form text-xs-center">
            <div class="display-1 mb-3">
              <v-icon class="mr-2" large="large">mdi-ticket</v-icon> Workspace
            </div>
            <v-card light>
              <v-card-text>
                <div class="subheading">
                  <template v-if="options.isLoggingIn"
                    >Connection à tableau</template
                  >
                </div>
                <v-form>
                  <v-text-field
                    v-model="user.email"
                    prepend-icon="mdi-email"
                    label="Email"
                    type="email"
                  ></v-text-field>
                  <v-text-field
                    v-model="user.password"
                    prepend-icon="mdi-lock"
                    label="Password"
                    type="password"
                  ></v-text-field>
                  <v-checkbox
                    v-if="options.isLoggingIn"
                    v-model="options.shouldStayLoggedIn"
                    light
                    label="Reste connecte ?"
                  ></v-checkbox>
                  <v-btn
                    v-if="options.isLoggingIn"
                    @click.prevent=""
                    block="block"
                    type="submit"
                    >Se connecte</v-btn
                  >
                </v-form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
    <v-footer app class="justify-space-between">
        <small>© {{ thisYear }}. All rights reserved.</small>
        <small>v{{ version }} (build : {{ build }})</small>
    </v-footer>
  </v-app>
</template>
<script>
import dayjs from "@/plugins/moment";

export default {
  name: "Login",
  data: () => ({
    user: {
      email: "admin@example.com",
      password: "admin",
      name: "John Doe",
    },
    options: {
      isLoggingIn: true,
      shouldStayLoggedIn: true,
    },
    thisYear: dayjs().format("YYYY"),
    version: document.body.getAttribute("version"),
    build: document.body.getAttribute("build"),
  }),
};
</script>
<style scoped>
.login-form {
  max-width: 500px;
}
</style>