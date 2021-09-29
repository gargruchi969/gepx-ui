import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import LoginOrRegister from "../views/SignIn.vue";
import Dashboard from "../components/Dashboard.vue";
import Bidding from "../components/Bidding.vue";
import Orders from "../components/Orders.vue";
import Payments from "../components/Payments.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login-or-register",
    name: "LoginOrRegister",
    component: LoginOrRegister,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/payments",
    name: "Payments",
    component: Payments,
  },
  {
    path: "/bidding",
    name: "Bidding",
    component: Bidding,
  },
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  // base: "http://34.234.85.115:8080/services/gex",
  routes,
});

export default router;
