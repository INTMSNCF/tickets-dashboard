import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import fr from '@/locale/fr';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true ,
    options: {
      customProperties: true,
    },
  },
  lang: {
    locales: { fr },
    current: 'fr',
  },
});
