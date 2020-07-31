<template>
  <div id="app">
    <!-- <b-loading :is-full-page="true" :active.sync="isLoading"></b-loading> -->
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isLoading: true,
    };
  },
  mounted() {
    this.$nextTick(async () => {
      setTimeout(function () {
        this.isLoading = false;
      }, 3000);
    });
  },
};
</script>

<style>
</style>
