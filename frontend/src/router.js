import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

//rutele front
let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/register",
      name: "register",
      component: () => import("./components/Register"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./components/Login"),
    },

    {
      path: "/user/:id",
      name: "user",
      component: () => import("./components/User"),
    },
    {
      path: "/posts",
      name: "posts",
      component: () => import("./components/PostsList"),
      meta: {
        guest: true,
      },
    },
    {
      path: "/post/:id",
      name: "post",
      component: () => import("./components/Post"),
      meta: {
        guest: true,
      },
    },
    {
      path: "/add-post",
      name: "add-post",
      component: () => import("./components/AddArticle"),
      meta: {
        guest: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath },
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (localStorage.getItem("jwt") !== null) {
      next();
    } else {
      next({ name: "register" });
    }
  } else {
    next();
  }
});

export default router;
