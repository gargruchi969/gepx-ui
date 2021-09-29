<template>
  <div>
    <div v-if="!isNavBarVisibleState">
      <v-navigation-drawer
        ref="drawer"
        app
        left
        hide-overlay
        :width="navigation.width"
        v-model="navigation.shown"
      >
        <div class="top-left-search">
          <v-toolbar color="white">
            <v-toolbar-title
              style="width:100%"
              class="headline text-uppercase icon-search"
            >
              <span>
                <!-- <b-icon icon="magnify" /> -->
              </span>
              <span>
                <input
                  custom-class="border-color:white"
                  placeholder="Search ex: yesterday A1"
                  expanded
                  size="is-default"
                />
              </span>
            </v-toolbar-title>
          </v-toolbar>
        </div>
        <region-selection />
        <hr />
        <region-summary v-if="sidebarOption === 'region'" />
        <br />
        <div class="button-group">
          <div class="stv-radio-buttons-wrapper">
            <input
              type="radio"
              class="stv-radio-button"
              value="region"
              id="button1"
              checked
              v-model="sidebarOption"
            />
            <label for="button1"
              ><strong
                class="is-blue"
                :class="{ 'is-white': sidebarOption === 'region' }"
                >Region</strong
              ></label
            >
            <input
              type="radio"
              class="stv-radio-button"
              value="area"
              id="button2"
              v-model="sidebarOption"
            />
            <label for="button2"
              ><strong
                class="is-blue"
                :class="{ 'is-white': sidebarOption === 'area' }"
                >Area</strong
              ></label
            >
          </div>
        </div>
      </v-navigation-drawer>
    </div>
    <div>
      <!-- <bidding /> -->
      <router-view />
    </div>
  </div>
</template>

<script>
import RegionSelection from "@/components/RegionSelection.vue";
import RegionSummary from "@/components/RegionSummary.vue";
import { mapState } from "vuex";
// import Bidding from "@/components/Bidding.vue";
// import AssetsSearch from "@/components/AssetsSearch.vue";
// import EventBus from "@/eventBus";
import { VNavigationDrawer, VToolbarTitle } from "vuetify/lib";
export default {
  data: () => {
    return {
      sidebarOption: "region",
      navigation: {
        shown: true,
        width: 320,
        borderSize: 1.5,
        opacity: 0.5,
      },
    };
  },
  components: {
    VNavigationDrawer,
    VToolbarTitle,
    RegionSelection,
    RegionSummary,
    // Bidding,
  },
  computed: {
    direction() {
      return this.navigation.shown === false ? "Open" : "Closed";
    },
    isNavBarVisibleState() {
      return this.isNavBarVisible;
    },
    ...mapState(["isNavBarVisible"]),
  },
  methods: {
    setBorderWidth() {
      let i = this.$refs.drawer.$el.querySelector(
        ".v-navigation-drawer__border"
      );
      i.style.width = this.navigation.borderSize + "px";
      i.style.cursor = "ew-resize";
      i.style.backgroundColor = "gray";
      i.style.opacity = this.navigation.opacity;
    },
    setEvents() {
      const minSize = this.navigation.borderSize;
      const el = this.$refs.drawer.$el;
      const drawerBorder = el.querySelector(".v-navigation-drawer__border");
      const direction = el.classList.contains("v-navigation-drawer--left")
        ? "left"
        : "right";

      function resize(e) {
        document.body.style.cursor = "ew-resize";
        let f =
          direction === "left"
            ? document.body.scrollWidth - e.clientX
            : e.clientX;
        if (f > 320) {
          el.style.width = f + "px";
        }
      }

      drawerBorder.addEventListener(
        "mousedown",
        (e) => {
          if (e.offsetX < minSize) {
            el.style.transition = "initial";
            document.addEventListener("mousemove", resize, false);
          }
        },
        false
      );

      document.addEventListener(
        "mouseup",
        () => {
          el.style.transition = "";
          this.navigation.width = el.style.width;
          document.body.style.cursor = "";
          document.removeEventListener("mousemove", resize, false);
        },
        false
      );
    },
  },
  mounted() {
    this.setBorderWidth();
    this.setEvents();
  },
};
</script>

<style>
.v-sheet.v-app-bar.v-toolbar:not(.v-sheet--outlined),
.v-sheet.v-toolbar:not(.v-sheet--outlined) {
  box-shadow: none !important;
}

.top-left-search {
  border-bottom: 1px solid rgba(0, 0, 0, 0.151);
}

textarea:focus,
input:focus {
  outline: none;
}

input {
  font-size: 1rem;
  width: 100%;
}

input::placeholder {
  color: gray;
  opacity: 0.45;
}

.stv-radio-buttons-wrapper {
  text-align: center;
  clear: both;
  display: inline-block;
}

.stv-radio-button {
  position: absolute;
  left: -9999em;
  top: -9999em;
}
.stv-radio-button + label {
  float: left;
  padding: 0.5em 1em;
  cursor: pointer;
  border: 1px solid #3c74bc;
  margin-right: -1px;
  /* color: #000;
  background-color: #fff; */
}
.stv-radio-button + label:first-of-type {
  border-radius: 0.7em 0 0 0.7em;
}
.stv-radio-button + label:last-of-type {
  border-radius: 0 0.7em 0.7em 0;
}
.stv-radio-button:checked + label {
  background-color: #3c74bc;
  color: #fff !important;
}

.button-group {
  text-align: center;
  position: fixed;
  bottom: 1rem;
  width: 100%;
}

.is-blue {
  color: #3c74bc;
}

.is-white {
  color: white;
}
</style>
