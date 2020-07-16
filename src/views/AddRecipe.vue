<template>
  <div class="container">
    <h1>Add New Recipe</h1>
    <form @submit.prevent="addNew">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="title">Title</label>
          <input
            type="text"
            class="form-control"
            id="title"
            v-model="recipe.title"
          />
        </div>
        <div class="form-group col-md-6">
          <label for="author">Author</label>
          <input
            type="text"
            class="form-control"
            id="author"
            v-model="recipe.author"
          />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="type">Type</label>
          <select
            name="type"
            id="type"
            class="form-control"
            v-model="recipe.type"
          >
            <option selected> Appetizer </option>
            <option> Soup </option>
            <option> Salad </option>
            <option> Entrée </option>
            <option> Pasta </option>
            <option> Desert </option>
            <option> Sauce </option>
            <option> Side </option>
            <option> Other </option>
          </select>
        </div>
        <!-- <div class="form-group col-md-4">
                    <label for="servings">Servings</label>
                    <input type="number" class="form-control" id="servings" placeholder="(e.g.) 4">
                </div> -->
        <div class="custom-file col-md-6" style="margin-top: 38px;">
          <label for="imageFile" class="custom-file-label" id="imageLabel"
            >Choose Image</label
          >
          <input
            type="file"
            class="custom-file-input"
            id="imageFile"
            @change="getImage"
            accept="image/*"
          />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="prep">Prep Time (in minutes)</label>
          <input
            type="number"
            class="form-control"
            id="prep"
            placeholder="(e.g.) 25"
            v-model="recipe.prep_time"
          />
        </div>
        <div class="form-group col-md-6">
          <label for="servings">Servings</label>
          <input
            type="number"
            class="form-control"
            id="servings"
            placeholder="(e.g.) 4"
            v-model="recipe.servings"
          />
        </div>
      </div>
      <div class="form-group">
        <div class="mb-3">
          <label for="ingredients"> Ingredients </label>
          <textarea
            name="ingredients"
            id="ingredients"
            cols="30"
            rows="5"
            class="form-control"
            placeholder="One per line. (wil be displayed as a list)"
            v-model="recipe.ingredients"
          ></textarea>
        </div>
        <div class="mb-3">
          <label for="instructions"> Instructions </label>
          <textarea
            name="instructions"
            id="instructions"
            cols="30"
            rows="5"
            class="form-control"
            placeholder="Note: Will save line breaks"
            v-model="recipe.instructions"
          ></textarea>
        </div>
      </div>

      <button type="submit" class="btn btn-primary ">Submit</button>
    </form>
    <p>{{ error }}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      recipe: {
        title: "",
        author: "",
        type: "",
        image: "",
        prep_time: 0,
        servings: 0,
        ingredients: "",
        instructions: "",
        approved: 1,
        author_id: 1,
        err_msg: "Submitted for Approval"
      },
      image_upload: "",
      error: null
    };
  },
  methods: {
    addNew: function() {
      // console.log(this.recipe.instructions)
      const config = {
        headers: { "content-type": "multipart/form-data" }
      };
      axios
        .post("/upload_image", this.image_upload, config)
        .then(({ data }) => {
          if (data != "true") {
            this.error = data;
          } else {
            console.log(this.recipe);
            axios.post("/new_recipe", this.recipe).then(({ r_data }) => {
              console.log("Success", r_data);
              this.$router.push({
                name: "dashboard",
                params: { msg: "Submitted for Approval" }
              });
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.error = err;
        });
    },
    getImage: function(event) {
      var image = document.getElementById("imageLabel");
      image.innerHTML = event.target.files[0].name;
      // console.log(event.target.files[0])
      let fd = new FormData();
      // console.log(event.target.files[0], event.target.files[0].name)
      let filename = Date.now() + "_" + event.target.files[0].name;
      this.recipe.image = filename;
      fd.append("image", event.target.files[0], filename);
      // console.log(fd)
      this.image_upload = fd;

      // console.log(this.image_upload)
    }
  },
  created() {
    // this.recipe.author_id =
    let user = JSON.parse(localStorage.getItem("user"));
    // console.log(user)
    this.recipe.author_id = user[1];
    this.recipe.author = user[2];
  }
};
</script>

<style scoped>
form {
  width: 75%;
}

button {
  display: block;
  margin: 25px auto;
  padding: 15px 50px;
  font-size: 20px;
}

p {
  color: #fd7471;
}

textarea,
textarea:focus {
  background-color: transparent;
  font-size: 20px;
  color: #ede5ce;
  border-color: #ede5ce;
  white-space: pre-line;
}

input,
input:focus {
  background-color: transparent;
  font-size: 20px;
  color: #ede5ce;
  border-color: #ede5ce;
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

select,
select:focus {
  background-color: transparent;
  font-size: 20px;
  border-color: #ede5ce;
  color: #ede5ce;
}

option {
  color: #0e505e;
}

#imageLabel {
  background-color: transparent;
  border-color: #ede5ce;
  color: #ede5ce;
}
</style>
