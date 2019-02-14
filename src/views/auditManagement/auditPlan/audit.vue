<!--
****--@date     2018-12-20 09:25
****--@author   XXL
****--@describe 审核管理
-->
<template>
  <el-card>
    <el-row slot="header" :gutter="10" class="card-header">
      <el-col :span="12">
        <el-button type="text" disabled>审核方案</el-button>
      </el-col>
      <el-col :span="12" align="right">
        <el-button type="text" @click="backList('auditPlan')">返回列表</el-button>
      </el-col>
    </el-row>
    <audit-plan-show-info v-loading="showLoading" :form-data="formData" :step-data="stepData"/>
    <br>
    <h4>审核</h4>
    <hr>
    <br>
    <el-row :gutter="10">
      <el-col>
        <el-form :modal="auditData" label-width="80px">
          <el-form-item label="审核意见" prop="content">
            <el-input v-model="auditData.content" :autosize="{minRows: 3, maxRows: 6}" type="textarea" placeholder="请输入审核意见"/>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div align="center">
      <el-button type="primary" size="mini" @click="handleStatePass">通过</el-button>
      <el-button type="danger" size="mini" @click="handleStateReject">驳回</el-button>
    </div>
  </el-card>
</template>

<script>
import AuditPlanShowInfo from './auditPlanShowInfo'
import IndexShow from './show'
import { programmeDepExamine, programmeAdminExamine, programmeGet } from '@/api/auditManagement'
export default {
  name: 'Audit',
  components: { AuditPlanShowInfo, IndexShow },
  // props: {},
  data() {
    return {
      auditData: {
        id: '',
        state: '',
        content: ''
      },
      stateType: '',
      stepData: [],
      formData: {
        id: '',
        purpose: '',
        title: '',
        type: ' ',
        startTime: '',
        endTime: '',
        planStartTime: '',
        planEndTime: '',
        updateTime: '',
        state: '',
        basis: [],
        business: [],
        content: [],
        emphases: [],
        step: [],
        userList: [],
        adminExamine: [],
        depExamines: []
      },
      queryData: null
    }
  },
  created() {
    this.init()
  },
  methods: {
    // 初始化
    init() {
      this.queryData = this.$route.query
      this.getAuditPlan(this.queryData.id)
      if (this.queryData.state === 'dep_adopt') {
        this.stateType = this.queryData.state
      } else {
        this.stateType = this.queryData.state
      }
    },
    // 获取
    getAuditPlan(id) {
      programmeGet({ id: id }).then(res => {
        if (!res.status.error) {
          const data = res.data
          this.changeGetStepDataType(data.step)
          this.formData = res.data
        } else {
          this.$message.error(res.status.msg)
        }
        this.showLoading = false
      })
    },
    // 组装实施步骤数据
    changeGetStepDataType(arr) {
      const temp = []
      arr.map(obj => {
        const { type, content } = obj
        const item = { type, content }
        const last = temp[temp.length > 0 ? temp.length - 1 : 0]
        let lastContent = null
        obj.id && (item['id'] = obj.id)
        switch (type) {
          case 'title':
            item['stepContent'] = []
            temp.push(item)
            break
          case 'content':
            item['stepList'] = []
            if (last['stepContent']) {
              last['stepContent'].push(item)
            }
            break
          case 'step':
            lastContent = last.stepContent[last.stepContent.length > 0 ? last.stepContent.length - 1 : 0]
            if (lastContent['stepList']) {
              lastContent['stepList'].push(item)
            }
            break
        }
      })
      console.log(temp)
      this.stepData = temp
    },
    // 审核通过
    handleStatePass() {
      this.auditData.id = this.queryData.id
      console.log(this.stateType)
      if (this.stateType === 'report') { // 部门负责人审核
        this.auditData.state = 'adopt'
        programmeDepExamine(this.auditData).then(res => {
          if (res) {
            this.$message({
              type: res.status.error ? 'error' : 'success',
              message: (res.status.msg || '审核通过') + '!'
            })
            this.backList('auditPlan')
          } else {
            this.$message({
              type: 'error',
              message: '审核失败，请重试!'
            })
          }
        })
      } else { // 分管领导审核
        this.auditData.state = 'adopt'
        programmeAdminExamine(this.auditData).then(res => {
          if (res) {
            this.$message({
              type: res.status.error ? 'error' : 'success',
              message: (res.status.msg || '审核通过') + '!'
            })
            this.backList('auditPlan')
          } else {
            this.$message({
              type: 'error',
              message: '审核失败，请重试!'
            })
          }
        })
      }
    },
    // 审核驳回
    handleStateReject() { // 部门负责人审核
      this.auditData.id = this.queryData.id
      if (this.stateType === 'report') {
        this.auditData.state = 'reject'
        programmeDepExamine(this.auditData).then(res => {
          if (res) {
            this.$message({
              type: res.status.error ? 'error' : 'success',
              message: (res.status.msg || '驳回成功') + '!'
            })
            this.backList('auditPlan')
          } else {
            this.$message({
              type: 'error',
              message: '驳回失败，请重试!'
            })
          }
        })
      } else { // 分管领导审核
        this.auditData.state = 'reject'
        programmeAdminExamine(this.auditData).then(res => {
          if (res) {
            this.$message({
              type: res.status.error ? 'error' : 'success',
              message: (res.status.msg || '驳回成功') + '!'
            })
            this.backList('auditPlan')
          } else {
            this.$message({
              type: 'error',
              message: '驳回失败，请重试!'
            })
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
