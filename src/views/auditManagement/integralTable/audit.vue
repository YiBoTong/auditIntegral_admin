<!--
****--@date     2019-01-04 17:23
****--@author   XXL
****--@describe 积分表审核
-->
<template>
  <div class="integral-audit-container">
    <integral-show :params-data="paramsData" @view="viewCall"/>
    <el-card>
      <div slot="header">
        审核意见
      </div>
      <div>
        <el-input v-model="authorData.suggestion" type="textarea" placeholder="请输入审核意见"/>
      </div>
      <div>
        <div class="submit-button">
          <el-button :loading="buttonLoading" type="success" size="small" @click="editIntegralAuthor('adopt')">通过</el-button>
          <el-button :loading="buttonLoading" type="danger" size="small" @click="editIntegralAuthor('reject')">驳回</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import IntegralShow from './show'
import { editAuthor, getIntegral } from '@/api/auditManagement'
export default {
  name: 'IntegralAudit',
  components: { IntegralShow },
  props: {
    paramsData: {
      type: [Object, String],
      required: false,
      default: ''
    }
  },
  data() {
    return {
      buttonLoading: false,
      view: 'list',
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
    // 返回
    viewCall() {
      this.$emit('view', 'list')
    },
    // 审核意见
    editIntegralAuthor(val) {
      this.buttonLoading = true
      this.authorData.state = val
      editAuthor(this.authorData).then(res => {
        if (!res.status.error) {
          this.$message({ type: 'success', message: res.status.msg })
          this.buttonLoading = false
          this.viewCall()
        } else {
          this.buttonLoading = false
          this.$message({ type: 'error', message: res.status.msg })
        }
      })
    },
    // 获取详情
    getIntegralData() {
      const id = this.paramsData.id
      getIntegral({ id }).then(res => {
        if (!res.status.error) {
          const data = res.data
          this.authorData.changeScoreId = data.changeScore.id
        } else {
          this.$message({ type: 'error', message: res.status.msg })
        }
      })
    }
  }
}
</script>
