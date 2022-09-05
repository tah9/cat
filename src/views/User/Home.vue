<template>
  <div v-if="rows">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white"
               @change="onSwiper" >
      <van-swipe-item v-for="item in getRows(0)">
        <img style="width: 100%;height: 180px;object-fit: cover" @click="toHomeInfo(item)"
             :src="'http://localhost:9003'+item.url" >
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }}/{{getRows(0).length}}</div>
      </template>
    </van-swipe>
    <van-notice-bar @click="toHomeInfo(item)"
        left-icon="volume-o"
        :text="getRows(0)[current].str"
    />

    <div class="text-div">
      <van-icon name="award-o" style="margin-right: 0.3em;font-weight: bold"/>
      养护攻略
      <div style="margin-left: auto;color: green" @click="$router.push('/upPwd')">修改密码</div>
    </div>
    <div class="feedArticleList">
      <div class="feed-item" v-for="item in getRows(1)" @click="toHomeInfo(item)">
        <img width="100%" height="100px"
             :src="'http://localhost:9003'+item.url">
        <div class="feedArticleText">{{item.str}}</div>
      </div>
    </div>
    <div class="text-div">
      <van-icon name="bulb-o" style="margin-right: 0.3em;font-weight: bold"/>
      寻宠启示
    </div>
    <div class="home_text" @click="toHomeInfo(item)" v-for="item in getRows(2)">{{item.str}}</div>
    <div class="text-div">
      <van-icon name="sign" style="margin-right: 0.3em;font-weight: bold"/>
      领养启示
    </div>
    <div class="home_text" @click="toHomeInfo(item)" v-for="item in getRows(3)">{{item.str}}</div>
  </div>
</template>

<script>
import request from "@/until/req";

export default {
  name: "Home",
  data() {
    return {
      current: 0,
      rows: null
    }
  },
  created() {
    request.get('/getNotice').then(res => {
      this.rows = res.rows
    })
  },
  methods: {
    toHomeInfo(item){
      localStorage.setItem("homeInfo",JSON.stringify(item))
      this.$router.push("/homeInfo")
    },
    onSwiper(index) {
      this.current = index
    },
    getRows(type) {
      return this.rows.filter(item => item.type === type)
    }
  }
}
</script>

<style scoped>
.feedArticleList {
  width: 100%;
  overflow-x: scroll;
  white-space: nowrap;
}

.home_text {
  padding: 0.5em;
  display: inline-block;
  white-space: nowrap;
  width: calc(100% - 1em);
  overflow: hidden;
  text-overflow: ellipsis;
}

.feed-item {
  width: 60vw;
  border-radius: 8px;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  margin: 12px calc(12px / 2);
}

.feed-item img {
  object-fit: cover;
}

.feedArticleText {
  white-space: pre-wrap;
  height: 2.6em;
  font-size: calc(1em - 0.1em);
  background-color: #757575;
  color: white;
  padding: 0.1em 0.5em;
}

.text-div {
  color: #98a2c4;
  padding: 0 12px;
  display: flex;
  margin: 6px 0;
  align-items: center;
}

.custom-indicator {
  position: absolute;
  right: 8px;
  bottom: 15px;
  padding: 2px 5px;
  color: white;
  border-radius: 50px;
  transform: scale(1.3);
  font-size: 12px;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.5);
}
</style>
