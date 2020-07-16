<template>
  <div>
    <!-- LOGO AND TITLE -->
    <div class="container">
      <div class="row justify-content-sm-center">
        <div class="col-sm-4">
          <img
            alt="Logo"
            src="../assets/crab.png"
            style="margin:15px;"
            class="img-fluid"
          />
        </div>
        <div class="col-sm-8">
          <h1>The Crabby Chef</h1>
        </div>
      </div>
    </div>

    <!-- NAV -->
    <div id="nav">
      <router-link to="/">
        Home
      </router-link>
      <router-link v-if="loggedIn" to="/dashboard">
        Dashboard
      </router-link>
      <!-- <router-link v-if="loggedIn" to="/dashboard/add">
        Add New
      </router-link> -->
      <router-link v-if="loggedIn && isAdmin" to="/approve">
        Approve Recipes
      </router-link>
      <router-link to="/recipes">
        Recipes
      </router-link>
      <router-link to="/about">
        About
      </router-link>

      <router-link
        v-if="!loggedIn"
        to="/login"
        class=""
        style="width:auto;float:right;"
      >
        Login
      </router-link>

      <button v-else type="button" class="my_btn" @click="logout">
        Logout
      </button>

      <router-link to="/changePassword" v-if="loggedIn" class="my_btn">
        Change Password
      </router-link>
    </div>
  </div>
</template>

<script>
import { authComputed } from "../store/helpers.js";
export default {
  computed: {
    ...authComputed,
    isAdmin: function() {
      let user = JSON.parse(localStorage.getItem("user"));
      return user[1] == 18;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    changePassword() {
      this.$router.push({ name: "changePassword" });
    }
  }
};
</script>

<style scoped>
.row {
  display: flex;
  align-items: center;
}

h1 {
  font-family: dafoe;
  /* font-size: 7vw; */
}

@media screen and (min-width: 601px) {
  h1 {
    font-size: 90px;
  }
}

@media screen and (max-width: 600px) {
  h1 {
    font-size: 50px;
  }
}

a {
  font-weight: bold;
  color: #ede5ce;
  margin: auto 0.8em auto 0.4em;
  text-decoration: none;
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
}

#nav {
  overflow: hidden;

  align-items: center;
  min-height: 50px;
  width: 100%;

  padding: 0.2em 1em;
  padding-top: 10px;
  background: #fd7471;
  font-family: rajani;
  font-size: 20px;
}

.router-link-exact-active {
  color: #ede5ce;
  border-bottom: 2px solid #ede5ce;
}

.my_btn {
  background: none;
  border: none;
  float: right;
  cursor: pointer;
  color: #ede5ce;
  font-weight: bold;
  /* width: 100%; */
}

.my_btn:hover {
  color: #0e505e;
}
</style>
