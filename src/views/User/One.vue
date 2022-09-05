<template>
  <div>
    <navbar title="在线领养" :left="false">
      <div slot="left">
        <MyScore></MyScore>
      </div>
      <div slot="right" style="font-size: 0.8em" @click="$router.push('/myAskFor')">我的申请</div>
    </navbar>
    <div v-for="item in rows" class="card" @click="toInfo(item)">

      <div style="display: flex;justify-content: end">
        <div style="margin-right:auto;display: flex;align-items: center;">
          <img width="25" src="../../assets/aa.png">
          <div style="margin-left: 0.5em">{{ item.username }}</div>
          <div style="margin-left: 0.5em;color: #00a9f2">(信用分{{ item.score }})</div>
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
        <div class="imgDiv">
          <img :src="'http://localhost:9003'+url" v-for="url in item.pics.split(',')">
        </div>
      </div>
      <div>
        <van-tag style="margin-right: 6px;margin-top: 6px" type="primary"
                 v-for="v in item.vaccine.split(',')">{{ v }}
        </van-tag>

      </div>
    </div>
  </div>
</template>

<script>
import request from "@/until/req";
import {Toast} from "vant";
import Navbar from "@/components/navbar";
import MyScore from "@/components/MyScore";

export default {
  components: {MyScore, Navbar},
  data() {
    return {
      rows: null
    }
  },
  methods: {
    toInfo(item) {
      localStorage.setItem('ling', JSON.stringify(item));
      this.$router.push('/one/info')
    },
    getRows() {
      request.post("/user/getAdoption",{
        uid:JSON.parse(window.localStorage.getItem('user')).id
      }).then(res => {
        this.rows = res.rows
      })
    },
    getTime(item) {
      let time = item.endTime - item.startTime;
      return time / 86400000 + '天'
    }
  },
  activated() {
    this.getRows()
  }
};
</script>

<style scoped>
.contentText {
  overflow: hidden;
  text-overflow: ellipsis; /* 超出部分省略号 */
  word-break: break-all; /* break-all(允许在单词内换行。) */
  display: -webkit-box; /* 对象作为伸缩盒子模型显示 */
  -webkit-box-orient: vertical; /* 设置或检索伸缩盒对象的子元素的排列方式 */
  -webkit-line-clamp: 2; /* 显示的行数 */
  max-height: 40px; /* 设置最大高度，根据行高，要几行乘以几倍 */
}

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

.imgDiv {
  display: flex;
}

.imgDiv img {
  margin-left: 6px;
  object-fit: cover;
  border-radius: 8px;
  width: 80px;
  height: 80px;
}
</style>
