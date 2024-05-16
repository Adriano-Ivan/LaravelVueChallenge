import { createRouter, createWebHistory } from "vue-router";
import getCurrentUser from "@/services/getCurrentUser";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: () => import("../views/HomeApp.vue") },
    {
      path: "/register-user",
      component: () => import("../views/RegisterUser.vue"),
    },
    { path: "/sign-in", component: () => import("../views/SignIn.vue") },
    {
      path: "/user-tasks",
      component: () => import("../views/UserTasks.vue"),
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      next("/");
    }
  } else {
    next();
  }
});

export default router;
