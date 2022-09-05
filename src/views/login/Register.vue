<template>
  <div class="root">
    <div style="margin-top: 20%;margin-left: 10%;margin-bottom: 15%">
      <div style="font-size: 1.5em;font-weight: bold">注册账号</div>
    </div>

    <div style="padding-left: 3%;padding-right: 3%">

      <!-- 输入昵称 -->
      <van-field v-model="user.username" label="用户名" placeholder="请输入昵称"
                 maxlength="11" :required="true" :rules="[{ required: true }]"/>
      <!-- 确认密码 -->
      <van-field type="password" label="密码" placeholder="请输入密码" ref="pswd" v-model="user.temp"
                 maxlength="11" :required="true" :rules="[{ required: true }]"/>
      <!-- 输入密码 -->
      <van-field v-model="user.password" type="password" label="确认密码" placeholder="请确认密码"
                 maxlength="11" :required="true" :rules="[{ required: true }]"/>
      <div class="btn" style="margin: 16px;" @click="registerUp"  :style="'background:' +((user.username===''||user.password===''||user.temp==='')?'#eeeff3':'#98a2c4')+';'+
        'color:'+((user.username===''||user.password===''||user.temp==='')?'black':'white')+';'">注册
      </div>
    </div>
    <div
        style="position: absolute;bottom:10%;width:100%;display: flex;flex-direction: column;justify-content: center;align-items: center">
      <div>去登陆</div>
      <van-icon name="arrow-down" size="40"/>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
import {Toast} from "vant";
import request from "@/until/req";

export default {
  name: "Register",
  components: {Navbar},
  data() {
    return {
      registerFinish: false,
      user: {
        password: '',
        username: '',
        temp: ''
      },
    }
  },
  methods: {
    registerUp() {
      if (this.user.temp !== this.user.password) {
        Toast.fail("两次密码输入不一致")
      }
      request.post('/register', this.user).then(res => {
        console.log(this.user);
        console.log(res)
        if (res.code === 200) {
          this.registerFinish = true
          console.log(res);
          Toast.success('注册成功')
          this.$router.replace('/login')
        } else {
          Toast.fail('注册失败，用户已存在')
        }
        console.log(res);
      })
    }
  }
}
</script>

<style scoped>
h2 {
  text-align: center;
  grid-column-start: 2;
}

a {
  grid-column-start: 3;
  grid-row-start: 3;
  text-align: center;
}

.root {
  display: flex;
  flex-direction: column;
}
</style>
