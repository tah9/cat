<template>
  <div>
    <navbar title="在线预约"></navbar>
    <div class="card">
      <div style="display: flex;align-items: center">
        <div style="font-weight: bold;margin: 0 0 8px 0">在线预约寄养</div>
        <div
            style="margin: 0 0 8px 1em;flex: 1;height: 0.4em;background:linear-gradient( to right,#cba442,rgba(0,0,0,0));"></div>
      </div>
      <TabLayout @changeTab="changeSpecies">
        <div v-for="spe in species"
             :style="spe===curSpecies?'background: rgb(195 7 7 / 20%)':''"
             class="circleBtn species">{{ spe }}
        </div>
      </TabLayout>
      <div style="margin: 0 0 8px 0;">选择品种</div>
      <TabLayout v-if="curSpecies==='狗'" @changeTab="(cur)=>{this.curVarieties=this.dogVarieties[cur]}">
        <div class="circleBtn" :style="varieties===curVarieties?'background: rgb(195 7 7 / 20%)':''"
             v-for="varieties in dogVarieties">{{ varieties }}
        </div>
      </TabLayout>
      <TabLayout v-else-if="curSpecies==='猫'" @changeTab="(cur)=>{this.curVarieties=this.catVarieties[cur]}">
        <div class="circleBtn" :style="varieties===curVarieties?'background: rgb(195 7 7 / 20%)':''"
             v-for="varieties in catVarieties">{{ varieties }}
        </div>
      </TabLayout>
      <div style="margin: 0 0 8px 0;">宠物年龄</div>
      <TabLayout @changeTab="(cur)=>{this.curAge=this.agaData[cur]}">
        <div class="circleBtn" :style="age===curAge?'background: rgb(195 7 7 / 20%)':''" v-for="age in agaData">
          {{ age }}
        </div>
      </TabLayout>
      <div style="margin: 0 0 8px 0;">宠物性别</div>
      <TabLayout @changeTab="(cur)=>{this.curSex=this.sexData[cur]}">
        <div class="circleBtn" :style="sex===curSex?'background: rgb(195 7 7 / 20%)':''" v-for="sex in sexData">
          {{ sex }}
        </div>
      </TabLayout>
      <div style="margin: 0 0 8px 0;">免疫驱虫(多选)</div>
      <TabLayout @changeTab="(cur)=>{this.vaccineData[cur].check=!this.vaccineData[cur].check}">
        <div class="circleBtn" :style="item.check?'background: rgb(195 7 7 / 20%)':''"
             v-for="item in vaccineData">
          {{ item.name }}
        </div>
      </TabLayout>
      <div style="margin: 0 0 8px 0;">寄养时间</div>
      <div style="display: flex">
        <div class="circleBtn species time" @click="()=>{this.showStartDate=true}">
          <div>开始</div>
          {{ formatDate(startTime) }}
        </div>
        <div class="circleBtn species time" @click="()=>{this.showEndDate=true}" style="display: flex">
          <div>结束</div>
          {{ formatDate(endTime) }}
        </div>

      </div>
      <div style="margin: 0 0 8px 0;">宠物美照</div>
      <van-uploader v-model="fileList" multiple accept="image/*"/>
      <div style="margin: 0 0 8px 0;">宠物描述</div>
      <van-field v-model="contentStr"
                 rows="2" class="contentMain"
                 :autosize="size"
                 type="textarea"
                 maxlength="100"
                 placeholder="请输入介绍"
                 show-word-limit
      />
      <div class="bottom">
        <img src="../../../assets/cat.jpg">
        <div class="pushBtn" @click="submitClick">提交</div>
      </div>
      <DatePicker v-if="showStartDate" @confirm="confirmstartTime"></DatePicker>
      <DatePicker v-if="showEndDate" @confirm="confirmendTime"></DatePicker>
    </div>
  </div>
</template>

<script>
import TabLayout from "@/components/TabLayout";
import DatePicker from "@/views/User/Two/DatePicker";
import {Toast} from "vant";
import request from "@/until/req";
import Navbar from "@/components/navbar";

