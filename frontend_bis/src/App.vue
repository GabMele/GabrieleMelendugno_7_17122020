<template>
  <div id="app-vue" class="container-fluid m-0 p-0 main-bg">
    <Header />
    <router-view />
  </div>
  <Footer />
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="scss">
   @import './assets/scss/main.scss';
</style>