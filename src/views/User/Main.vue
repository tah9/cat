<template>
  <div class="root">
    <keep-alive>
      <router-view class="routerView"></router-view>
    </keep-alive>
    <TabLayout @changeTab="(cur)=>{this.active=cur;}" class="tabLayout">
      <div v-for="(item,index) in urls"
           :style="active===index?'font-size:1.1em;color:black;font-weight:bold;':'color:#757575;'"
           @click="$router.replace(item.url)">{{ item.name }}
      </div>
    </TabLayout>
  </div>
</template>

<script>
import TabLayout from "@/components/TabLayout";

export default {
  name: "Main",
  components: {TabLayout},
  data() {
    return {
      urls: [
        {name: '首页', url: '/user/home'},
        {name: '领养', url: '/user/one'},
        {name: '寄养', url: '/user/two'},
        {name: '日志', url: '/user/three'},
      ],
      active: 0,
    }
  },
  methods: {
    getCurIndex() {
      for (let i = 0; i < this.urls.length; i++) {
        if ('/' + window.location.hash === '/#' + this.urls[i].url) {
          return i
        }
      }
    }
  },
  created() {
    this.active = this.getCurIndex()
  }
}
</script>

<style scoped>
.root {
  --tabHeight: 44px;
  height: 100vh;
}

.routerView {
  height: calc(100% - var(--tabHeight));
  overflow: scroll;
}

.tabLayout {
  height: var(--tabHeight);
  width: 100%;
  display: flex;
  position: fixed;
  bottom: 0;
  line-height: var(--tabHeight);
  background-color: white;
}

.tabLayout > div {
  flex: 1;
  text-align: center;
}
</style>
