<!--
****--@date     2019-01-03 18:53
****--@author   XXL
****--@describe 审计报告
-->
<template>
  <div class="audit-report-input-container">
    <div class="input-header">
      <div class="header-left">
        <el-button @click="backList">返回列表</el-button>
      </div>
    </div>
    <div v-loading="loading" class="input-content">
      <el-card>
        <div slot="header" class="card-header" align="center">
          <h1>XX关于XX的报告</h1>
        </div>
        <div class="card-content">
          <div>
            <h3>一、组织实施情况</h3>
          </div>
          <div>
            <h3>二、基本情况</h3>
          </div>
          <div>
            <h3>三、下一步工资措施</h3>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
/* 当前组件必要引入 */
// import { getConfirmation, editConfirmation } from '@/api/auditManagement'
export default {
  name: 'AuditReportInput',
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
      loading: false,
      buttonLoading: false,
      showData: false
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
        const id = this.paramsData.id
        this.getConfirmationData(id)
      }
    },
    // 返回列表
    backList() {
      this.$emit('view', 'list')
    }
  }
}
</script>
