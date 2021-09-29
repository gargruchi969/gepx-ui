<template>
  <div>
    <div class="container" id="container">
      <div class="my-5 form-container sign-up-container">
        <div class="form-content">
          <div class="align-center">
            <div>
              <v-img
                alt="Vuetify Logo"
                class="shrink mb-5"
                contain
                src="@/assets/gelogo.png"
                transition="scale-transition"
                width="50"
              />
            </div>
          </div>
          <h1 class="title">
            Register an Organization
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  size="medium"
                  color="secondary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  >mdi-help-circle</v-icon
                >
              </template>
              <span>
                <div>Registration Process</div>
                <div>Step 1: Fill in the below form</div>
                <div>
                  Step 2: Your documents will be validated
                </div>
                <div>
                  Step 3: Our support executive will share admin credentials
                </div>
                <div>Step 4: Admin can create role based users</div>
              </span>
            </v-tooltip>
          </h1>
          <!-- <span>or use your email for registration</span> -->
          <div class="sign-up-inputdata">
            <input
              v-model="signUpUserDetails.orgName"
              required
              type="text"
              placeholder="Organization Name"
            />
            <input
              v-model="signUpUserDetails.name"
              required
              type="text"
              placeholder="Name"
            />
            <input
              v-model="signUpUserDetails.designation"
              required
              type="text"
              placeholder="Designation"
            />
            <input
              v-model="signUpUserDetails.emailId"
              required
              type="email"
              placeholder="Email"
            />
            <input
              v-model="signUpUserDetails.address"
              required
              type="text"
              placeholder="Address"
            />
            <input
              v-model="signUpUserDetails.location"
              required
              type="text"
              placeholder="Location"
            />
            <input
              v-model="signUpUserDetails.mobileNumber"
              required
              type="number"
              placeholder="Mobile Number"
            />
            <div>
              <b-upload multiple v-model="file">
                <a class="button is-secondary">
                  <b-icon icon="upload"></b-icon>
                  <span>Upload Documents</span>
                </a>
                <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      class="ml-2"
                      size="medium"
                      color="secondary"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      >mdi-help-circle</v-icon
                    >
                  </template>
                  <span>
                    <div>Required Documents</div>
                    <div>1: GSTIN Details</div>
                    <div>
                      2: Networth Certificate
                    </div>
                    <div>
                      3: Shareholding Pattern
                    </div>
                    <div>4: Board Resolution</div>
                  </span>
                </v-tooltip>
              </b-upload>
              <span class="file-name" v-if="file">
                {{ file.name }}
              </span>
            </div>
          </div>
          <br />
          <button @click="signUpUser">
            Sign Up
          </button>
        </div>
      </div>
      <div class="form-container sign-in-container">
        <div class="form-content">
          <v-img
            alt="Vuetify Logo"
            class="shrink mb-5"
            contain
            src="@/assets/gelogo.png"
            transition="scale-transition"
            width="50"
          />
          <h1 class="title">Sign in</h1>
          <div>
            <input
              required
              v-model="userEmail"
              type="email"
              placeholder="Email"
            />
            <input
              required
              v-model="userPassword"
              type="password"
              placeholder="Password"
              @keyup.enter="signInUser"
            />
          </div>
          <!-- <a href="#">Forgot your password?</a> -->
          <br />
          <button @click="signInUser">
            Sign In
          </button>
        </div>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <button @click="signInButton" class="ghost" id="signIn">
              Sign In
            </button>
          </div>
          <div class="overlay-panel overlay-right">
            <button @click="signUpButton" class="ghost" id="signUp">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// APIs
