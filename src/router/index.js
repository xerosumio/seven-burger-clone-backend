import { createRouter, createWebHistory } from "vue-router";
import BaseLayout from "@/layouts/BaseLayout.vue";
const routes = [
  {
    path: "/",
    component: BaseLayout,
    redirect: "/login",
    children: [
      {
        path: "login",
        component: () => import("@/pages/Login.vue"),
      },
      {
        path: "home",
        component: () => import("@/pages/Home.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    if (savedPosition) {
      return savedPosition;
    } else {
      if (to.path != "/login") {
        document.querySelector(".el-main").scrollTop = 0;
        document.querySelector(".el-main").scrollLeft = 0;
      }
    }
  },
});

// router.beforeEach((to) => {
//   const token =
//     sessionStorage.getItem("token") || localStorage.getItem("token");
//   if (to.meta.requiresAuth && !token) {
//     return {
//       path: "/login",
//     };
//   } else if (to.meta.toAuthorizeUser && token) {
//     return {
//       path: "/",
//     };
//   }
// });

export default router;
