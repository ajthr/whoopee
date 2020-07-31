<template>
  <section class="trending">
    <h2 class="custom-title">Trending this week</h2>
    <div class="card trending-card" v-for="movie in trending" :key="movie.id">
      <router-link :to="{ name: 'Movie', params: { mid: movie.id } }">
        <div class="card-image">
          <figure class="image">
            <img :src="imgUrl + movie.poster_path" width="250" height="400" />
          </figure>
        </div>
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: "Trending",
  data() {
    return {
      trending: [],
    };
  },
  computed: {
    imgUrl() {
      return this.$store.state.imgUrl;
    },
  },
  mounted() {
    this.axios
      .get("/api/movies/m/trending")
      .then((res) => (this.trending = res.data.results))
      .catch((err) => console.log(err));
  },
};
</script>

<style>
.trending {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}

.trending-card {
  display: inline-block;
  max-width: 200px !important;
  justify-content: center;
  margin: 1rem;
}

.image {
  max-height: 400px;
  max-width: 200px;
  padding: 0.5rem;
}
</style>
