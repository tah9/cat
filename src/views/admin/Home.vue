<template>
  <div>
    <navbar title="管理员" :left="false"></navbar>
    <div style="display: flex;width:100%;justify-content: center;align-items: center;background-color: white">
      <van-radio-group v-model="radio">
        <van-radio name="0" style="margin-top: 1em;margin-right: 2em">咨询公告</van-radio>
        <van-radio name="1" style="margin-top: 1em;margin-right: 2em">养护攻略</van-radio>
        <van-radio name="2" style="margin-top: 1em;margin-right: 2em">寻宠启示</van-radio>
        <van-radio name="3" style="margin-top: 1em;margin-right: 2em">领养启示</van-radio>
      </van-radio-group>
      <div class="upPic">
        <img src="../../assets/cam.svg" ref="pic">
        <input accept="image/*" type="file" @change="insertImg" ref="contentFile">
      </div>
    </div>
    <van-field
        v-model="str"
        rows="2"
        :autosize="size"
        label="正文"
        type="textarea"
        maxlength="500"
        placeholder="请在此输入"
        show-word-limit
    />
    <div class="btn" style="margin-top: 2em"
         :style="'background:' +((str===''||urls==='')?'#eeeff3':'#98a2c4')+';'+
        'color:'+((str===''||urls==='')?'black':'white')+';'" @click="pushStr()">发布</div>
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
import request from "@/until/req";

export default {
  name: "Home",
  components: {Navbar},
  data() {
    return {
      size: {maxHeight: 300, minHeight: 200},
      radio: '1',
      str:'',
      urls:''
    }
  },
  methods: {
    pushStr(){
      request.post('/admin/insertNotice',{
        type: this.radio,
        url:this.urls.split(',')[0],
        str:this.str
      }).then(res=>{
        console.log(res);
      })
    },
    insertImg() {
      let contentFile = this.$refs.contentFile;
      let file = contentFile.files[0]
      let base = window.webkitURL.createObjectURL(file);
      this.$refs.pic.src = base
      let formData = new FormData()
      formData.append('file', file)
      request.post('/upPic',formData).then(res=>{
        this.urls=res.urls
        console.log(this.urls.split(',')[0]);
      })
    }
  }
}
</script>

<style scoped>
.upPic {
  margin: 1em 0;
  position: relative;
  width: 50vw;
  height: 50vw;
}

.upPic input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 9;
}

.upPic img {
  border-radius: 12px;
  background-color: #f7f8fa;
  width: 50vw;
  height: 50vw;
  position: absolute;
  object-fit: scale-down;
}
</style>
