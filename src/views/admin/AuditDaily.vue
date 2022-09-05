<template>
  <div>
    <back-btn></back-btn>
    <van-swipe v-if="daily" :show-indicators="false" @change="(cur)=>{this.curSwipe=cur}">
      <van-swipe-item v-for="(url,index) in daily.pics.split(',')">
        <img class="swipeImage" :style="'height:500px;'"
             :src="'http://localhost:9003'+url">
      </van-swipe-item>
    </van-swipe>
    <Indicators v-if="daily" :daily="daily" :cur-swipe="curSwipe"></Indicators>
    <div v-if="daily">
      <div class="userMess">
        <img width="35" src="../../assets/aa.png">
        <div style="margin-left: 0.5em">{{ daily.username }}</div>
      </div>
      <div class="title">{{ daily.title }}</div>
      <div class="content">{{ daily.content }}</div>
    </div>
    <div style="height: 120px"></div>
    <div v-if="daily.state!==2" style="position:fixed;bottom:50px;width: 100%;display: flex;justify-content: space-evenly;margin-top: 3em">
      <van-button @click="tong" round type="primary">审核通过</van-button>
      <van-button @click="wu" round type="warning">内容违规</van-button>
    </div>
  </div>
</template>

<script>
import BackBtn from "@/components/BackBtn";
import ReportBtn from "@/components/ReportBtn";
import request from "@/until/req";
import Indicators from "@/views/User/Three/Indicators";
import {Toast} from "vant";


export default {
  name: "DailyInfo",
  components: {Indicators, BackBtn, ReportBtn},
  data() {
    return {
      daily: null,
      curSwipe: 0,
      contentStr: '',
    }
  },
  methods: {
    tong() {
      request.post('/admin/updateDaily', {
        state: 0,
        id: this.daily.id
      }).then(res => {
        Toast('操作成功')
        this.$router.go(-1)
      })
    },
    wu() {
      request.post('/admin/updateDaily', {
        state: 2,
        id: this.daily.id,
        uid:this.daily.uid
      }).then(res => {
        request.post('')
        Toast('操作成功')
        this.$router.go(-1)
      })
    }

  },
  created() {
    request.post('/user/getDailyById', {
      id: parseInt(this.$route.params.id)
    }).then(res => {
      console.log(res);
      this.daily = res.daily
    })
  }
}
</script>

<style scoped>
.title {
  font-weight: bold;
  font-size: 1.1em;
  padding: 12px;
}


.content {
  padding: 0 12px;
}


.bottom input {
  width: 60%;
  background: #f7f8fa;
}

.swipeImage {
  object-fit: contain;
  max-width: 100%;
}

.userMess {
  padding: 0 12px;
  display: flex;
  align-items: center;
}


</style>
