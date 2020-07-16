<template>
  <div id="app">
    <!-- <img alt="Logo" src="/assets/crab.png" /> -->
    <Nav />
    <router-view class="page" />
  </div>
</template>

<script>
import Nav from "./components/Nav";

export default {
  components: { Nav }
};
</script>

<style>
body {
  background-image: linear-gradient(
    to top,
    #060e11,
    #081418,
    #09181e,
    #091c25,
    #07202c,
    #072533,
    #062a39,
    #052f40,
    #063748,
    #083f4f,
    #0a4757,
    #0e505e
  );
  color: #ede5ce;
  font-family: rajani;
  font-size: 20px;
  /* overflow: hidden; */
}

@font-face {
  font-family: dafoe;
  src: url("assets/Font/mr-dafoe/MrDafoe-Regular.ttf");
}

@font-face {
  font-family: rajani;
  src: url("assets/Font/rajdhani/rajdhani-light.ttf");
}

.page {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 56px);
  /* overflow: auto; */
}

body::-webkit-scrollbar {
  width: 3px; /* width of the entire scrollbar */
}
body::-webkit-scrollbar-track {
  background: #0e505e; /* color of the tracking area */
}
body::-webkit-scrollbar-thumb {
  background-color: #fd7471; /* color of the scroll thumb */
  border-radius: 20px; /* roundness of the scroll thumb */
  /* border: 3px solid #0E505E;  creates padding around scroll thumb */
}
</style>
