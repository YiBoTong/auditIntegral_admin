<!--
****--@date     2019-01-14 15:45
****--@author   XXL
****--@describe 查看审计通知
-->
<template>
  <el-card v-loading="dataLoading" class="audit-notice-show-container">
    <el-row slot="header">
      <el-col :span="12">
        <el-button type="text" disabled>查看审计通知</el-button>
      </el-col>
      <el-col :span="12" align="right">
        <el-button type="text" @click="backList('auditNotice')">返回列表</el-button>
      </el-col>
      <el-col align="center">
        <h1>{{ this.$store.getters["com"]('com') }}</h1>
      </el-col>
    </el-row>
    <div class="card-content">
      <div class="content-header" align="center">
        <h2>{{ this.$store.getters["com"]('name') }}稽核审计通知书</h2>
      </div>
      <div class="body-time-number" align="center">{{ tableData.year }}年第{{ tableData.number }}号</div>
      <div class="body-header">{{ tableData.draft.queryDepartmentName }}：</div>
      <div class="body-content">&emsp;&emsp;根据{{ tableData.year }}工作计划的相关要求，{{ tableData.draft.departmentName }}兹指派下列人员于{{ tableData.draft.queryStartTime | fmtDate('yyyy年MM月dd日') }}至{{ tableData.draft.queryEndTime | fmtDate('yyyy年MM月dd日') }}对你部进行{{ tableData.draft.projectName }}审计。请给予积极配合并提供必要的工作条件。</div>
      <div class="content-user">
        <span>组 长：{{ tableData.userLeader }}</span>
        <span>成员：{{ tableData.userList }}</span>
        <span>特此通知</span>
      </div>
      <div class="content-footer">
        <span>{{ this.$store.getters["com"]('name') }}{{ tableData.draft.queryDepartmentName }}</span>
        <span>{{ tableData.draft.updateTime | fmtDate('yyyy年MM月dd日') }}</span>
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
        draft: {
          projectName: '',
          departmentName: '',
          queryDepartmentName: '',
          queryStartTime: '',
          queryEndTime: '',
          updateTime: ''
        },
        business: '',
        userList: '',
        userLeader: ''
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
      if (this.$route.params) {
        const id = this.$route.params.id
        this.getAuditNoticeData(id)
      }
    },
    getAuditNoticeData(id) {
      this.dataLoading = true
      getAuditNotice({ id: id }).then(res => {
        if (!res.status.error) {
          const data = res.data
          // 组装人员
          const user = []
          data.userList.map(item => {
            if (item.isLeader) {
              data.userLeader = item.userName
            } else {
              user.push(item.userName)
            }
          })
          data.userList = user.join('、')
          // 数据准备完成 赋值
          this.tableData = data
        } else {
          this.$message.error(res.status.msg)
        }
        this.dataLoading = false
      })
    }
  }
}
</script>
