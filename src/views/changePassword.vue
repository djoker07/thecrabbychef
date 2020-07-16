<template>
  <div class="container">
    <!-- <img alt="Vue logo" src="../assets/crab.png" /> -->
    <h2>Change Password</h2>

    <form @submit.prevent="register" autocomplete="off">
      <!-- <input v-model="fullname" type="text" class="fadeIn" name="fullname" placeholder="Full Name" required> -->
      <input
        v-model="current_pass"
        type="password"
        class="fadeIn"
        name="current"
        placeholder="Current Password"
        required
      />
      <input
        v-model="password"
        type="password"
        class="fadeIn"
        name="password"
        placeholder="Password (8 chars minimum)"
        required
      />
      <input
        v-model="confirm_pass"
        :class="{ confirm: !match }"
        type="password"
        class="fadeIn"
        name="confirm"
        placeholder="Confirm Password"
        required
      />
      <input
        type="submit"
        class="fadeIn"
        name="button"
        value="Change Password"
      />
      <p>{{ error }}</p>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      current_pass: "",
      password: "",
      confirm_pass: "",
      error: null
    };
  },
  methods: {
    register() {
      if (!this.match) {
        this.error = "Passwords do not match.";
      } else if (this.password.length < 8) {
        this.error = "Password is too short. Minimum 8 characters.";
      } else {
        let pass = {
          current: this.current_pass,
          new: this.password,
          uid: JSON.parse(localStorage.getItem("user"))[1]
        };
        console.log(pass);
        axios
          .post("/chng_pass", pass)
          .then(({ data }) => {
            if (data == "true") {
              this.error = "Password changed successfully";
              this.current_pass = this.password = this.confirm_pass = "";
            } else {
              this.error = data;
            }
          })
          .catch(err => {
            console.log(err);
            this.error = err;
          });
      }
    }
  },
  computed: {
    match: function() {
      return this.password === this.confirm_pass;
    }
  }
};
</script>

<style scoped>
h2 {
  font-family: dafoe;
  font-size: 75px;
}

/* FORM TYPOGRAPHY*/
form {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  /* margin-top: 25px;; */
  /* min-height: calc(100vh - 56px); */
}

input[type="button"],
input[type="submit"],
input[type="reset"] {
  padding: 15px 50px;
  text-transform: uppercase;
  font-size: 20px;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 15px;
}

.btn,
.btn-primary {
  background-color: transparent;
  border-color: #fd7471;
  color: #fd7471;
}

.btn-primary:hover {
  background-color: #fd7471;
  color: #ede5ce;
}

input {
  background-color: transparent !important;
  color: #fd7471;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  /* display: inline-block; */
  font-size: 25px;
  margin: 5px;
  width: auto;
  border: 2px solid #fd7471;
  border-radius: 3px;
}

/* input:valid {
  background-color: transparent !important;
} */

input:focus {
  background-color: transparent !important;
  /* border-bottom: 2px solid #FD7471; */
  color: #fd7471;
  border-color: #fd7471;
}

/* input[type=text]:placeholder {
  color: #cccccc;
} */

/* Simple CSS3 Fade-in Animation */
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-moz-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fadeIn {
  opacity: 0;
  -webkit-animation: fadeIn ease-in 1;
  -moz-animation: fadeIn ease-in 1;
  animation: fadeIn ease-in 1;

  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  animation-fill-mode: forwards;

  -webkit-animation-duration: 1s;
  -moz-animation-duration: 1s;
  animation-duration: 1s;
}

p {
  color: #fd7471;
}
</style>
