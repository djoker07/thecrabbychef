<template>
  <div class="container">
    <button @click="goBack()" class="btn btn-primary back-btn">Back</button>
    <!-- <button class="btn btn-primary float-right"> Back </button> -->
    <h1 class="title">{{ recipe.title }}</h1>
    <p v-if="recipe.author_id === uid" id="msg">{{ recipe.err_msg }}</p>
    <img v-bind:src="recipe.image" alt="" class="img-fluid" />
    <div class="row justify-content-md-center">
      <div class="col-md-auto">By: {{ recipe.author }}</div>
      <div class="col-md-auto">Prep: {{ recipe.prep_time }} minutes</div>
      <div class="col-md-auto">Servings: {{ recipe.servings }}</div>
    </div>
    <div class="row ">
      <div class="col-sm-1"></div>
      <div class="col-sm-4">
        <ul>
          <h2>Ingredients</h2>
          <li v-for="(ingredient, idx) in recipe.ingredients" :key="idx">
            {{ ingredient }}
          </li>
        </ul>
      </div>
      <div class="col-sm-2"></div>
      <div class="col-sm-4">
        <ol>
          <h2>Instructions</h2>
          <li v-for="(instruction, idx) in recipe.instructions" :key="idx">
            {{ instruction }}
          </li>
        </ol>
      </div>
      <div class="col-sm-1"></div>
    </div>

    <div v-if="isAdmin && recipe_approved == 1">
      <button @click="approveRecipe()" class="btn btn-primary btn-lg">
        Approve
      </button>
      <button @click="denyRecipe(1)" class="btn btn-primary btn-lg">
        Deny Text
      </button>
      <button @click="denyRecipe(2)" class="btn btn-primary btn-lg">
        Deny Image
      </button>
    </div>
    <!-- <button  
        @click="approveRecipe()" class="btn btn-primary btn-lg"> Approve </button> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ViewPage",
  data() {
    return {
      recipe: {},
      recipe_approved: 0,
      recipe_id: {},
      uid: 0
    };
  },
  methods: {
    processText: function(text) {
      var ing = text.split("\n");
      for (let i = 0, l = ing.length; i < l; i++) {
        if (ing[i][0] === " ") {
          ing[i] = ing[i].replace(ing[i][0], "");
        }
        if (ing[i] == "") {
          ing.splice(i, 1);
        }
      }
      return ing;
    },
    setImage: function(name) {
      let img_path = "https://crabby.7bytes.ai/recipes/";
      return img_path + name;
    },
    approveRecipe: function() {
      axios.post("/approve_recipes", this.recipe_id).then(({ data }) => {
        // console.log(data)
        if (data == "true") {
          // this.$router.go()
          this.$router.go(-1);
        }
      });
    },
    denyRecipe: function(reason) {
      this.recipe_id.msg =
        "Denied because text contains inappropriate language";
      if (reason == 2) {
        this.recipe_id.msg = "Denied because image is inappropiate";
      }
      axios.post("/deny_recipes", this.recipe_id).then(({ data }) => {
        // console.log(data)
        if (data == "true") {
          // this.$router.go()
          this.$router.go(-1);
        }
      });
    },
    goBack: function() {
      this.$router.go(-1);
    }
  },
  created() {
    // let temp = this.$route.params.recipe
    // this.recipe.id = this.$route.params.recipe[0];
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.uid = user[1];
    }

    let r = JSON.parse(localStorage.getItem("t_recipe"));
    r = r["recipe"];
    // console.log(r);
    console.log(r[1]);

    this.recipe.title = r[1];
    this.recipe.author = r[2];
    this.recipe.prep_time = r[8];
    this.recipe.servings = r[9];
    this.recipe.instructions = this.processText(r[5]);
    this.recipe.ingredients = this.processText(r[4]);
    this.recipe.image = this.setImage(r[6]);
    this.recipe.author_id = r[10];
    this.recipe.err_msg = r[11];

    this.recipe_approved = r[7];
    this.recipe_id.id = r[0];

    // console.log(this.recipe.author_id, this.uid, this.recipe.author_id == this.uid)
  },
  computed: {
    //   ...authComputed,
    isAdmin: function() {
      // let user = JSON.parse(localStorage.getItem('user'))
      if (this.uid) {
        return this.uid == 18;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 50px;
}
.title {
  /* margin-top: -100px; */
  margin-bottom: 50px;
  font-size: 50px;
}

img {
  margin-bottom: 25px;
  width: 500px;
  height: auto;
}

.row {
  margin-bottom: 50px;
}

.back-btn {
  margin-left: auto;
  background-color: #f67676;
  /* border: none; */
}

p {
  white-space: pre-line;
}

#msg {
  color: red;
}

.btn {
  margin-bottom: 50px;
  margin-right: 10px;
}

.btn,
.btn-primary,
.btn-primary:hover {
  background-color: transparent;
  border-color: #ede5ce;
  color: #ede5ce;
}

.btn-primary:hover {
  background-color: #ede5ce;
  color: #0e505e;
}
</style>
