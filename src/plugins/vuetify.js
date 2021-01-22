import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import fr from "@/locale/fr";
import { TiptapVuetifyPlugin } from "tiptap-vuetify";
import "tiptap-vuetify/dist/main.css";

const vuetify = new Vuetify({
  theme: {
    dark: true,
    options: {
      customProperties: true
    }
  },
  lang: {
    locales: { fr },
    current: "fr"
  }
});

Vue.use(Vuetify);
Vue.use(TiptapVuetifyPlugin, {
  vuetify,
  iconsGroup: "mdi"
});

export default vuetify;
