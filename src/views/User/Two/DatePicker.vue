<template>
  <van-popup v-model="show" @close="$emit('close')" round position="bottom" :style="{ height: '30%' }">
    <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择日期"
        :min-date="minDate"
        :max-date="maxDate" @confirm="(value)=>{this.show=false;$emit('confirm',value)}"
    />
  </van-popup>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      minDate: new Date(2022, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(2022, 6, 20),
    };
  },
};
</script>

<style scoped>

</style>
