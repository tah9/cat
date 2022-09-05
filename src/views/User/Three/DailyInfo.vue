<template>
  <div>
    <back-btn></back-btn>
    <report-btn @click="reportClick"></report-btn>
    <van-swipe v-if="daily" :show-indicators="false" @change="(cur)=>{this.curSwipe=cur}">
      <van-swipe-item v-for="(url,index) in daily.pics.split(',')">
        <img class="swipeImage" :style="'height:500px;'"
             :src="'http://localhost:9003'+url">
      </van-swipe-item>
    </van-swipe>
    <Indicators v-if="daily" :daily="daily" :cur-swipe="curSwipe"></Indicators>
    <div v-if="daily">
      <div class="userMess">
        <img width="35" src="../../../assets/aa.png">
        <div style="margin-left: 0.5em">{{ daily.username }}</div>
      </div>
      <div class="title">{{ daily.title }}</div>
      <div class="content">{{ daily.content }}</div>
    </div>
    <div v-if="commentRows" class="commentRoot">
      <div style="margin-bottom: 0.5em">共有{{ commentRows.length }}条评论</div>
      <div class="commentItem" v-for="item in commentRows">
        <img src="../../../assets/aa.png" width="30" height="30"/>
        <div class="commentMain">
          <div style="color: gray">{{ item.username }}</div>
          <div style="margin-bottom: 3px">{{ item.content }}</div>
          <div style="color: gray">{{ formatDate(item.datetime) }}</div>
        </div>
      </div>
      <div style="height: 44px"></div>
    </div>

    <div class="bottom" v-if="commentRows&&daily">
      <input v-model="contentStr" @keyup.enter="submit" type="text" placeholder="说点什么...">
      <van-icon v-if="like" name="like" color="red" style="margin: 0 0.3em" @click="subLike"/>
      <van-icon v-else name="like-o" style="margin: 0 0.3em" @click="addLike"/>
      {{ daily.likes }}
      <van-icon name="comment-o" style="margin: 0 0.3em"/>
      {{ commentRows.length }}
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
  components: {Indicators, BackBtn,ReportBtn},
  data() {
    return {
      daily: null,
      curSwipe: 0,
      contentStr: '',
      commentRows: null,
      like: false
    }
  },
  methods: {
    reportClick(){
      request.post('/user/reportDailyById',{
        id:this.daily.id
      }).then(res=>{
        Toast('举报成功，等待管理员审核')
      })
    },
    addLike() {
      request.post('/user/insertLike', {
        did: this.daily.id,
        uid: JSON.parse(window.localStorage.getItem('user')).id
      }).then(res => {
        this.$router.go(0)
      })
    },
    subLike() {
      request.post('/user/subLike', {
        did: this.daily.id,
        uid: JSON.parse(window.localStorage.getItem('user')).id
      }).then(res => {
        this.$router.go(0)
      })
    },
    formatDate(d) {
      let now = new Date(d)
      let month = now.getMonth() + 1;
      let date = now.getDate();
      let hour = now.getHours();
      let minute = now.getMinutes();
      let second = now.getSeconds();
      return month + "-" + date + " " + (hour===0?'00':hour) + ":" + (minute===0?'00':minute);
    },
    getComments() {
      request.post("/user/getCommentById", {
        did: this.daily.id,
        uid: JSON.parse(window.localStorage.getItem('user')).id
      }).then(res => {
        console.log(res);
        this.commentRows = res.rows
        this.like = res.like
      })
    }
    ,
    submit() {
      request.post('/user/insertComment', {
        content: this.contentStr,
        did: this.daily.id,
        uid: JSON.parse(window.localStorage.getItem('user')).id
      }).then(res => {
        this.contentStr = ''
        Toast.success('评论成功')
        this.getComments()
      })
    }
  },
  created() {
    request.post('/user/getDailyById', {
      id: parseInt(this.$route.params.id)
    }).then(res => {
      console.log(res);
      this.daily = res.daily
      this.getComments()
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

.commentItem {
  display: flex;
  align-items: center;
}

.commentRoot {
  padding: 12px;
}

.content {
  padding: 0 12px;
}

.commentMain {
  margin-left: 1em;
}

.bottom {
  background: white;
  z-index: 3;
  height: 44px;
  position: fixed;
  bottom: 0;
  width: 100%;
  align-items: center;
  justify-content: space-between;
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
