<template>
  <div class="detail">
    <Navbar />
    <div class="overview">
      <div class="bg-img">
        <img :src="imgUrl + movie.poster_path" style="border-radius: 6px;" />
      </div>
      <div class="details">
        <div class="t-r" style="margin-bottom: 1rem">
          <span class="movie-title">{{ movie.title }} ({{ movie.original_language }})</span>
          <span>
            <i class="fas fa-star"></i>
            {{ movie.vote_average }} / 10
          </span>
        </div>
        <div class="genre" style="margin-bottom: 1rem">
          <span v-for="genre in movie.genres" :key="genre.id">&nbsp;{{ genre.name }} |</span>
        </div>
        <div class="desc">{{ movie.overview }}</div>
        <div class="btns">
          <b-tooltip label="Favorite" type="is-dark" position="is-top">
            <a
              class="btn"
              @click="toggleFav"
              role="button"
              v-if="loggedIn"
              :class="{ active: isFav }"
            >
              <i class="fas fa-heart"></i>
            </a>
          </b-tooltip>

          <b-tooltip label="IMDB" type="is-dark" position="is-top">
            <a class="btn" :href="imdbUrl + movie.imdb_id">
              <i class="fab fa-imdb"></i>
            </a>
          </b-tooltip>
          <b-tooltip label="18+" type="is-dark" position="is-top">
            <a class="btn" v-if="movie.adult">
              <i class="far fa-eye-slash"></i>
            </a>
          </b-tooltip>
        </div>
        <div class="desc">Release Date: {{ movie.release_date }}</div>
      </div>
    </div>
    <Reviews />
    <Recommendations />
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/navbar.vue";
import Reviews from "@/components/reviews.vue";
import Recommendations from "@/components/recommendations.vue";
import Footer from "@/components/footer.vue";

export default {
  name: "Movie",
  data() {
    return {
      token: null,
      uid: null,
      movie: [],
      favorites: [],
      isFav: null,
    };
  },
  components: {
    Navbar,
    Reviews,
    Recommendations,
    Footer,
  },
  methods: {
    toggleFav() {
      this.axios
        .post("/api/favorites", {
          id: this.uid,
          mid: this.$route.params.mid,
        })
        .then((this.isFav = !this.isFav))
        .catch((err) => console.log(err));
    },
    favContainsMovie() {
      return this.favorites.some((favMovie) => {
        return favMovie.id === this.movie.id;
      });
    },
    getMovie(mid) {
      this.axios
        .get("/api/movies/a/" + mid)
        .then((res) => {
          this.movie = res.data;
          this.isFav = this.favContainsMovie();
        })
        .catch((err) => console.log(err));
    },
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    },
    imgUrl() {
      return this.$store.state.imgUrl;
    },
    imdbUrl() {
      return this.$store.state.imdbUrl;
    },
  },
  async created() {
    this.isLoading = true;
    this.token = this.$cookie.get("token") || null;
    this.uid = this.$cookie.get("uid") || null;
    if (this.token !== null && this.uid !== null) {
      this.$store.commit("setUser", true);

      await this.axios
        .get("/api/favorites", {
          params: {
            id: this.uid,
          },
        })
        .then((res) => (this.favorites = res.data))
        .catch((err) => console.log(err));
    }
    await this.getMovie(this.$route.params.mid);
  },
};
</script>

<style>
@media screen and (min-width: 768px) {
  .overview {
    background: linear-gradient(to top, hsl(207, 83%, 50%), hsl(207, 83%, 80%));
    height: calc(100vh - 50px);
    display: grid;
    grid-template-columns: 30% 70%;
  }

  .bg-img {
    margin: 7rem auto;
    height: 30vh;
    width: 20vw;
    opacity: 0.9;
  }

  .details {
    margin: auto 2rem;
  }
}

@media screen and (max-width: 768px) {
  .overview {
    background: linear-gradient(to top, hsl(207, 83%, 50%), hsl(207, 83%, 80%));
  }

  .bg-img {
    overflow: hidden;
    max-width: 100vw;
    opacity: 0.5;
  }

  .details {
    margin: 10px;
  }
}

.t-r span {
  display: inline-block;
}

.movie-title {
  color: white;
  font-weight: bolder;
  font-size: 30px;
  margin-right: 1.5rem;
  word-wrap: wrap;
}

.btns {
  margin-top: 1rem;
  margin-right: 1rem;
  font-size: 2.5rem;
}

.btn {
  margin-right: 1rem;
  color: inherit;
  color: hsl(153, 47%, 60%);
}

.btn:hover {
  color: hsl(153, 47%, 55%);
}

.active {
  color: hsl(349, 87%, 58%);
}

.reviews {
  max-height: 60vh;
  overflow-y: scroll;
  overflow-x: hidden;
  margin: 2rem 1rem;
  border-top: 1px solid #cfd0d4;
  border-bottom: 1px solid #cfd0d4;
}

.reviews::-webkit-scrollbar {
  display: none;
}

.review-card {
  padding: 1rem 0;
  margin: 1rem 1rem;
  border: 1px solid #e6ecf0;
  border-radius: 10px;
  box-shadow: 5px 5px hsl(207, 83%, 80%);
}

.recommendations {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}

.recommendations-card {
  display: inline-block;
  max-height: 300px !important;
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
