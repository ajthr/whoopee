<template>
  <section>
    <b-modal
      :active.sync="profileModalActive"
      has-modal-card
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-modal
    >
      <form action>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Profile</p>
          </header>
          <section class="modal-card-body">
            <b-field label="Name">
              <b-input type="text" v-model="name" placeholder="Name"></b-input>
            </b-field>
            <b-field label="Email">
              <b-input type="email" v-model="email" placeholder="Email"></b-input>
            </b-field>
            <b-field label="New Password">
              <b-input type="password" v-model="newPassword" placeholder="New Password"></b-input>
            </b-field>
            <div class="divider"></div>
            <b-field label="Confirm Password">
              <b-input
                type="password"
                v-model="password"
                placeholder="Confirm your password to make changes"
                required
              ></b-input>
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <button class="button" type="button" @click="hideProfile">Close</button>
            <b-button type="submit" @click.prevent="saveProfile">Save</b-button>
          </footer>
        </div>
      </form>
    </b-modal>
  </section>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      name: null,
      email: null,
      newPassword: null,
      password: null,
      uid: this.$cookie.get("uid"),
    };
  },
  computed: {
    profileModalActive: {
      get() {
        return this.$store.state.profileModalActive;
      },
    },
  },
  methods: {
    hideProfile() {
      this.$store.commit("setProfileModal", false);
    },
    getProfile() {
      this.axios
        .get("/api/auth/u/" + this.uid)
        .then((res) => {
          this.name = res.data.name;
          this.email = res.data.email;
        })
        .catch((err) => console.log(err));
    },
    saveProfile() {
      this.axios
        .patch("api/auth/u/" + this.uid, {
          name: this.name,
          email: this.email,
          newPassword: this.newPassword,
          password: this.password,
        })
        .then(() => {
          this.newPassword = null;
          this.password = null;
          this.getProfile();
        })
        .catch((err) => console.log(err));
    },
    togglePasswordModal() {
      this.profileModal = !this.profileModal;
    },
  },
  mounted() {
    this.getProfile();
  },
};
</script>
