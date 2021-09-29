<template>
<div class="selection-container">
    <div class="columns">
      <div class="column is-3">
        <div class="rows">
          <div
            :class="this.selectedRegion == 'A1' ? 'region-active' : ''"
            @click="regionSelection('A1')"
            class="row region-element"
          >
            <p>A1</p>
          </div>
          <div
            :class="this.selectedRegion == 'N1' ? 'region-active' : ''"
            @click="regionSelection('N1')"
            class="row region-element"
          >
            <p>N1</p>
          </div>
          <div
            :class="this.selectedRegion == 'S1' ? 'region-active' : ''"
            @click="regionSelection('S1')"
            class="row region-element"
          >
            <p>S1</p>
          </div>
          <div
            :class="this.selectedRegion == 'W1' ? 'region-active' : ''"
            @click="regionSelection('W1')"
            class="row region-element"
          >
            <p>W1</p>
          </div>
        </div>
      </div>
      <div class="column is-3">
        <div class="rows">
          <div
            :class="this.selectedRegion == 'A2' ? 'region-active' : ''"
            @click="regionSelection('A2')"
            class="row region-element"
          >
            <p>A2</p>
          </div>
          <div
            :class="this.selectedRegion == 'N2' ? 'region-active' : ''"
            @click="regionSelection('N2')"
            class="row region-element"
          >
            <p>N2</p>
          </div>
          <div
            :class="this.selectedRegion == 'S2' ? 'region-active' : ''"
            @click="regionSelection('S2')"
            class="row region-element"
          >
            <p>S2</p>
          </div>
          <div
            :class="this.selectedRegion == 'W2' ? 'region-active' : ''"
            @click="regionSelection('W2')"
            class="row region-element"
          >
            <p>W2</p>
          </div>
        </div>
      </div>
      <div class="column is-3">
        <div class="rows">
          <div
            :class="this.selectedRegion == 'E1' ? 'region-active' : ''"
            @click="regionSelection('E1')"
            class="row region-element"
          >
            <p>E1</p>
          </div>
          <div
            :class="this.selectedRegion == 'N3' ? 'region-active' : ''"
            @click="regionSelection('N3')"
            class="row region-element"
          >
            <p>N3</p>
          </div>
          <div
            :class="this.selectedRegion == 'S3' ? 'region-active' : ''"
            @click="regionSelection('S3')"
            class="row region-element"
          >
            <p>S3</p>
          </div>
          <div
            :class="this.selectedRegion == 'W3' ? 'region-active' : ''"
            @click="regionSelection('W3')"
            class="row region-element"
          >
            <p>W3</p>
          </div>
        </div>
      </div>
      <div class="column is-3">
        <div class="rows">
          <div
            :class="this.selectedRegion == 'E2' ? 'region-active' : ''"
            @click="regionSelection('E2')"
            class="row region-element"
          >
            <p>E2</p>
          </div>
          <!-- <div
            :class="this.selectedRegion == 'MVP' ? 'region-active' : ''"
            @click="regionSelection('MVP')"
            class="row region-element"
          >
            <p>MVP</p>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      selectedRegion: "A1",
    };
  },
  methods: {
    regionSelection(region) {
      console.log(region);
      this.selectedRegion = region;
    },
  },
};
</script>

<style scoped>
.region-element {
  cursor: pointer;
  margin-top: 0.5rem;
  padding: 0.8rem;
  width: 3rem;
  font-weight: bold;
}

.region-active {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #3c74bc;
  border-radius: 1rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.selection-container {
  margin: 1rem;
}
</style>
