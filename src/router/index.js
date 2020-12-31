import Vue from "vue";
import VueRouter from "vue-router";
import { publicRoute, protectedRoute } from "./config";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
const routes = publicRoute.concat(protectedRoute);
import store from "@/store";

NProgress.configure({ showSpinner: false });

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  linkActiveClass: "active",
  routes
});

// router storage wait
const waitForStorageToBeReady = async (to, from, next) => {
  await store.restored;
  next();
};

router.beforeEach(waitForStorageToBeReady);

// router gards
router.beforeEach((to, from, next) => {
  NProgress.start();
  const token = store.getters.getUsername;
  if (to.name !== "login") {
    if (token) {
      next();
    } else {
      next({ name: "login", query: { redirect: to.path } });
    }
  } else {
    if (!window.localStorage.getItem("rememberMe")) {
      window.localStorage.removeItem(window.localStorage.subdomine);
      window.sessionStorage.removeItem(window.localStorage.subdomine);
      next();
    } else {
      next({ name: "dashboard" });
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
