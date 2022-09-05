<template>
  <div class="back" @click="$emit('click')">
    <div>举报</div>
  </div>
</template>

<script>
export default {
  name: "BackBtn",
  methods:{

  }
}
</script>

<style scoped>
.back {
  position: fixed;
  top: 1em;
  right: 1em;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.1) inset;
  border-radius: 99px;
  height: 2em;
  width: 3em;
  color: white;
  background: rgba(239, 84, 84, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

</style>
