<template>
  <div class="back" @click="$router.go(-1)"><van-icon name="arrow-left"/></div>
</template>

<script>
export default {
  name: "BackBtn"
}
</script>

<style scoped  >
.back {
  position: fixed;
  top: 1em;
  left: 1em;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.1) inset;
  border-radius: 50%;
  width: 2em;
  height: 2em;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
</style>
