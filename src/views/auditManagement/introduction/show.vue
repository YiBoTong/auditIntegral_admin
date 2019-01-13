<!--
****--@date     2019-01-12 22:31
****--@author   XXL
****--@describe 查看介绍信
-->
<template>
  <el-card v-loading="dataLoading" class="introduction-show-container">
    <el-row slot="header" class="card-header">
      <el-col :span="12">
        <el-button type="text">查看介绍信</el-button>
      </el-col>
      <el-col :span="12" align="right">
        <el-button type="text" @click="backList">返回列表</el-button>
      </el-col>
    </el-row>
    <div class="card-content">
      <div class="content-top">
        <div class="top-header">
          <h2>查库介绍信存根</h2>
        </div>
        <div class="top-number">
          No:<div class="underline number"> {{ introductionData.year + introductionData.number.toString().padStart(3, '0') }}</div>
        </div>
        <div class="top-body">
          &emsp;&emsp;介绍 <div class="underline">{{ user }}</div>等同志<div class="underline userLen">{{ introductionData.userList.length }}</div>人前往{{ this.$store.getters["com"]('name') }}<div class="underline">{{ introductionData.draft.queryDepartmentName }}</div>查库，请给予支持配合。
        </div>
        <div class="top-time">
          <h3>{{ introductionData.draft.time | fmtDate('yyyy年MM月dd日') }}</h3>
        </div>
      </div>
      <div class="content-dashed">
        <div class="dashed"/><div class="dashed transparent"><h3>字第{{ introductionData.number | numberConvertToUppercase }}号</h3></div><div class="dashed"/>
      </div>
      <div class="content-bottom">
        <div class="bottom-header">
          <h2>介绍信</h2>
        </div>
        <div class="bottom-number">
          No:<div class="underline number"> {{ introductionData.year + introductionData.number.toString().padStart(3, '0') }}</div>
        </div>
        <div class="bottom-body-header">
          {{ this.$store.getters["com"]('name') }}<div class="underline">{{ introductionData.draft.queryDepartmentName }}</div>:
        </div>
        <div class="bottom-body-content">
          &emsp;&emsp;兹介绍 <div class="underline">{{ user }}</div>等同志<div class="underline userLen">{{ introductionData.userList.length }}</div>人前往{{ this.$store.getters["com"]('name') }}<div class="underline">{{ introductionData.draft.queryDepartmentName }}</div>查库，请给予支持配合。
        </div>
        <div class="bottom-body-footer">
          <div class="footer-one-row">
            此致
          </div>
          <div class="footer-two-row">
            负责人签字:<div class="underline">{{ '' }}</div>
          </div>
          <div class="footer-three-row">
            （有效期贰天，复印涂改无效）
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>
<script>
/* 当前组件必要引入 */
import { getIntroduction } from '@/api/auditManagement'
export default {
  name: 'IntroductionShow',
  components: {},
  props: {
    paramsData: {
      type: [Object, String],
      required: false,
      default: ''
    }
  },
  data() {
    return {
      dataLoading: false,
      introductionData: {
        draft: {
          time: ''
        },
        year: '',
        number: '',
        userList: []
      },
      user: ''
    }
  },
  // computed: {},
  // watch: {},
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    // 初始化
    init() {
      this.getIntroductionData()
    },
    // 返回列表
    backList() {
      this.$emit('view', 'list')
    },
    // 获取介绍信
    getIntroductionData() {
      this.dataLoading = true
      getIntroduction({ id: this.paramsData.id }).then(res => {
        if (!res.status.error) {
          const data = res.data.userList
          const arr = []
          data.map(res => {
            arr.push(res.userName)
          })
          this.user = arr.join()
          this.introductionData = res.data
        } else {
          this.$message.error(res.status.msg)
        }
        this.dataLoading = false
      })
    }
  }
}
</script>
