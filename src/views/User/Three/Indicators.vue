<template>
  <div class="radiusLayout" >
    <div v-for="(url,index) in daily.pics.split(',')" :style="index===curSwipe?'background: red;':''"></div>
  </div>
</template>

<script>
export default {
  name: "Indicators",
  props:['daily','curSwipe']
}
</script>

<style scoped>
.radiusLayout > * {
  width: 6px;
  height: 6px;
  margin: 0 6px;
  border-radius: 99px;
  background: #eeeff3;
}

.radiusLayout {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
