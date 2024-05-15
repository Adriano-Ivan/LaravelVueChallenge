import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

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
