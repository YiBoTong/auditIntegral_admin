<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 查看整改报告
-->
<template>
  <div class="report-container">
    <report-show :params-data="paramsData" :show-top="showTop"/>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import ReportShow from '../rectifyNotice/report/show'
export default {
  name: 'RectifyNoticeReport',
  components: { ReportShow },
  // props: {},
  data() {
    return {
      content: '',
      todoType: '',
      fileList: [],
      visible: false,
      showCheckbox: true,
      showTop: true,
      paramsData: null
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
      this.paramsData = this.$route.params
    }
  }
}
</script>
