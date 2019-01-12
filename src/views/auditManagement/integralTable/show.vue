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
        <el-button type="text">分数详情</el-button>
      </el-col>
      <el-col :span="12" align="right">
        <el-button type="text" @click="backList">返回列表</el-button>
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
      programmeData: [],
      fileList: [],
      // formData: {
      //   'projectName': '',
      //   'departmentName': '',
      //   'reviewName': '',
      //   'inspectName': '',
      //   'checkName': '',
      //   'programmeId': '',
      //   'queryDepartmentId': '',
      //   'departmentId': '',
      //   'number': '',
      //   'public': false,
      //   'type': '',
      //   'time': '',
      //   'state': 'draft',
      //   'queryUsers': '',
      //   'adminUsers': '',
      //   'inspectUsers': '',
      //   'fileIds': '',
      //   'contentList': [],
      //   'behaviorList': []
      // },
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
      this.getIntegralData(this.paramsData.id)
    },
    // 返回列表
    backList() {
      this.$emit('view', 'list')
    },
    // 获取积分通知书
    getIntegralData() {
      this.dataLoading = true
      const id = this.paramsData.id
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
