<template>
  <div class="container">
    <!-- filtering nav -->
    <nav class="navbar navbar-expand-lg navbar-light filterNav">
      <form class="form-inline">
        <label for="type" style="margin-right: 10px">Filter By: </label>
        <select
          name="type"
          id="type"
          class="form-control"
          v-model="selected"
          @change="filter"
        >
          <option selected> All </option>
          <option> Appetizer </option>
          <option> Soup </option>
          <option> Salad </option>
          <option> Entrée </option>
          <option> Pasta </option>
          <option> Desert </option>
          <option> Sauce </option>
          <option> Side </option>
          <option> Other </option>
        </select>
      </form>
      <form class="form-inline" id="searchBar" @submit.prevent="searchFilter()">
        <input
          required
          class="form-control"
          type="search"
          placeholder="Search"
          aria-label="Search"
          ref="recipe_name"
        />
        <button class="btn btn-primary searchBtn" type="submit">Search</button>
      </form>
    </nav>

    <!-- recipe list -->
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
      filtered: [],
      isReady: false,
      itemsPerRow: 4,
      rowCount: 2,
      selected: "All"
    };
  },
  computed: {
    isThereMore: function() {
      let temp = this.itemsPerRow * this.rowCount;
      return temp < this.filtered.length;
    }
  },
  methods: {
    itemRows: function(index) {
      return this.filtered.slice(
        (index - 1) * this.itemsPerRow,
        index * this.itemsPerRow
      );
    },
    loadMore: function() {
      this.rowCount += 1;
    },
    filter: function() {
      this.filtered = [];
      if (this.selected != "All") {
        for (let i = 0, l = this.all_recipes.length; i < l; i++) {
          if (this.all_recipes[i][3] == this.selected) {
            this.filtered.push(this.all_recipes[i]);
          }
        }
      } else {
        this.filtered = this.all_recipes;
      }
    },
    searchFilter: function() {
      this.filtered = [];
      let str = this.$refs.recipe_name.value.toLowerCase();

      for (let i = 0, l = this.all_recipes.length; i < l; i++) {
        let temp = this.all_recipes[i][1].toLowerCase();
        if (temp.includes(str)) {
          this.filtered.push(this.all_recipes[i]);
        }
      }
    }
  },
  created() {
    axios.get("/all_recipes").then(({ data }) => {
      if (data.length > 0) {
        data = data.reverse();
        this.all_recipes = data;
        this.filtered = data;
        this.isReady = true;
      }
    });
  }
};
</script>

<style scoped>
.recipe {
  margin: 20px;
  padding: 10px;
  /* max-width: 200px; */
  box-shadow: 5px 5px 10px #042536;
  /* color: #FD7471; */
}

.btn {
  width: 70%;
  margin-top: 25px;
  margin-bottom: 25px;
  font-size: 20px;
}

.btn,
.btn-primary,
.btn-primary:hover {
  background-color: transparent;
  border-color: #fd7471;
  color: #fd7471;
}

.btn-primary:hover {
  background-color: #fd7471;
  color: #ede5ce;
}

.filterNav {
  width: 100%;
  padding: 10px;
  margin: 10px;
  background-color: transparent;
  font-size: 20px;
  color: #fd7471;
}

.searchBtn {
  width: auto;
  margin-left: 10px;
  font-size: 20px;
}

#searchBar {
  margin-left: auto;
}

input,
input:focus {
  background-color: transparent;
  font-size: 20px;
  color: #fd7471;
  border-color: #fd7471;
}

select,
select:focus {
  background-color: transparent;
  font-size: 20px;
  border-color: #fd7471;
  color: #fd7471;
}

option {
  color: #0e505e;
}
</style>
