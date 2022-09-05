<template>
  <div>
    <navbar :left="false" title="在线日志"></navbar>
    <div class="listRoot">
      <div class="listItem" v-for="item in rows" @click="clickInfo(item.id)">
        <img :src="'http://localhost:9003'+item.pics.split(',')[0]">
        <div class="itemTitle">{{ item.title }}</div>
        <div style="display: flex;align-items: center;">
          <img width="25" src="../../assets/aa.png">
          <div style="margin-left: 0.5em">{{ item.username }}</div>
        </div>
      </div>
      <div></div>
    </div>
    <div class="addBtn" @click="$router.push('/three/add')">+</div>
  </div>
</template>

<script>
import request from "@/until/req";
import Navbar from "@/components/navbar";

export default {
  name: "Three",
  components: {Navbar},
  data() {
    return {
      rows: null
    }
  },
  activated() {
    request.get('/user/getDaily').then(res => {
      console.log(res);
      this.rows = res.rows
    })
  },
  methods: {
    clickInfo(id) {
      this.$router.push('/three/DailyInfo/' + id)
    }
  }
}
</script>

<style scoped>
.addBtn {
  position: fixed;
  bottom: 2em;
  width: 70px;
  left: calc(50% - 35px);
  right: auto;
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-size: 30px;
  background: red;
  color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.1) inset;
  border-radius: 30px;
}

.listItem {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  width: 48%;
  margin: 3px auto 3px 0;
}

.itemTitle {
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.listItem > img {
  height: 226px;
  object-fit: contain;
  width: 100%;
}

.listRoot {
  box-sizing: content-box;
  padding: 3px 0 3px 6px;
  justify-content: space-evenly;
  display: flex;
  flex-wrap: wrap;
}
</style>
