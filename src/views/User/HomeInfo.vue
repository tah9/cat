<template>
  <div>
    <back-btn></back-btn>
    <img class="swipeImage" :style="'height:350px;'"
         :src="'http://localhost:9003'+item.url">
    <div style="padding: 12px;background: white">
      {{ item.str }}
    </div>
  </div>
</template>

<script>
import BackBtn from "@/components/BackBtn";
import Indicators from "@/views/User/Three/Indicators";
import request from "@/until/req";
import {Toast} from "vant";

export default {
  components: {Indicators, BackBtn},
  data() {
    return {
      item: null,
    }
  },
  created() {
    this.item = JSON.parse(localStorage.getItem('homeInfo'))
    console.log(this.item);
  }
}
</script>

<style scoped>

.swipeImage {
  object-fit: contain;
  max-width: 100%;
}
</style>
