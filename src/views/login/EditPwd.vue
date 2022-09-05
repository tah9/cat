<template>
  <div>
    <navbar title="修改密码"></navbar>
    <!-- 输入密码 -->
    <van-field v-model="o1" type="password" placeholder="请输入原密码" label="原密码"/>
    <van-field v-model="o2" type="password" placeholder="请输入新密码" label="新密码"/>
    <van-field v-model="o3" type="password" placeholder="请再输一次密码" label="确认密码"/>

    <van-button color="#98a2c4" @click="submit()" style="margin-top: 20%" type="primary" size="large">确认修改</van-button>
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
import request from "@/until/req";
import {Toast} from "vant";

export default {
  name: "EditPwd",
  components: {Navbar},
  data() {
    return {
      o1: null, o2: null, o3: null
    }
  },
  methods: {
    submit() {
      if (this.o1 === "" || this.o2 === "" || this.o3 === "") {
        Toast.fail('请完整输入');
        return
      }
      let user = JSON.parse(localStorage.getItem('user'));

      if (this.o1 !== user.password) {
        Toast.fail('原密码错误');
        return
      }
      if (user.password === this.o1 && this.o2 === this.o3) {
        request.post('/upPwd', {
          username: JSON.parse(window.localStorage.getItem('user')).username,
          opassword: this.o1,
          npassword: this.o2
        }).then(res => {
          Toast.success('修改成功');
          setTimeout(() => {
            this.$router.replace('/login')
          }, 500)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
