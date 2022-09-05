<template>
  <div>
    <navbar :left="false" title="日志审核"></navbar>
    <div class="listRoot">
      <div class="listItem" v-for="item in rows" @click="clickInfo(item.id)">
        <div v-if="item.state===1" style="background:#00a9f2;color: white;text-align: center;height: 1.5em;line-height: 1.5em">待审核</div>
        <div v-else-if="item.state===3" style="background:#02ac13;color: white;text-align: center;height: 1.5em;line-height: 1.5em">内容正常</div>
        <div v-else style="background:#ff5959;color: white;text-align: center;height: 1.5em;line-height: 1.5em">内容违规</div>
        <img :src="'http://localhost:9003'+item.pics.split(',')[0]">
        <div class="itemTitle">{{ item.title }}</div>
        <div class="itemBottom">
          <img width="25" src="../../assets/aa.png">
          <div style="margin-left: 0.5em">{{item.username}}</div>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
import request from "@/until/req";
import Navbar from "@/components/navbar";

export default {
  components: {Navbar},
  data() {
    return {
      rows: null
    }
  },
  activated() {
    request.get('/admin/getDailyRecord').then(res => {
      console.log(res);
      this.rows = res.rows
    })
  },
  methods:{
    clickInfo(id){
      this.$router.push('/auditDaily/'+id)
    }
  }
}
</script>

<style scoped>

.listItem {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  width: 48%;
  margin: 3px auto 3px 0;
}
.itemBottom{
  display: flex;
  align-items: center;
}
.itemTitle{
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow:ellipsis;
}
.listItem>img {
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