// import LoginAPI from "@/assets/api/login";
export default {
  data() {
    return {
      userEmail: null,
      userPassword: null,
      signUpUserDetails: {
        emailId: "",
        orgName: "",
        name: "",
        location: "",
        address: "",
        mobileNumber: "",
        designation: "",
      },
    };
  },
  mounted() {
    this.$store.commit("navbarHide", true);
    this.userStatus();
  },
  methods: {
    resetSignUpUserDetails() {
      this.signUpUserDetails = {
        emailId: "",
        orgName: "",
        name: "",
        location: "",
        address: "",
        mobileNumber: "",
        designation: "",
      };
    },
    resetSignInUserDetails() {
      this.userEmail = null;
      this.userPassword = null;
    },
    userStatus() {
      if (localStorage.getItem("user-id") !== null) {
        this.$store.commit("isNavbarVisible", true);
        this.$router.push("/dashboard").catch(() => {});
      }
    },
    signUpButton() {
      this.$el.querySelector(".container").classList.add("right-panel-active");
      this.resetSignInUserDetails();
    },
    signInButton() {
      this.$el
        .querySelector(".container")
        .classList.remove("right-panel-active");
      this.resetSignUpUserDetails();
    },
    signInUser() {
      // localStorage.setItem("user-id", String("1"));
      // this.$router.push("/dashboard");
      // this.$store.commit("navbarHide", false);

      let here = this;
      let username = String(this.userEmail);
      let password = String(this.userPassword);

      axios
        .get(
          `http://34.234.85.115:8080/services/gex/login?userName=${username}&password=${password}`
        )
        .then(function(response) {
          if (response.data.msg === "Success") {
            localStorage.setItem("user-id", String(response.data.refId));
            localStorage.setItem("user-email", String(username));
            here.$router.push("/dashboard");
            here.$store.commit("navbarHide", false);
          } else if (response.data.msg === "Failed") {
            here.$buefy.snackbar.open({
              type: "is-danger",
              message: response.data.msg + " : " + response.data.error,
              queue: false,
            });
          } else {
            here.$buefy.snackbar.open({
              type: "is-danger",
              message: "Failed. Please retry",
              queue: false,
            });
          }
        })
        .catch(function(error) {
          console.log(error);
          here.$buefy.snackbar.open({
            type: "is-danger",
            message: "Failed. Please retry",
            queue: false,
          });
        });
    },
    signUpUser() {
      let here = this;
      axios
        .post(
          "http://34.234.85.115:8080/services/gex/saveRegistrationReq",
          here.signUpUserDetails
        )
        .then(function(response) {
          if (response.data.msg === "success") {
            here.$buefy.snackbar.open({
              type: "is-success",
              message:
                "Registration successful. Your reference ID: " +
                response.data.refId +
                " You'll be reached out in next 5-7 working days.",
              queue: false,
            });
            here.resetSignUpUserDetails();
          } else if (response.data.msg === "Failed") {
            here.$buefy.snackbar.open({
              type: "is-danger",
              message: response.data.msg + " : " + response.data.error,
              queue: false,
            });
          } else {
            here.$buefy.snackbar.open({
              type: "is-danger",
              message: "Failed. Please retry",
              queue: false,
            });
          }
        })
        .catch(function(error) {
          console.log(error);
          here.$buefy.snackbar.open({
            type: "is-danger",
            message: "Failed. Please retry",
            queue: false,
          });
        });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,800");

* {
  box-sizing: border-box;
}

body {
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  margin: -20px 0 50px;
}

h1 {
  font-weight: bold;
  margin: 0;
}

h2 {
  text-align: center;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

button {
  border-radius: 20px;
  border: 1px solid #3c74bc;
  background-color: #3c74bc;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #ffffff;
}

.form-content {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

input {
  background-color: #eee;
  border: none;
  border-radius: 0.5rem;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: fixed;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 550px;
  top: 10%;
  left: 25%;
}

.form-container {
  position: absolute;
  top: 0;
  height: 90%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.sign-up-inputdata {
  overflow-y: scroll;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: #3c74bc;
  background: -webkit-linear-gradient(to right, #3c74bc, #3c74bc);
  background: linear-gradient(to right, #3c74bc, #3c74bc);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #dddddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}

footer {
  background-color: #222;
  color: #fff;
  font-size: 14px;
  bottom: 0;
  position: fixed;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 999;
}

footer p {
  margin: 10px 0;
}

footer i {
  color: red;
}

footer a {
  color: #3c97bf;
  text-decoration: none;
}
</style>
