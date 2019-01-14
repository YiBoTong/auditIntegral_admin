<!--
****--@date     2019-01-12 22:33
****--@author   XXL
****--@describe 查看后续检查
-->
<template>
  <el-card v-loading="dataLoading" class="track-show-container">
    <el-row slot="header">
      <el-col :span="12">
        <el-button type="text">查看后续检查</el-button>
      </el-col>
      <el-col :span="12" align="right">
        <el-button type="text" @click="backList">返回列表</el-button>
      </el-col>
      <el-col align="center">
        <h1>{{ this.$store.getters["com"]('name') }}XX年XXX专项审计后续检查表</h1>
      </el-col>
    </el-row>
    <div class="card-content">
      <div class="public-div"><span>检查单位：兴仁农商银行稽核审计部</span></div>
      <div class="public-div two-row"><el-col :span="12">检查项目：XXX 年XXX专项审计</el-col><el-col :span="12">检查内容：信贷资料</el-col></div>
      <div class="public-div"><span>检查时间：XXXX年XXX月XXX日</span></div>
      <div class="public-div four-row"><el-col :span="12">检查人：</el-col><el-col :span="12">复核人：</el-col></div>
      <div class="table">
        <el-table
          :data="tableData"
          border
          show-summary
          style="width: 99.99%">
          <el-table-column
            type="index"
            label="序号"
          />
          <el-table-column
            prop="name"
            label="客户名称"/>
          <el-table-column
            prop=""
            sortable
            label="贷款日期"/>
          <el-table-column
            prop=""
            sortable
            label="到期日期"/>
          <el-table-column
            prop="num1"
            sortable
            label="贷款金额"/>
          <el-table-column
            prop="num2"
            sortable
            label="结欠金额"/>
          <el-table-column
            prop=""
            sortable
            label="存在问题"/>
          <el-table-column
            prop=""
            sortable
            label="整改情况"/>
          <el-table-column
            prop=""
            sortable
            label="被检查单位"/>
        </el-table>
      </div>
      <div class="public-div"><span>被检查单位意见：</span></div>
      <div class="public-div"><span>被检查单位负责人（或授权代理人）签字：</span></div>
      <div class="public-div"><span>年月日</span></div>
    </div>
  </el-card>
</template>
<script>
/* 当前组件必要引入 */
// import { } from '@/api/auditManagement'

export default {
  name: 'TrackShow',
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
