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
                <label class="label">Email</label>
                <div class="control has-icons-left">
                  <input type="email" class="input" placeholder="Email" v-model="email" required />
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
              <div class="row">
                <div class="field" style="margin-top: 0.6rem;">
                  <a>
                    Signup
                    <i class="fas fa-external-link-alt"></i>
                  </a>
                </div>

                <div class="field">
                  <button @click.prevent="login" class="button is-link">Login</button>
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
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      error: null,
    };
  },
  methods: {
    login() {
      this.axios
        .post("api/auth/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          this.$cookie.set("token", res.data.token);
          this.$cookie.set("uid", res.data.uid);
          this.$router.push("/");
        })
        .catch((err) => (this.error = err));
    },
  },
  mounted() {
    if (
      this.$cookie.get("token") !== null &&
      this.$cookie.get("uid") !== null
    ) {
      this.$router.push("/");
    }
  },
};
</script>

<style>
.hero {
  background: #41b883;
}

.text {
  font-size: 12px;
}

.box {
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
</style>
