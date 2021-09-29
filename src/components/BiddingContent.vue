<template>
  <div>
    <span class="columns is-vcentered">
      <div class="ml-7 pl-7 column">
        <h1 class="content-title subtitle is-4">
          <strong>{{ currentSlot }}</strong>
        </h1>
      </div>
      <b-field class="mr-7 column is-5" align="right">
        <b-button
          disabled
          icon-left="restore"
          class="mr-7 button-end"
          type="is-text"
        >
          reset
        </b-button>
      </b-field>
    </span>
    <div class="bidding-content mx-5 columns is-vcentered is-multiline">
      <div
        class="column is-2"
        v-for="(item, index) in biddingData[this.currentSlot]"
        :key="index"
      >
        <div
          @mouseover="cardItemHover = index"
          @mouseleave="cardItemHover = null"
          class="card "
        >
          <div class="card-content ">
            <button
              @click="removeItem(index)"
              v-if="cardItemHover === index"
              id="x"
            >
              <b-icon size="is-small" icon="close" />
            </button>
            <v-text-field
              @change="updateField(item.price, item.quantity, index)"
              v-model="item.price"
              :rules="priceRules"
              type="number"
              label="price"
            >
              <v-icon slot="prepend" color="#0000008A"
                >mdi-currency-inr</v-icon
              ></v-text-field
            >
            <v-text-field
              @change="updateField(item.price, item.quantity, index)"
              v-model="item.quantity"
              :rules="quantityRules"
              type="number"
              label="Quantity"
            >
              <v-icon slot="prepend" color="#0000008A"
                >mdi-flash</v-icon
              ></v-text-field
            >
          </div>
        </div>
      </div>
      <div class="add-button column is-2 is-centered">
        <b-button
          class="add-button-item"
          icon-left="plus"
          type="is-white"
          expanded
          size="is-medium"
          @click="addItem"
          ><span>Add</span></b-button
        >
      </div>
    </div>
    <div id="submitButton">
      <b-button
        @click="submitBidding"
        icon-pack="fas"
        icon-left="paper-plane"
        class="submitButton"
      >
        Submit</b-button
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    currentSlot: String,
  },
  mounted() {
    this.biddingData = JSON.parse(localStorage.getItem("biddingData"));
  },
  methods: {
    submitBidding() {
      let biddingData = JSON.parse(localStorage.getItem("biddingData"));
      let here = this;
      let newJsonData = {};
      let index = 0;
      for (var i in biddingData) {
        index++;
        var val = biddingData[i];
        biddingData[i].forEach((i) => {
          if (biddingData[i] !== null) {
            newJsonData[index - 1] = val;
          }
        });
      }
      let Payload = {
        memberId: 4,
        bidInfo: newJsonData,
      };

      axios
        .post("http://34.234.85.115:8080/services/gex/saveBidInfo", Payload)
        .then(function() {
          here.$buefy.snackbar.open({
            type: "is-success",
            message: "Successfully added",
            queue: false,
          });
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
    updateField(price, quantity, index) {
      let biddingData = JSON.parse(localStorage.getItem("biddingData"));
      biddingData[this.currentSlot][index]["quantity"] = quantity;
      biddingData[this.currentSlot][index]["price"] = price;

      localStorage.setItem("biddingData", JSON.stringify(biddingData));
      this.biddingData = JSON.parse(localStorage.getItem("biddingData"));
    },
    removeItem(index) {
      let biddingData = JSON.parse(localStorage.getItem("biddingData"));
      biddingData[this.currentSlot].splice(index, 1);

      localStorage.setItem("biddingData", JSON.stringify(biddingData));
      this.biddingData = JSON.parse(localStorage.getItem("biddingData"));
    },
    addItem() {
      let biddingData = JSON.parse(localStorage.getItem("biddingData"));
      biddingData[this.currentSlot].push({
        quantity: null,
        price: null,
      });

      localStorage.setItem("biddingData", JSON.stringify(biddingData));
      this.biddingData = JSON.parse(localStorage.getItem("biddingData"));
    },
  },
  data() {
    return {
      biddingData: null,
      cardItemHover: null,
      priceRules: [
        (v) => !!v || "Required",
        (v) => v >= 0 || "price should be minimum 0",
        (v) => v <= 20 || "price should be maximum 20",
      ],
      quantityRules: [(v) => !!v || "Required"],
      //   biddingData: {
      //     "00:00 - 00:15": [
      //       {
      //         quantity: null,
      //         price: null,
      //       },
      //       {
      //         quantity: null,
      //         price: null,
      //       },
      //       {
      //         quantity: null,
      //         price: null,
      //       },
      //       {
      //         quantity: null,
      //         price: null,
      //       },
      //       {
      //         quantity: null,
      //         price: null,
      //       },
      //       {
      //         quantity: null,
      //         price: null,
      //       },
      //     ],
      //   },
    };
  },
};
</script>

<style scoped>
.content-title {
  text-align: right;
}
.button-end {
  text-align: right;
}
.add-button {
  text-align: center;
}
.add-button-item {
  color: #3c74bc !important;
  font-weight: bold;
}
.card {
  border-radius: 10px;
}
.bidding-content {
  overflow-y: scroll;
  max-height: 27.5rem;
}

.submitButton {
  background-color: #3c74bc;
  color: white;
  padding: 20px 20px;
  border-radius: 4px;
  border-color: #3c74bc;
}
.submitButton:hover {
  background-color: #3c74bc;
  color: white;
}

#submitButton {
  position: fixed;
  bottom: -4px;
  right: -4px;
}

.card-content {
  padding: 1rem !important;
}
#x {
  position: absolute;
  top: 5px;
  right: 10px;
}
</style>