export default {
  name: "Two",
  components: {Navbar, DatePicker, TabLayout},
  data() {
    return {
      showStartDate: false,
      showEndDate: false,
      fileList: [],
      startTime: new Date().getTime(),
      endTime: new Date().getTime() + 86400000,
      size: {maxHeight: 100, minHeight: 60},
      contentStr: '',
      species: ['狗', '猫'],
      curSpecies: '狗',
      curVarieties: '中华田园犬',
      curAge: '三月龄以下',
      curSex: '公',
      agaData: ['三月龄以下', '3-6月龄', '7-12月龄', '12月龄以上', '年龄不详'],
      sexData: ['公', '母', '去势公', '绝育母'],
      vaccineData: [{name: '狂犬疫苗', check: false}, {name: '联苗', check: false}, {
        name: '体内驱虫',
        check: false
      }, {name: '体外驱虫', check: false}],
      dogVarieties: ['中华田园犬', '秋田犬', '柴吉', '柯基', '比特犬', '吉娃娃', '斗牛犬', '杜宾犬', '拉布拉多', '牧羊犬', '日本柴犬', '金毛', '阿拉斯加', '哈士奇', '贵宾'],
      catVarieties: ['中华田园猫', '英国短毛猫', '金渐层', '银渐层', '布偶猫', '美国短毛猫', '暹罗猫', '俄罗斯蓝猫', '金吉拉', '波斯猫', '美国卷耳猫', '挪威森林猫', '加拿大无毛猫', '阿比西尼亚猫']
    }
  },
  methods: {
    submitClick() {
      if (this.contentStr === '') {
        Toast('宠物描述不能为空');
        return
      }
      if (this.fileList.length === 0) {
        Toast('请上传图片');
        return
      }
      let vaccines = []
      for (let vaccine of this.vaccineData) {
        if (vaccine.check) {
          vaccines.push(vaccine.name)
        }
      }
      let formData = new FormData()
      this.fileList.forEach(item => {
        formData.append('file', item.file)
      })
      request.post("/upPic", formData).then(res => {
        request.post('/user/insertAdoption', {
          uid: JSON.parse(window.localStorage.getItem('user')).id,
          sex: this.curSex,
          age: this.curAge,
          species: this.curSpecies,
          varieties: this.curVarieties,
          vaccine: vaccines.toString(),
          content: this.contentStr,
          pics: res.urls,
          startTime: new Date(new Date(this.startTime).setHours(0, 0, 0, 0)).getTime(),
          endTime: new Date(new Date(this.endTime).setHours(0, 0, 0, 0)).getTime(),
        }).then(res => {
          Toast('提交成功')
          this.$router.go(-1)
        })
      })

    },
    confirmstartTime(d) {
      this.showStartDate = false;
      this.startTime = new Date(d).getTime()
    },
    confirmendTime(d) {
      this.showEndDate = false
      let time = new Date(d).getTime();
      if (time > this.startTime) {
        this.endTime = time;
      } else {
        Toast.fail("结束日期需大于开始日期")
      }
    },
    formatDate(d) {
      let now = new Date(d)
      let month = now.getMonth() + 1;
      let date = now.getDate();
      return now.getFullYear() + "-" + month + "-" + date;
    },
    changeSpecies(cur) {
      this.curSpecies = this.species[cur]
      this.curVarieties = this.curSpecies === '狗' ? this.dogVarieties[0] : this.catVarieties[0]
    },
  }
}
</script>

<style scoped>
.contentMain {
  border-radius: 12px;
  background: #f7f8fa;
  font-weight: 500;
}

.card {
  font-weight: 550;
  color: #a37008;
  border-radius: 12px;
  padding: 12px;
  box-sizing: border-box;
  margin: 0.3em 0.5em;
  background: #ffdb45;
  width: calc(100% - 1em);
  box-shadow: 0 10px 6px -6px rgba(30, 30, 30, 0.1), 12px 0 8px -8px rgba(50, 50, 50, 0.1);
  transition: all .2s ease-in-out;
}

.time {
  font-size: 0.95em;
  display: flex;
}

.time > div {
  font-weight: 500;
  color: #b38934;
  margin-right: 0.5em;
}

.pushBtn {
  margin-top: 8px;
  background: #f15a48;
  color: white;
  position: absolute;
  width: 45%;
  text-align: center;
  height: 35px;
  right: 0;
  border-radius: 99px;
  line-height: 35px;
}

.species {
  border-radius: 6px !important;
}

.circleBtn {
  height: 2em;
  line-height: 2em;
  padding: 0 1em;
  border-radius: 99px;
  box-sizing: border-box;
  background: rgba(186, 166, 166, 0.2);
  margin-right: 1em;
}

.bottom {
  height: 35px;
  position: relative;
}

.bottom img {
  height: 30px;
  position: absolute;
  bottom: -0.8em;
}
</style>
