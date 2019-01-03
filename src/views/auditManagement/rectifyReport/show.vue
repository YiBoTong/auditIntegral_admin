<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 添加 or 编辑
-->
<template>
  <div class="report-container">
    <div class="report-header">
      <div class="header-left">
        <el-button @click="backList">返回列表</el-button>
      </div>
    </div>
    <report-show :params-data="paramsData"/>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import ReportShow from '../rectifyNotice/report/show'
export default {
  name: 'RectifyNoticeReport',
  components: { ReportShow },
  props: {
    paramsData: {
      type: [Object, String, Array],
      required: false,
      default: ''
    }
  },
  data() {
    return {
      content: '',
      todoType: '',
      fileList: [],
      visible: false,
      showCheckbox: true
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
      // const data = this.paramsData
    },
    // 返回列表
    backList() {
      this.$emit('view', 'list')
    }
  }
}
</script>
