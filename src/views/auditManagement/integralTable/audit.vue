<!--
****--@date     2019-01-04 17:23
****--@author   XXL
****--@describe 积分表审核
-->
<template>
  <el-card>
    <el-row slot="header" :gutter="10" class="card-header">
      <el-col :span="12">
        <el-button type="text" disabled>审核积分表</el-button>
      </el-col>
      <el-col :span="12" align="right">
        <el-button type="text" @click="backList">返回列表</el-button>
      </el-col>
    </el-row>
    <show-score-info v-loading="dataLoading" :form-data="fromData"/>
    <br>
    <br>
    <hr>
    <br>
    <el-form ref="form" :model="authorData" label-width="40px">
      <el-form-item label="意见">
        <el-input :autosize="{minRows:3}" v-model="authorData.suggestion" type="textarea" placeholder="请输入审核意见"/>
      </el-form-item>
    </el-form>
    <div align="center">
      <el-button :loading="buttonLoading" type="success" size="small" @click="editIntegralAuthor('adopt')">通过</el-button>
      <el-button :loading="buttonLoading" type="danger" size="small" @click="editIntegralAuthor('reject')">驳回</el-button>
    </div>
  </el-card>
</template>
<script>
import ShowScoreInfo from './scoreInfo'
/* 当前组件必要引入 */
import IntegralShow from './show'
import { editAuthor, getIntegral } from '@/api/auditManagement'
export default {
  name: 'IntegralAudit',
  components: { ShowScoreInfo, IntegralShow },
  // props: {},
  data() {
    return {
      dataLoading: false,
      view: 'list',
      fromData: {},
      authorData: {
        'changeScoreId': '',
        'state': '',
        'suggestion': ''
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
      this.getIntegralData()
    },
    // 审核意见
    editIntegralAuthor(val) {
      this.authorData.state = val
      editAuthor(this.authorData).then(res => {
        if (!res.status.error) {
          this.$message({ type: 'success', message: res.status.msg })
          this.backList('integralTable')
        } else {
          this.$message({ type: 'error', message: res.status.msg })
        }
      })
    },
    // 获取详情
    getIntegralData() {
      this.dataLoading = true
      const { id } = this.$route.query
      getIntegral({ id }).then(res => {
        if (!res.status.error) {
          const data = res.data
          this.authorData.changeScoreId = data.changeScore.id
          this.fromData = data
        } else {
          this.$message({ type: 'error', message: res.status.msg })
        }
        this.dataLoading = false
      })
    }
  }
}
</script>
