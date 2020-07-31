<template>
  <div class="recommendations">
    <h2 class="custom-title">Recommendations</h2>
    <div
      style="margin:2rem; font-weight:bold"
      v-if="recommendations.length === 0"
    >No Recommendations</div>
    <div class="card recommendations-card" v-for="movie in recommendations" :key="movie.id">
      <router-link :to="{ name: 'Movie', params: { mid: movie.id } }">
        <div class="card-image">
          <figure class="image">
            <img :src="imgUrl + movie.poster_path" width="250" height="400" />
          </figure>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recommendations",
  data() {
    return {
      recommendations: [],
    };
  },
  methods: {
    getRecommendations(mid) {
      this.axios
        .get("/api/movies/r/" + mid)
        .then((res) => (this.recommendations = res.data.results))
        .catch((err) => console.log(err));
    },
  },
  computed: {
    imgUrl() {
      return this.$store.state.imgUrl;
    },
  },
  mounted() {
    this.getRecommendations(this.$route.params.mid);
  },
};
</script>
