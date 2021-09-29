<template>
  <v-app>
    <navigation-bar />
    <v-main>
      <home-page />
    </v-main>
  </v-app>
</template>

<script>
import HomePage from "./components/HomePage";
import NavigationBar from "./components/NavigationBar";

export default {
  name: "App",

  components: {
    NavigationBar,
    HomePage,
  },

  beforeCreate() {
    if (localStorage.getItem("user-id") === null) {
      this.$router.push("/login-or-register").catch(() => {});
    }
  },

  data: () => ({
    // isNavigationBarVisible: false,
  }),
};
</script>

<style>
#app {
  background: #ececec;
  font-family: "Nunito Sans", sans-serif;
}
.v-application p {
  margin-bottom: 0px !important;
}
</style>
