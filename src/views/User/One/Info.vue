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
        <div style="margin-right:auto;display: flex;align-items: center;">
          <img width="25" src="../../../assets/aa.png">
          <div style="margin-left: 0.5em">{{ item.username }}</div>
          <div style="margin-left: 0.5em;color: #00a9f2">(信用分{{item.score}})</div>
        </div>
        <div style="text-align: end">{{ item.varieties }}</div>
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
    <van-field
        v-model="reasonStr"
        rows="2"
        :autosize="size"
        type="textarea" maxlength="100"
        placeholder="申请理由"
        show-word-limit
    />
    <div class="btn" @click="submit" style="background: #f90000;color: white;margin-top: 1em">提交领养申请</div>
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
      size: {maxHeight: 200, minHeight: 80},
      item: null,
      curSwipe: 0,
      reasonStr: ''
    }
  },
  methods: {
    submit() {
      request.post('/user/adoptionCat', {
        auid: JSON.parse(window.localStorage.getItem('user')).id,
        reason: this.reasonStr,
        id:this.item.id
      }).then(res => {
        Toast('申请成功，请等待审核')
        this.$router.go(-1)
      })
    },
    getTime(item) {
      let time = item.endTime - item.startTime;
      return time / 86400000 + '天'
    }
  },
  created() {
    this.item = JSON.parse(localStorage.getItem('ling'))
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
