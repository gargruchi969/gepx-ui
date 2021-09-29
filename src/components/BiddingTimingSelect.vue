<template>
  <div>
    <div class="timemodal">
      <div
        v-for="(item, index) in getSlotTimings"
        :key="index"
        class="main-content"
      >
        <div v-if="getSlotTimings[index + 1] === undefined" class="times">
          <div
            @click="timeslotSelected(item, time[0])"
            v-if="time[end] === undefined"
            class="time-slot"
          >
            <span
              :class="{ active: selectedTimeslot === item + ' - ' + time[0] }"
              >{{ item }} - {{ time[0] }}
            </span>
          </div>
          <div
            @click="timeslotSelected(item, time[end])"
            v-else
            class="time-slot"
          >
            <span
              :class="{ active: selectedTimeslot === item + ' - ' + time[end] }"
              >{{ item }} - {{ time[end] }}
            </span>
          </div>
        </div>
        <div v-else class="times">
          <div
            @click="timeslotSelected(item, getSlotTimings[index + 1])"
            class="time-slot"
          >
            <span
              :class="{
                active:
                  selectedTimeslot === item + ' - ' + getSlotTimings[index + 1],
              }"
              >{{ item }} - {{ getSlotTimings[index + 1] }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: [],
      selectedTimeslot: "00:00 - 00:15",
    };
  },
  props: {
    start: Number,
    end: Number,
  },
  computed: {
    getSlotTimings() {
      return this.time.slice(this.start, this.end);
    },
  },
  mounted() {
    this.generateTimings();
    if (localStorage.getItem("biddingData") === null) {
      this.createBiddingDataStr();
    }
  },
  methods: {
    timeslotSelected(startTime, endTime) {
      console.log(this.selectedTimeslot);
      this.selectedTimeslot = startTime + " - " + endTime;
      this.$emit("selectedTimeslot", startTime + " - " + endTime);
    },
    generateTimings() {
      var x = 15;
      var times = [];
      var tt = 0;
      //   var ap = [" AM", " PM"];

      //loop to increment the time and push results in array
      for (var i = 0; tt < 24 * 60; i++) {
        var hh = Math.floor(tt / 60);
        var mm = tt % 60;
        times[i] = ("0" + (hh % 24)).slice(-2) + ":" + ("0" + mm).slice(-2);
        tt = tt + x;
      }
      this.time = times;
    },
    createBiddingDataStr() {
      let jsonData = {};
      for (var i = 0; i < this.time.length; i++) {
        if (this.time[i + 1] !== undefined) {
          jsonData[this.time[i] + " - " + this.time[i + 1]] = [
            // {
            //   // quantity: null,
            //   // price: null,
            // },
          ];
        } else {
          jsonData[this.time[i] + " - " + this.time[0]] = [
            // {
            //   quantity: null,
            //   price: null,
            // },
          ];
        }
      }
      localStorage.setItem("biddingData", JSON.stringify(jsonData));
    },
  },
};
</script>

<style scoped>
.timemodal {
  text-align: center;
}
.timemodal .main-content .times .time-slot {
  float: left;
  text-align: center;
  padding: 6px 3px;
  width: 8rem;
}
.timemodal .main-content .times .time-slot span {
  display: inline-block;
  border: 1px solid rgba(128, 128, 128, 0.863);
  color: gray;
  padding: 3px 0;
  width: 100%;
  border-radius: 3px;
}
.timemodal .main-content .times .time-slot span:hover {
  cursor: pointer;
  border: 1px solid #3c74bc;
  background-color: #3c74bc;
  color: #ffffff;
}
.active {
  border: 1px solid #3c74bc !important;
  background: #3c74bc !important;
  color: #ffffff !important;
}
</style>
