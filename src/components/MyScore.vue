<template>
  <div style="font-size: 0.85em;display: flex;align-items: center">
    我的信用:<div style="color: #00a9f2;margin-left: 5px">{{score}}</div>
  </div>
</template>

<script>
import request from "@/until/req";

export default {
  name: "MyScore",
  data(){
    return{
      score:null
    }
  },
  activated() {
    request.post('/user/getScore',{
      id:JSON.parse(window.localStorage.getItem('user')).id
    }).then(res=>{
      this.score=res.score
    })
  }
}
</script>

<style scoped>

</style>
