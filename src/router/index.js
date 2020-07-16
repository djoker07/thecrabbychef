import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import UserLogin from "../views/UserLogin.vue";
import UserRegister from "../views/UserRegister.vue";
import Recipes from "../views/Recipes.vue";
import ViewRecipe from "../views/ViewRecipe.vue";
import AddRecipe from "../views/AddRecipe.vue";
import ApproveRecipes from "../views/ApproveRecipes.vue";
import UpdateRecipe from "../views/UpdateRecipe.vue";
import ChangePassword from "../views/changePassword.vue";
import ResetPassword from "../views/resetPassword.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    name: "login",
    component: UserLogin
  },
  {
    path: "/changePassword",
    name: "changePassword",
    component: ChangePassword,
    meta: { requiresAuth: true }
  },
  {
    path: "/resetPassword",
    name: "resetPassword",
    component: ResetPassword
  },
  {
    path: "/register",
    name: "register",
    component: UserRegister
  },
  {
    path: "/recipes",
    name: "recipes",
    component: Recipes
  },
  {
    path: "/recipes/view",
    name: "view",
    component: ViewRecipe
  },
  {
    path: "/dashboard/add",
    name: "add",
    component: AddRecipe,
    meta: { requiresAuth: true }
  },
  {
    path: "/dashboard/update",
    name: "update",
    component: UpdateRecipe,
    meta: { requiresAuth: true }
  },
  {
    path: "/approve",
    name: "approve",
    component: ApproveRecipes,
    meta: { requiresAuth: true }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("user");

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next("/");
  }
  next();
});

export default router;
