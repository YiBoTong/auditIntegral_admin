<!--
****--@date     2018-12-20 09:25
****--@author   XXL
****--@describe 审核管理
-->
<template>
  <div class="audit-container">
    <div class="audit-show">
      <index-show :params-data="paramsData" @view="viewCall"/>
    </div>
    <div class="audit-content">
      <el-card>
        <div slot="header" class="card-header">
          <div class="header-left">
            {{ stateType | auditStateType }}审核
          </div>
          <div class="header-right">
            <el-button type="primary" size="mini" @click="handleStatePass">通过</el-button>
            <el-button type="danger" size="mini" @click="handleStateReject">驳回</el-button>
          </div>
        </div>
        <div class="card-content">
          <el-form :modal="auditData" label-width="70px">
            <el-form-item label="审核意见" prop="content">
              <el-input v-model="auditData.content" :autosize="{minRows: 3, maxRows: 6}" type="textarea" placeholder="请输入审核意见"/>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import IndexShow from './show'
import { programmeDepExamine, programmeAdminExamine } from '@/api/auditManagement'
export default {
  name: 'Audit',
  components: { IndexShow },
  props: {
    paramsData: {
      type: [Object, String],
      required: false,
      default: ''
    }
  },
  data() {
    return {
      auditData: {
        id: '',
        state: '',
        content: ''
      },
      stateType: ''
    }
  },
  created() {
    this.init()
  },
  methods: {
    // 初始化
    init() {
      const paramsData = this.paramsData
      if (paramsData.state === 'dep_adopt') {
        this.stateType = paramsData.state
      } else {
        this.stateType = paramsData.state
      }
    },
    // 接受子组件传递过来的信息
    viewCall(view, data) {
      this.backList(view)
    },
    // 返回列表
    backList(view) {
      console.log(view)
      this.$emit('view', view)
    },
    // 审核通过
    handleStatePass() {
      this.auditData.id = this.paramsData.id
      console.log(this.stateType)
      if (this.stateType === 'report') { // 部门负责人审核
        this.auditData.state = 'dep_adopt'
        programmeDepExamine(this.auditData).then(res => {
          if (res) {
            this.$message({
              type: res.status.error ? 'error' : 'success',
              message: (res.status.msg || '审核通过') + '!'
            })
            this.backList('list')
          } else {
            this.$message({
              type: 'error',
              message: '审核失败，请重试!'
            })
          }
        })
      } else { // 分管领导审核
        this.auditData.state = 'publish'
        programmeAdminExamine(this.auditData).then(res => {
          if (res) {
            this.$message({
              type: res.status.error ? 'error' : 'success',
              message: (res.status.msg || '审核通过') + '!'
            })
            this.backList('list')
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
      this.auditData.id = this.paramsData.id
      if (this.stateType === 'report') {
        this.auditData.state = 'dep_reject'
        programmeDepExamine(this.auditData).then(res => {
          if (res) {
            this.$message({
              type: res.status.error ? 'error' : 'success',
              message: (res.status.msg || '驳回成功') + '!'
            })
            this.backList('list')
          } else {
            this.$message({
              type: 'error',
              message: '驳回失败，请重试!'
            })
          }
        })
      } else { // 分管领导审核
        this.auditData.state = 'admin_reject'
        programmeAdminExamine(this.auditData).then(res => {
          if (res) {
            this.$message({
              type: res.status.error ? 'error' : 'success',
              message: (res.status.msg || '驳回成功') + '!'
            })
            this.backList('list')
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
