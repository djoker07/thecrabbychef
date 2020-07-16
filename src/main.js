import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import axios from "axios";
// axios.defaults.baseURL = "//10.0.0.198:5000"
axios.defaults.baseURL = "https://crabby.7bytes.ai";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
