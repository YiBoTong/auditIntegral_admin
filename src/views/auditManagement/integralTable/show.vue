<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 创建修改
-->
<template>
  <!--积分表-->
  <el-card>
    <el-row slot="header" :gutter="10" class="card-header">
      <el-col :span="12">
        <el-button type="text" disabled>分数详情</el-button>
      </el-col>
      <el-col :span="12" align="right">
        <el-button type="text" @click="backList('integralTable')">返回列表</el-button>
      </el-col>
    </el-row>
    <show-score-info v-loading="dataLoading" :form-data="formData"/>
  </el-card>
</template>
<script>
/* 当前组件必要引入 */
import { getIntegral } from '@/api/auditManagement'
import ShowScoreInfo from './scoreInfo'
export default {
  name: 'IndexEdit',
  components: { ShowScoreInfo },
  // props: {},
  data() {
    return {
      dataLoading: false,
      programmeData: [],
      fileList: [],
      formData: {},
      todoType: 'Add'
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
    // 获取积分通知书
    getIntegralData() {
      this.dataLoading = true
      const { id } = this.$route.params
      getIntegral({ id }).then(res => {
        if (!res.status.error) {
          this.formData = res.data
        } else {
          this.$message({
            type: 'error',
            message: res.status.msg + '!'
          })
        }
        this.dataLoading = false
      })
    }
  }
}
</script>
