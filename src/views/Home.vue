<template>
  <div class="homeDiv">
    <!-- <img alt="Vue logo" src="../assets/crab.png" /> :navigate-to="someLocalProperty" -->
    <img class="" src="../assets/charcoal2.png" alt="" id="myImg" />

    <p id="welcome">
      Welcome to The Crabby Chef <br />
      A community to share and experiment with your favorite recipes.
    </p>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {}
};
</script>

<style scoped>
#myImg {
  /* margin-top: -60px; */
  z-index: -1;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.8;
  /* width: fit;
  height: auto; */
}

#welcome {
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  /* margin-top: -500px; */
}
</style>
