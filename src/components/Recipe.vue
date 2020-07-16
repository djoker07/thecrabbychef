<template>
  <div class="card" style="width: 18rem;">
    <img
      :src="getImage(recipe[6])"
      class="card-img-top img-fluid"
      alt="thecrab"
    />
    <div class="card-body">
      <h5 class="card-title">{{ recipe[1] }}</h5>
      <p class="card-text">By: {{ recipe[2] }}</p>
      <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
    </div>
    <div class="card-footer">
      <div class="row" align="center">
        <div class="col">
          <button @click="viewRecipe(recipe)" class="btn btn-primary">
            View
          </button>
          <!-- <button @click="updateRecipe(recipe)" class="btn btn-danger"> Edit </button> -->
        </div>
        <div class="col" :hidden="isEditable">
          <!-- <button @click="viewRecipe(recipe)" class="btn btn-success"> View </button> -->
          <button
            @click="updateRecipe(recipe)"
            class="btn btn-primary"
            id="editBtn"
          >
            Edit
          </button>
        </div>
      </div>
      <!-- <button v-if="isAdmin && recipe[7]==1" @click="approveRecipe(recipe)"> Approve </button> -->
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  name: "Recipe",
  props: {
    recipe: {
      type: Array,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      uid: 0
    };
  },
  methods: {
    viewRecipe: function(trecipe) {
      this.$store
        .dispatch("set_recipe", {
          recipe: trecipe
        })
        .then(() => {
          this.$router.push({ name: "view" });
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateRecipe: function(recipe) {
      this.$router.push({ name: "update", params: { recipe } });
    },
    getImage: function(name) {
      let img_path = "https://crabby.7bytes.ai/recipes/";
      return img_path + name;
    }
  },
  computed: {
    isEditable: function() {
      let valid = false;
      if (this.recipe[10] !== this.uid) {
        valid = true;
      }
      return valid;
    }
  },
  created() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.uid = user[1];
    }
  }
};
</script>

<style scoped>
.card,
.card-footer {
  background-color: #0e505e;
}

.card-img-top {
  width: 100%;
  height: 10vw;
  object-fit: cover;
}

.btn {
  width: 100%;
  margin-top: 5px;
  font-size: 20px;
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
