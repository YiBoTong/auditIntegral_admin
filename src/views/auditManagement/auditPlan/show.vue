<!--
****--@date     2018-12-18 10:02
****--@author   XXL
****--@describe show
-->
<template>
  <!--审计方案-->
  <el-card>
    <el-row slot="header" :gutter="10" class="card-header">
      <el-col :span="12">
        <el-button type="text">查看审计方案</el-button>
      </el-col>
      <el-col :span="12" align="right">
        <el-button type="text" @click="backList('auditPlan')">返回列表</el-button>
      </el-col>
    </el-row>
    <audit-plan-show-info v-loading="showLoading" :form-data="formData" :step-data="stepData"/>
  </el-card>
</template>
<script>
/* 当前组件必要引入 */
import { programmeGet } from '@/api/auditManagement'
import AuditPlanShowInfo from './auditPlanShowInfo'

export default {
  name: 'AuditPlanShow',
  components: { AuditPlanShowInfo },
  props: {},
  data() {
    return {
      self: this,
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
      stepData: []
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
      if (this.$route) {
        const { id } = this.$route.params
        this.getAuditPlan(id)
      }
    },
    // 获取
    getAuditPlan(id) {
      this.showLoading = true
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
    }
  }
}
</script>
