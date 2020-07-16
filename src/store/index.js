import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    t_recipe: null
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      // console.log(userData)
      state.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userData.token}`;
    },
    CLEAR_USER_DATA() {
      localStorage.removeItem("user");
      location.reload();
    },
    SET_TRECIPE(state, recipe) {
      state.t_recipe = recipe;
      localStorage.setItem("t_recipe", JSON.stringify(recipe));
    }
  },
  actions: {
    register({ commit }, credentials) {
      return axios.post("/register", credentials).then(({ data }) => {
        if (data[0] != "true") {
          throw Error("Email already in use. Please try again.");
        } else {
          commit("SET_USER_DATA", data);
        }
      });
    },
    login({ commit }, credentials) {
      return axios.post("/login", credentials).then(({ data }) => {
        if (data[0] != "true") {
          console.log("error");
          throw Error("Invalid email or password");
        } else {
          commit("SET_USER_DATA", data);
        }
      });
    },
    logout({ commit }) {
      commit("CLEAR_USER_DATA");
    },
    set_recipe({ commit }, recipe) {
      commit("SET_TRECIPE", recipe);
    }
  },
  getters: {
    loggedIn(state) {
      // there was a parameter here called state
      // console.log(state.user, !!state.user)
      return !!state.user || !!localStorage.user;
    }
    // get_trecipe (state) {
    //   return state.t_recipe
    // }
  }
});
