import { LayoutAuth, LayoutDefault } from "@/layouts";

export const publicRoute = [
  {
    path: "*",
    component: () => import("@/views/error/NotFound.vue")
  },
  {
    path: "/auth",
    component: LayoutAuth,
    redirect: "/auth/login",
    hidden: true,
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("@/views/auth/Login.vue")
      }
    ]
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error/NotFound.vue")
  },

  {
    path: "/500",
    name: "500",
    component: () => import("@/views/error/Error.vue")
  }
];

export const protectedRoute = [
  {
    path: "/",
    component: LayoutDefault,
    meta: {
      group: "apps"
    },
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        meta: {
          group: "apps",
          icon: "mdi-view-dashboard"
        },
        component: () => import("@/views/Dashboard.vue")
      },
      {
        path: "/settings",
        name: "settings",
        meta: {
          group: "apps",
          icon: "mdi-cogs"
        },
        component: () => import("@/views/Settings.vue")
      },
      {
        path: "/403",
        name: "access_denied",
        meta: {
          hiddenInMenu: true
        },
        component: () => import("@/views/error/Deny.vue")
      }
    ]
  }
];
