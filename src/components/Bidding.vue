<template>
  <div>
    <bidding-nav-bar @currentlySelectedItem="selectedTimeslot" />
    <bidding-content :currentSlot="currentSlot" />
  </div>
</template>

<script>
import BiddingNavBar from "@/components/BiddingNavBar";
import BiddingContent from "@/components/BiddingContent";

export default {
  components: {
    BiddingNavBar,
    BiddingContent,
  },
  data() {
    return {
      currentSlot: "00:00 - 00:15",
    };
  },
  methods: {
    selectedTimeslot(value) {
      this.currentSlot = value;
    },
  },
};
</script>
