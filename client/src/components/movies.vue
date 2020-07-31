<template>
  <div class="movies">
    <header class="movie-header">
      <h2 class="custom-title" style="margin-top: 0; margin-left: 5rem">{{ getHeader() }}</h2>
      <b-dropdown position="is-bottom-left" append-to-body aria-role="menu" trap-focus>
        <button class="button is-primary" slot="trigger" slot-scope="{ active }">
          <span>
            sort&nbsp;
            <i :class="active ? 'fas fa-caret-up' : 'fas fa-caret-down'"></i>
          </span>
        </button>

        <div class="modal-card" style="width: 200px;">
          <section class="modal-card-body">
            <b-dropdown-item aria-role="listitem" @click="filter = 'popular'">Popular</b-dropdown-item>
            <b-dropdown-item aria-role="listitem" @click="filter = 'now_playing'">Now Playing</b-dropdown-item>
            <b-dropdown-item aria-role="listitem" @click="filter = 'top_rated'">Top Rated</b-dropdown-item>
          </section>
        </div>
      </b-dropdown>
    </header>
    <ul class="movie is-centered">
      <li class="card movie-card" v-for="movie in movies" :key="movie.id" @click="savePage()">
        <router-link :to="{ name: 'Movie', params: { mid: movie.id } }">
          <div class="card-image">
            <figure class="image">
              <img :src="imgUrl + movie.poster_path" width="250" height="400" />
            </figure>
          </div>
        </router-link>
      </li>
    </ul>

    <b-pagination
      :total="total"
      :current.sync="page"
      :range-before="rangeBefore"
      :range-after="rangeAfter"
      :order="order"
      :rounded="isRounded"
      :per-page="perPage"
    ></b-pagination>
  </div>
</template>

<script>
export default {
  name: "Movies",
  data() {
    return {
      movies: [],
      filter: "popular",
      total: null,
      page: 1,
      perPage: 20,
      rangeBefore: 3,
      rangeAfter: 1,
      order: "is-centered",
      isRounded: true,
    };
  },
  methods: {
    loadMovies(pageNumber) {
      if (this.page !== pageNumber) {
        this.page = pageNumber;
      }
      this.axios
        .get("/api/movies", {
          params: {
            filter: this.filter,
            page: pageNumber,
          },
        })
        .then((res) => {
          this.total = res.data.total_results;
          this.movies = res.data.results;
        })
        .catch((err) => console.log(err));
    },
    savePage() {
      this.$store.commit("setPage", this.page);
    },
    getHeader() {
      switch (this.filter) {
        case "popular":
          return "Popular";
          break;
        case "now_playing":
          return "Now Playing";
          break;
        case "top_rated":
          return "Top Rated";
          break;
        default:
          break;
      }
    },
  },
  computed: {
    imgUrl() {
      return this.$store.state.imgUrl;
    },
  },
  watch: {
    page: function () {
      this.loadMovies(this.page);
    },

    filter: function () {
      this.page = 1;
      this.loadMovies(this.page);
    },
  },
  created() {
    this.loadMovies(this.$store.state.page);
  },
};
</script>

<style>
.movie {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  padding-top: 2rem;
  padding-left: 4rem;
}

.movie-header {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  margin-right: 7rem;
}

.movie-card {
  max-width: 200px !important;
  margin: 1rem;
}
</style>
