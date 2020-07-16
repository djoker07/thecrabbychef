<template>
  <div>
    <!-- <img alt="Vue logo" src="../assets/crab.png" /> -->
    <h2>Reset Password</h2>

    <form @submit.prevent="register" autocomplete="this is bs">
      <input
        v-model="email"
        type="email"
        class="fadeIn"
        name="email"
        placeholder="Email"
        required
      />
      <input
        type="submit"
        class="fadeIn btn btn-primary"
        name="button"
        value="Send me reset email"
      />
      <p>{{ error }}</p>

      <!-- <router-link to="/login" class="fadeIn" style="color: #ede5ce;">
            Already have an account? Login
        </router-link> -->
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      // pass_match: false,
      error: "Please click the button only once. "
    };
  },
  methods: {
    register() {
      let email = {
        email: this.email
      };
      axios
        .post("/reset_password", email)
        .then(({ data }) => {
          if (data != "true") {
            this.error = data;
          } else {
            // console.log(this.recipe)
            this.error = "Email Sent";
            this.email = "";
            // axios.post('/new_recipe', this.recipe)
            // .then(({ r_data }) => {
            //     console.log("Success", r_data)
            // this.$router.push({name: '/', params: {msg: "Submitted for Approval"}})
            // })
          }
        })
        .catch(err => {
          console.log(err);
          this.error = err;
        });
    }
  }
};
</script>

<style scoped>
h2 {
  font-family: dafoe;
  font-size: 90px;
}

/* FORM TYPOGRAPHY*/
form {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
  /* min-height: calc(100vh - 56px); */
}

input[type="button"],
input[type="submit"],
input[type="reset"] {
  /* padding: 15px 50px; */
  text-transform: uppercase;
  font-size: 25px;
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
