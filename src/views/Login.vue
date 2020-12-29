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
                    label="Mot de passe"
                    type="password"
                  ></v-text-field>
          
                 <v-checkbox
                    v-if="options.isLoggingIn"
                    v-model="checkbox"
                    light
                  >
                    <template slot="label">
                  Rester connecté
                  <v-dialog v-model="dialog" persistent max-width="290">
                    
                  <v-icon class="mx-1" style="margin-top: -1em;" x-small color="blue darken-1" @click.prevent="dialog = true" slot="activator">mdi-information-outline</v-icon>
                  <v-card>
                  <v-card-title class="headline">Termes et conditions</v-card-title>
                  <v-card-text>Dans le cadre de la RGPD Règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016, relatif à 
                    la protection des personnes physiques à l'égard du traitement des données à caractère personnel et à la libre circulation de ces données, 
                    et abrogeant la directive 95/46/CE (règlement général sur la protection des données), nous vous informons que seule l’adresse mail et le mot 
                    de passe (mot de passe FRESHDESK) sont collectés et stockés sur le poste de travail</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false; checkbox=false;">Désaccord</v-btn>
                    <v-btn color="blue darken-1" text @click="dialog = false; checkbox=true;">Accord</v-btn>
                  </v-card-actions>
                   </v-card>
                  </v-dialog>
                  </template>
                  </v-checkbox>
                  
                  
                    <v-btn
                    v-if="options.isLoggingIn"
                    @click.prevent=""
                    block="block"
                    type="submit"
                    >Se connecter
                    </v-btn>
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
    dialog: false,
    checkbox: true,
  }),
};
</script>
<style scoped>
.login-form {
  max-width: 500px;
}
</style>