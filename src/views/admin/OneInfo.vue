<template>
  <div>
    <back-btn></back-btn>
    <van-swipe v-if="item" :show-indicators="false" @change="(cur)=>{this.curSwipe=cur}">
      <van-swipe-item v-for="(url,index) in item.pics.split(',')">
        <img class="swipeImage" :style="'height:350px;'"
             :src="'http://localhost:9003'+url">
      </van-swipe-item>
    </van-swipe>
    <Indicators v-if="item" :daily="item" :cur-swipe="curSwipe"></Indicators>

    <div class="card" v-if="item">
      <div style="display: flex;justify-content: end">
        <div style="margin-right: auto">{{ item.varieties }}</div>
      </div>
      <div style="display: flex;justify-content:space-between;margin-top: 6px">
        <div>
          <div class="contentText">
            {{ item.content }}
          </div>
          <div style="display: flex;flex-wrap: wrap;">
            <van-tag style="margin-right: 6px;margin-top: 6px" color="#7232dd">{{ item.sex }}</van-tag>
            <van-tag style="margin-right: 6px;margin-top: 6px" type="success">{{ item.age }}</van-tag>
          </div>
          <van-tag style="margin-right: 6px;margin-top: 6px" type="warning">寄养{{ getTime(item) }}</van-tag>
        </div>

      </div>
      <div>
        <van-tag style="margin-right: 6px;margin-top: 6px" type="primary"
                 v-for="v in item.vaccine.split(',')">{{ v }}
        </van-tag>

      </div>
    </div>
    <div style="display: flex;justify-content: space-evenly;margin-top: 3em">
      <van-button @click="tong" round type="primary">审核通过</van-button>
      <van-button @click="wu" round type="warning">不通过</van-button>
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
      curSwipe: 0,
      reasonStr: ''
    }
  },
  methods: {
    getTime(item) {
      let time = item.endTime - item.startTime;
      return time / 86400000 + '天'
    },
    tong() {
      request.post('/admin/updateAdoptionState', {
        id: this.item.id,
        uid:JSON.parse(window.localStorage.getItem('user')).id,
        state: 2
      }).then(res => {
        Toast('操作成功');
        this.$router.go(-1);
      })
    },
    wu() {
      request.post('/admin/updateAdoptionState', {
        id: this.item.id,
        state: -2
      }).then(res => {
        Toast('操作成功');
        this.$router.go(-1);
      })
    }
  },
  created() {
    this.item = JSON.parse(localStorage.getItem('shenLing'))
    console.log(this.item);
  }
}
</script>

<style scoped>
.card {
  font-weight: 550;
  color: #a37008;
  border-radius: 12px;
  padding: 12px;
  box-sizing: border-box;
  margin: 0.5em;
  background: #ffdb45;
  width: calc(100% - 1em);
  transition: all .2s ease-in-out;
}

.swipeImage {
  object-fit: contain;
  max-width: 100%;
}
</style>
