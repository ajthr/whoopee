<template>
  <div>
    <Navbar />
    <div v-if="!movies">No Data</div>
    <div v-else>
      <h2 class="title" style="margin-left: 2rem; margin-top: 1rem">
        search results for
        <span class="search-string">{{ this.$route.query.search_string }}</span>
      </h2>
      <ul class="movie is-centered">
        <li class="card movie-card" v-for="movie in movies" :key="movie.id">
          <router-link :to="{ name: 'Movie', params: { mid: movie.id } }">
            <div class="card-image">
              <figure class="image">
                <img
                  :src="imgUrl + movie.poster_path"
                  width="250"
                  height="400"
                />
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
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/navbar.vue'
import Footer from '@/components/footer.vue'

export default {
  name: 'Search',
  data() {
    return {
      query_string: this.$route.query.search_string,
      movies: [],
      total: null,
      page: this.$route.query.page,
      perPage: 20,
      rangeBefore: 3,
      rangeAfter: 1,
      order: 'is-centered',
      isRounded: true,
    }
  },
  components: {
    Navbar,
    Footer,
  },
  computed: {
    imgUrl() {
      return this.$store.state.imgUrl
    },
  },
  methods: {
    pushPage() {
      this.$router.push({
        name: 'Search',
        query: { search_string: this.query_string, page: this.page },
      })
    },
    getMovies() {
      this.axios
        .get('api/movies/s/', {
          params: {
            query_string: this.query_string,
            page: this.page,
          },
        })
        .then((res) => {
          this.total = res.data.total_results
          this.movies = res.data.results
        })
        .catch((err) => console.log(err))
    },
  },
  watch: {
    page: function() {
      this.pushPage()
    },
  },
  created() {
    this.getMovies()
  },
}
</script>

<style>
.search-string {
  font-style: italic;
  color: hsl(207, 83%, 50%);
}
</style>
