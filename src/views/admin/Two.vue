<template>
  <div>
    <navbar :left="false" title="寄养审核"></navbar>
    <van-tabs v-if="rows" v-model="curIndex">
      <van-tab :title="name" v-for="(name,index) in title">
        <div  v-for="item in curRows(index)" class="card" @click="toInfo(item)">
          <div style="display: flex;justify-content: end">
            <div style="margin-right: auto">
              <van-tag size="large" color="#ffe1e1" text-color="#ad0000">
                {{ getStateText(item) }}
              </van-tag>
              {{ item.varieties }}
            </div>
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

      </van-tab>
    </van-tabs>
    <div>
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
      title: ['审核中', '已通过', '未通过'],
      rows: null,
      curIndex: 0
    }
  },
  methods: {
    curRows(index) {
      let result = []
      if (index === 0) {
        this.rows.forEach(item => {
          if (item.state === 0) {
            result.push(item)
          }
        })
      } else if (index === 1) {
        this.rows.forEach(item => {
          if (item.state === 1) {
            result.push(item)
          }
        })
      } else if (index === 2) {
        this.rows.forEach(item => {
          if (item.state === -1) {
            result.push(item)
          }
        })
      }
      return result
    }
    ,
    toInfo(item) {
      localStorage.setItem('shenJi', JSON.stringify(item))
      this.$router.push('/twoInfo')
    }
    ,
    getStateText(item) {
      switch (item.state) {
        case 0:
          return "审核中";
        case 1:
          return "已通过";
        case -1:
          return "信息有误";
      }

    }
    ,
    getRows() {
      request.get("/admin/getAdoption").then(res => {
        this.rows = res.rows
      })
    }
    ,
    edit(item) {
      localStorage.setItem('ji', JSON.stringify(item))
      this.$router.push('/two/change')
    }
    ,
    getTime(item) {
      let time = item.endTime - item.startTime;
      return time / 86400000 + '天'
    }
  }
  ,
  activated() {
    this.getRows()
  }
}
;
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

.addBtn {
  position: fixed;
  bottom: calc(2em + 44px);
  width: 90px;
  left: calc(50% - 45px);
  right: auto;
  height: 44px;
  line-height: 44px;
  text-align: center;
  background: #ffdb45;
  color: #a37008;
  font-weight: bold;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.1) inset;
  border-radius: 30px;
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
