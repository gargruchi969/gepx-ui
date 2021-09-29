<template>
  <div v-if="!isNavBarVisibleState">
    <v-app-bar app color="white">
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="@/assets/gelogo.png"
          transition="scale-transition"
          width="40"
        />
      </div>

      <v-spacer></v-spacer>

      <v-tabs active-class="navitem-active" hide-slider left="true">
        <v-tab to="/dashboard">
          <span class="navitem-name"> Dashboard </span>
        </v-tab>
        <v-tab to="/orders"><span class="navitem-name"> Orders </span></v-tab>
        <v-tab to="/bidding"><span class="navitem-name"> Bidding </span></v-tab>
        <v-tab to="/payments"
          ><span class="navitem-name"> Payments </span></v-tab
        >
      </v-tabs>

      <v-tabs hide-slider right="true">
        <v-tab light class="signout-action">
          <v-icon color="#0000008a">mdi-account</v-icon>
          <span class="signout-action signout-name"> {{ userEmail }} </span>
        </v-tab>
        <v-tab class="signout-action" @click="signOutUser">
          <v-icon color="#0000008a">mdi-logout</v-icon
          ><span class="signout-action signout-name"> Sign Out </span></v-tab
        >
      </v-tabs>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    isNavBarVisibleState() {
      return this.isNavBarVisible;
    },
    userEmail() {
      return localStorage.getItem("user-email");
    },
    ...mapState(["isNavBarVisible"]),
  },
  mounted() {
    this.navbarState();
  },
  methods: {
    navbarState() {
      if (this.$router.currentRoute.path === "/login-or-register") {
        this.isNavigationBarVisible = false;
      } else {
        this.isNavigationBarVisible = true;
      }
    },
    signOutUser() {
      localStorage.removeItem("user-id");
      this.$store.commit("navbarHide", true);
      this.$router.push("/login-or-register");
      this.navbarState();
    },
  },
  data() {
    return {
      isNavigationBarVisible: false,
    };
  },
};
</script>

<style scoped>
.navitem-name {
  text-transform: none !important;
  font-size: 1rem;
}
.navitem-active {
  font-weight: bold !important;
  color: #3c74bc !important;
}
.signout-action {
  color: #0000008a;
}
.signout-name {
  padding-left: 0.5rem;
  text-transform: none !important;
  font-size: 1rem;
}
</style>
