<template>
  <div class="container">
    <div v-if="isReady">
      <div class="row" v-for="i in rowCount" :key="i">
        <recipe
          v-for="(recipe, idx) in itemRows(i)"
          :key="idx"
          :recipe="recipe"
          class="col-sm recipe"
        />
      </div>
    </div>
    <div v-else>
      <h1>Nothing to show here</h1>
    </div>

    <button
      @click="loadMore()"
      v-if="isReady && isThereMore"
      class="btn btn-primary"
    >
      Load More
    </button>
  </div>
</template>

<script>
import recipe from "../components/Recipe";
import axios from "axios";
export default {
  components: { recipe },
  data() {
    return {
      all_recipes: [],
      isReady: false,
      itemsPerRow: 4,
      rowCount: 2
    };
  },
  methods: {
    itemRows: function(index) {
      return this.all_recipes.slice(
        (index - 1) * this.itemsPerRow,
        index * this.itemsPerRow
      );
    },
    loadMore: function() {
      this.rowCount += 1;
      console.log(this.rowCount);
    }
    // viewEvent: function(recipe) {
    //     console.log("recipe: " + recipe.title);
    // }
  },
  created() {
    axios.get("/approve_recipes").then(({ data }) => {
      if (data.length > 0) {
        this.all_recipes = data;
        this.isReady = true;
      }
      // console.log(this.all_recipes)
    });
  },
  computed: {
    isThereMore: function() {
      let temp = this.itemsPerRow * this.rowCount;
      return temp < this.all_recipes.length;
    }
  }
};
</script>

<style scoped>
.recipe {
  margin: 20px;
  padding: 10px;
  /* max-width: 200px; */
  /* box-shadow: 5px 5px 10px #FD7471; */
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
