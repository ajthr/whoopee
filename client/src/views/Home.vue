<template>
  <div class="home">
    <Navbar />
    <Trending />
    <Profile />
    <Movies />
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/navbar.vue'
import Trending from '@/components/trending.vue'
import Movies from '@/components/movies.vue'
import Footer from '@/components/footer.vue'
import Profile from '@/components/profile.vue'

export default {
  name: 'Home',
  data() {
    return {
      movies: [],
      token: null,
      uid: null,
    }
  },
  components: {
    Navbar,
    Trending,
    Movies,
    Profile,
    Footer,
  },
  computed: {
    profileModalActive() {
      return this.$store.state.profileModalActive
    },
  },
  created() {
    this.token = this.$cookie.get('token') || null
    this.uid = this.$cookie.get('uid') || null
    if (this.token !== null && this.uid !== null) {
      this.$store.commit('setUser', true)
    }
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Baloo+Da+2:wght@600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Vast+Shadow&display=swap');

.custom-title {
  margin: 1rem;
  margin-bottom: 0;
  font-family: 'Baloo Da 2', cursive;
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: capitalize;
}
</style>
