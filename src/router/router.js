import { createRouter, createWebHistory } from "vue-router";
import HistoryView from "@/views/HistoryView.vue";
import MessagesView from "@/views/MessagesView.vue";
import DashboardView from "@/views/DashboardView.vue";
import NotFound from "@/views/NotFoundView.vue";
import Login from "@/views/LoginView.vue";
import DefaultLayout from "@/components/DefaultLayout.vue";
import AuthLayout from "@/components/AuthLayout.vue";
import store from "@/store";
const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "/",
        name: "dashboard",
        component: DashboardView,
      },
      {
        path: "/messages",
        name: "messages",
        component: MessagesView,
      },
      {
        path: "/history",
        name: "history",
        component: HistoryView,
      },
    ],
  },
  {
    path: "/login",
    redirect: "/login",
    name: "Auth",
    meta: { isGuest: true },
    component: AuthLayout,
    children: [{ path: "/login", name: "login", component: Login }],
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({ name: "login" });
  } else if (store.state.user.token && to.meta.isGuest) {
    next({ name: "dashboard" });
  } else {
    next();
  }
});

export default router;
