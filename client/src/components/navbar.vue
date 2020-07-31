<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <span class="whooper-logo">
          Whooper
          <span style="color: #1789ea">!</span>
        </span>
      </b-navbar-item>
    </template>
    <template slot="end">
      <form @submit.prevent="search">
        <b-field class="search" v-if="currentRoute === 'Home' || 'Search'">
          <b-input
            placeholder="Search"
            type="search"
            icon-pack="fas"
            v-model="searchQuery"
            icon="search"
          ></b-input>
        </b-field>
      </form>
      <b-navbar-item tag="div" v-if="!loggedIn">
        <div class="buttons">
          <router-link to="/signup">
            <a class="button signup-btn">
              <strong>Sign up</strong>
            </a>
          </router-link>
          <router-link to="/login">
            <a class="button login-btn">
              <strong>Login</strong>
            </a>
          </router-link>
        </div>
      </b-navbar-item>
      <b-navbar-item v-if="loggedIn">
        <b-dropdown position="is-bottom-left" append-to-body aria-role="menu">
          <a class="navbar-item" slot="trigger" role="button">
            <span>
              <i class="fas fa-heart"></i>
            </span>
          </a>

          <div class="modal-card">
            <section class="modal-card-body">
              <b-dropdown-item
                v-for="movie in favorites"
                :key="movie.id"
                aria-role="listitem"
                @click="showDetails(movie.id)"
                style="padding: 10px 0"
              >
                <span class="fav-movie-title">{{ movie.title }}</span>
              </b-dropdown-item>
            </section>
          </div>
        </b-dropdown>
      </b-navbar-item>
      <b-navbar-item v-if="loggedIn">
        <b-dropdown position="is-bottom-left" append-to-body aria-role="menu">
          <a class="navbar-item" slot="trigger" role="button" slot-scope="{ active }">
            <span>
              <i class="fas fa-user-circle"></i>&nbsp;
              <i :class="active ? 'fas fa-caret-up' : 'fas fa-caret-down'"></i>
            </span>
          </a>

          <div class="modal-card" style="width: 200px;">
            <section class="modal-card-body">
              <b-dropdown-item aria-role="listitem" @click="showProfile" style="padding: 10px 0">
                <span>
                  <i class="fas fa-id-card"></i>
                </span>
                Profile
              </b-dropdown-item>
              <b-dropdown-item aria-role="listitem" @click="logout" style="padding: 10px 0">
                <span>
                  <i class="fas fa-sign-out-alt"></i>
                </span>
                Logout
              </b-dropdown-item>
            </section>
          </div>
        </b-dropdown>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      token: null,
      uid: null,
      favorites: [],
      searchQuery: null,
    };
  },
  methods: {
    search() {
      this.$router.push({
        name: "Search",
        query: { search_string: this.searchQuery, page: 1 },
      });
    },
    logout() {
      this.$cookie.delete("token");
      this.$cookie.delete("uid");
      this.$store.commit("setUser", false);
    },
    showProfile() {
      this.$store.commit("setProfileModal", true);
    },
    getFav() {
      this.axios
        .get("/api/favorites", {
          params: {
            id: this.uid,
          },
        })
        .then((res) => (this.favorites = res.data))
        .catch((err) => console.log(err));
    },
    showDetails(id) {
      this.$router.push({ name: "Movie", params: { mid: id } });
    },
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    },
    currentRoute() {
      return this.$route.name;
    },
  },
  mounted() {
    this.token = this.$cookie.get("token") || null;
    this.uid = this.$cookie.get("uid") || null;
    this.getFav();
  },
};
</script>

<style>
.whooper-logo {
  margin-left: 10px;
  font-family: "Vast Shadow", cursive;
  color: hsl(153, 47%, 60%);
}

.search {
  padding-top: 0.7rem;
}

.signup-btn {
  margin-right: 10px;
  background: #41b883;
  color: white;
}

.login-btn {
  background: #1789ea;
  color: white;
  font-weight: bold;
}

.fav-movie-title {
  display: block;
  white-space: nowrap;
  width: 30rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

a.navbar-item {
  padding: 0 0.5rem !important;
}

a.navbar-item:hover {
  background: transparent !important;
  color: #41b883 !important;
}

a.navbar-item:active {
  background: transparent !important;
  color: hsl(153, 47%, 60%) !important;
}
</style>
