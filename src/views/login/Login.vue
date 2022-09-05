<template>
  <div style="background-color: white">
    <van-swipe style="height: 100vh;" vertical>
      <van-swipe-item>
        <div style="z-index: 999">
        <div style="margin-top:20%;display: flex;flex-direction: column;justify-content: center;align-items: center">
          <van-icon name="arrow-up" size="40"/>
          <div>没有账号，去注册</div>
        </div>
        <div class="top">
          <div style="font-size: 1.5em;font-weight: bold">用户登录</div>
          <div style="margin-top: 1em;margin-bottom: 2em">有温度的宠物领养平台</div>
          <input type="text" v-model="username" placeholder="用户名">
          <input type="password" v-model="password" placeholder="密码">
        </div>
        <div class="btn" @click="clickBtn()"
             :style="'background:' +((username===''||password==='')?'#eeeff3':'#98a2c4')+';'+
        'color:'+((username===''||password==='')?'black':'white')+';'">登录
        </div>

        <div class="reg" style="display: none" @click="$router.push('/register')">注册账号</div>
        </div>
      </van-swipe-item>
      <van-swipe-item><Register></Register></van-swipe-item>
    </van-swipe>

  </div>
</template>

<script>
import request from "@/until/req";
import {Toast} from 'vant'
import Register from "@/views/login/Register";

export default {
  name: "Login",
  components: {Register},
  data() {
    return {
      username: '章鱼哥',
      password: '111111111'
    }
  },
  methods: {
    clickBtn() {
      let _this = this
      if (this.username === '' || this.password === '') {
        return
      }
      request.post('/login', {
        username: this.username,
        password: this.password
      }).then(res => {
        console.log(res);
        if (res.code === 200) {
          console.log(res);
          localStorage.setItem('user', JSON.stringify(res.user))
          if (res.user.type===0){
            _this.$router.replace('/user/home')
          }else{
            _this.$router.replace('/admin/home')
          }
        } else {
          Toast.fail('账号或密码错误')
        }
      })
    }
  }
}
</script>

<style scoped>

.top {
  display: flex;
  padding: 40px;
  margin-top: 50px;
  box-sizing: border-box;
  flex-direction: column;
  align-items: flex-start;
}



input {
  border-bottom: 1px solid rgba(0, 0, 0, .05);
  border-top: none;
  border-left: none;
  border-right: none;
  width: 100%;
  height: 55px;

}

.reg {
  color: #757575;
  margin: 30px;
}
</style>
