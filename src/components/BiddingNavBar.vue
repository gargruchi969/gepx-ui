<template>
  <div class="mt-6 mx-6">
    <b-tabs type="is-boxed">
      <b-tab-item label="midnight - 06:00">
        <bidding-timing-select
          @selectedTimeslot="currentTimeslot"
          :start="0"
          :end="24"
        />
      </b-tab-item>
      <b-tab-item label="06:00 - 12 noon">
        <bidding-timing-select
          @selectedTimeslot="currentTimeslot"
          :start="24"
          :end="48"
        />
      </b-tab-item>
      <b-tab-item label="12 noon - 18:00">
        <bidding-timing-select
          @selectedTimeslot="currentTimeslot"
          :start="48"
          :end="72"
        />
      </b-tab-item>
      <b-tab-item label="18:00 -  midnight">
        <bidding-timing-select
          @selectedTimeslot="currentTimeslot"
          :start="72"
          :end="96"
        />
      </b-tab-item>
    </b-tabs>
    <hr />
  </div>
</template>
<script>
import BiddingTimingSelect from "@/components/BiddingTimingSelect";
export default {
  components: { BiddingTimingSelect },
  methods: {
    currentTimeslot(value) {
      this.$emit("currentlySelectedItem", value);
    },
  },
};
</script>
<style>
.tabs li.is-active a {
  color: #3c74bc !important;
  font-weight: bold;
}
a {
  color: #0000008a !important;
}
</style>
