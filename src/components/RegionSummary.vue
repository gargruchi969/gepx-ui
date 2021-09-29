<template>
  <div class="summary-content">
    <h1 class="title is-6">Today</h1>
    <div class="rows">
      <div v-for="i in summaryData" :key="i" class="mb-3 row">
        <div class="columns">
          <div class="column left-align">
            <span class="item-type">
              <strong> {{ i.type }} </strong>
            </span>
          </div>
          <div class="column">
            <div class="columns">
              <div class="column is-1 right-align">
                <b-icon :style="i.style" :icon="i.icon" />
              </div>
              <div class="column left-align">
                <p>{{ i.increaseOrDecrease }}</p>
              </div>
            </div>
          </div>
          <div class="column right-align">
            <span style="font-weight:700;font-size: 1.1rem;">
              {{ i.value }}
            </span>
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
      summaryData: [
        {
          type: "Average",
          value: "2.32",
          increaseOrDecrease: "0.17",
          icon: "menu-up",
          style: "color:green",
        },
        {
          type: "Peak",
          value: "2.32",
          increaseOrDecrease: "0.17",
          icon: "menu-down",
          style: "color:red",
        },
        {
          type: "Non-Peak",
          value: "2.32",
          increaseOrDecrease: "0.17",
          icon: "menu-down",
          style: "color:red",
        },
        {
          type: "Maximum",
          value: "2.32",
          increaseOrDecrease: "0.17",
          icon: "menu-up",
          style: "color:green",
        },
        {
          type: "Minimum",
          value: "2.32",
          increaseOrDecrease: "0.17",
          icon: "menu-up",
          style: "color:green",
        },
      ],
    };
  },
};
</script>

<style scoped>
.summary-content {
  text-align: center;
  margin: 1rem;
}

.left-align {
  text-align: left !important;
}

.right-align {
  text-align: right !important;
}

.center-align {
  text-align: center !imporant;
}

.item-type {
  min-width: 90px !important;
  display: flex;
}
</style>
