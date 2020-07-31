<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-4-tablet is-4-desktop is-4-widescreen">
            <div v-if="error" class="field">
              <span class="error">Something went wrong. Please Try again</span>
            </div>
            <form class="box">
              <div class="field">
                <label class="label">Name</label>
                <div class="control has-icons-left">
                  <input
                    type="email"
                    class="input"
                    placeholder="Name"
                    v-model="name"
                    required
                  />
                  <span class="icon is-small is-left">
                    <i class="fas fa-signature"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label class="label">Email</label>
                <div class="control has-icons-left">
                  <input
                    type="email"
                    class="input"
                    placeholder="Email"
                    v-model="email"
                    required
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <div class="control has-icons-left">
                  <input
                    type="Password"
                    class="input"
                    placeholder="password"
                    v-model="password"
                    required
                    password-reveal
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label class="label">Confirm Password</label>
                <div class="control has-icons-left">
                  <input
                    type="Password"
                    class="input"
                    placeholder="confirm password"
                    v-model="confirmPassword"
                    required
                    password-reveal
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                  </span>
                </div>
              </div>
              <div class="row">
                <div class="field" style="margin-top: 0.6rem;">
                  <a>
                    Login
                    <i class="fas fa-external-link-alt"></i>
                  </a>
                </div>

                <div class="field">
                  <button @click.prevent="signup" class="button is-link">
                    Signup
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Signup',
  data() {
    return {
      name: null,
      email: null,
      password: null,
      confirmPassword: null,
      error: null,
    }
  },
  methods: {
    signup() {
      if (this.password !== this.confirmPassword) {
        this.error = "Passwords doesn't match"
      } else {
        this.axios
          .post('api/auth/signup', {
            name: this.name,
            email: this.email,
            password: this.password,
          })
          .then(this.$router.push('/login'))
          .catch((err) => {
            this.error = error
            this.password = null
            this.confirmPassword = null
          })
      }
    },
  },
  mounted() {
    if (
      this.$cookie.get('token') !== null &&
      this.$cookie.get('uid') !== null
    ) {
      this.$router.push('/')
    }
  },
}
</script>
