<template>
  <div>
    <navbar title="添加日志"></navbar>
    <div class="root">
      <van-uploader v-model="fileList" multiple accept="image/*"/>
      <input type="text" v-model="titleStr" placeholder="填写标题会有更多赞哦~">
      <van-field
          v-model="contentStr"
          rows="2"
          :autosize="size"
          type="textarea"
          placeholder="添加正文"
          show-word-limit
      />
    </div>
    <div class="btn bottomBtn" @click="pushDaily()">发布日志</div>
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
import request from "@/until/req";
import {Toast} from "vant";

export default {
  name: "Add",
  components: {Navbar},
  data() {
    return {
      size: {maxHeight: 500, minHeight: 300},
      fileList: [],
      contentStr: '',
      titleStr: ''
    }
  },
  methods: {
    pushDaily() {
      if (this.contentStr === '' || this.titleStr === '' || this.fileList.length === 0) {
        Toast.fail('图片或标题内容为空!')
        return
      }
      let formData = new FormData()
      this.fileList.forEach(item => {
        formData.append('file', item.file)
      })
      request.post("/upPic", formData).then(res => {
        request.post('/user/insertDaily',{
          title:this.titleStr,
          content:this.contentStr,
          pics:res.urls,
          uid:JSON.parse(window.localStorage.getItem('user')).id
        }).then(res=>{
          Toast.success('发布成功')
          this.$router.go(-1)
        })
      })
    }
  }
}
</script>

<style scoped>
.root {
  padding: 12px;
  background: white;
}

.bottomBtn {
  position: fixed;
  bottom: 12px;
  width: calc(100% - 60px);
  color: white;
  background: #ff223b;
}

</style>
