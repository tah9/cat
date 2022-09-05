<template>
  <div>
    <navbar title="我的申请">
    </navbar>
    <div v-for="item in rows" class="card" @click="toInfo(item)">

      <img v-if="item.state===1" class="stateImg" src="../../../assets/shen.png">
      <img v-else-if="item.state===2" class="stateImg" src="../../../assets/tong.png">
      <img v-else-if="item.state===-2" class="stateImg" src="../../../assets/butong.png">
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
        <div class="imgDiv">
          <img :src="'http://localhost:9003'+url" v-for="url in item.pics.split(',')">
        </div>
      </div>
      <div>
        <van-tag style="margin-right: 6px;margin-top: 6px" type="primary"
                 v-for="v in item.vaccine.split(',')">{{ v }}
        </van-tag>

      </div>
      <van-cell style="border-radius: 99px;margin-top: 6px" title="申请理由" :value="item.reason" />
    </div>
  </div>
</template>

<script>
import request from "@/until/req";
import {Toast} from "vant";
import Navbar from "@/components/navbar";

export default {
  components: {Navbar},
  data() {
    return {
      rows: null
    }
  },
  methods: {
    toInfo(item) {
      // localStorage.setItem('ling', JSON.stringify(item));
      // this.$router.push('/one/info')
    },
    getRows() {
      request.post("/user/myAskFor",{
        auid:JSON.parse(window.localStorage.getItem('user')).id
      }).then(res => {
        this.rows = res.rows
        console.log(res)
      })
    },
    getTime(item) {
      let time = item.endTime - item.startTime;
      return time / 86400000 + '天'
    }
  },
  created() {
    request.post("/user/myAskFor",{
      auid:JSON.parse(window.localStorage.getItem('user')).id
    }).then(res => {
      this.rows = res.rows
      console.log(this.rows);
    })
  },
};
</script>

<style scoped>
.stateImg {
  width: 100px;
  height: 100px;
  position: absolute;
  right: -8px;
  top:  calc(-12px - 0.5em);
}
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
  position: relative;
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
