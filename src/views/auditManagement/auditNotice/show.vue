<!--
****--@date     2019-01-14 15:45
****--@author   XXL
****--@describe 查看审计报告
-->
<template>
  <el-card v-loading="dataLoading" class="audit-notice-show-container">
    <el-row slot="header">
      <el-col :span="12">
        <el-button type="text">查看审计通知</el-button>
      </el-col>
      <el-col :span="12" align="right">
        <el-button type="text" @click="backList">返回列表</el-button>
      </el-col>
      <el-col align="center">
        <h1>贵州{{ this.$store.getters["com"]('name') }}股份有限公司</h1>
      </el-col>
    </el-row>
    <div class="card-content">

    </div>
  </el-card>
</template>
<script>
/* 当前组件必要引入 */
// import { } from '@/api/auditManagement'

export default {
  name: 'AuditNoticeShow',
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
      tableData: [
        {
          num1: 12,
          num2: 15
        },
        {
          num1: 20,
          num2: 1456
        }
      ]
    }
  },
  created() {
    this.init()
  },
  mounted() {
  },
  methods: {
    // 初始化
    init() {
      if (this.paramsData) {
        console.log(this.paramsData)
        // const id = this.paramsData.id
      }
    },
    // 返回列表
    backList() {
      this.$emit('view', 'list')
    }
  }
}
</script>
