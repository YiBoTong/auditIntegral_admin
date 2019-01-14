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
      <div class="content-header" align="center">
        <h2>{{ this.$store.getters["com"]('name') }}稽核审计通知书</h2>
      </div>
      <div class="body-time-number" align="center">{{ tableData.year }}年第{{ tableData.number }}号</div>
      <div class="body-header">消费者权益保护部：</div>
      <div class="body-content">&emsp;&emsp;根据2018年年初工作计划的相关要求，稽核审计部门兹指派下列人员于2018年12月7至12月11日对你部进行2018年度金融消费者权益保护工作专项审计。请给予积极配合并提供必要的工作条件。</div>
      <div class="content-user">
        <span>组 长：杨廷兰</span>
        <span>成员：班廷林 陈龙</span>
        <span>特此通知</span>
      </div>
      <div class="content-footer">
        <span>{{ this.$store.getters["com"]('name') }}稽核审计部</span>
        <span>2018年12月7日</span>
      </div>
    </div>
  </el-card>
</template>
<script>
/* 当前组件必要引入 */
import { getAuditNotice } from '@/api/auditManagement'

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
      tableData: {
        year: '',
        number: '',
        draft: {}
      }
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
        const id = this.paramsData.id
        this.getAuditNoticeData(id)
      }
    },
    getAuditNoticeData(id) {
      this.dataLoading = false
      getAuditNotice({ id: id }).then(res => {
        if (!res.status.error) {
          this.tableData = res.data
        } else {
          this.$message.error(res.status.msg)
        }
        this.dataLoading = false
      })
    },
    // 返回列表
    backList() {
      this.$emit('view', 'list')
    }
  }
}
</script>
