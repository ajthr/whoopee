<template>
  <div class="reviews">
    <h2 class="custom-title">Reviews</h2>
    <div style="margin:2rem; font-weight:bold" v-if="reviews.length === 0">No reviews yet</div>
    <div class="review-card" v-for="review in reviews" :key="review.id">
      <header class="card-header">
        <p class="card-header-title">Review by {{ review.author }}</p>
        <a href="#" class="card-header-icon" aria-label="more options"></a>
      </header>
      <div class="card-content">
        <div class="content">{{ review.content }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Reviews",
  data() {
    return {
      reviews: [],
    };
  },
  mounted() {
    this.axios
      .get("/api/movies/c/" + this.$route.params.mid)
      .then((res) => (this.reviews = res.data.results))
      .catch((err) => console.log(err));
  },
};
</script>
