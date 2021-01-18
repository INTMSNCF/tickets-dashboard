import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";
import VuexPersistence from "vuex-persist";
import createCache from "vuex-cache";

const vuexLocal = new VuexPersistence({
  key: window.localStorage.subdomine,
  storage: {
    get repo() {
      return window.localStorage.getItem("rememberMe")
        ? window.localStorage
        : window.sessionStorage;
    },
    key(i) {
      return this.repo.key(i);
    },
    getItem(key) {
      return this.repo.getItem(key);
    },
    setItem(key, value) {
      return this.repo.setItem(key, value);
    },
    removeItem(key) {
      return this.repo.removeItem(key);
    },
    clear() {
      return this.repo.clear();
    }
  },
  modules: ["app", "auth", "settings", "contacts"]
});

Vue.use(Vuex);

const store = new Vuex.Store({
  modules,
  plugins: [createCache({ timeout: 1000 * 60 * 5 }), vuexLocal.plugin]
});

export default store;
