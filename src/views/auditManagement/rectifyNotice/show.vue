<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 查看整改通知
-->
<template>
  <div
    class="rectify-show-container">
    <div class="show-header">
      <el-row>
        <el-col :span="12">
          <el-button @click="selectRoute('rectifyNotice','view',paramsData)">整改通知书</el-button>
          <el-button v-if="showButton" @click="selectRoute('rectifyReport','view',paramsData)">整改报告</el-button>
          <el-button v-if="showButton" @click="selectRoute('rectifyNotice','contrast',paramsData)">整改对比</el-button>
        </el-col>
        <el-col :span="12" align="right">
          <el-button @click="backList('rectifyNotice')">返回列表</el-button>
        </el-col>
      </el-row>
    </div>
    <br>
    <keep-alive>
      <rectify-notice-show v-if="show==='notice'" :params-data="paramsData" @showButton="ifShowButton"/>
    </keep-alive>
    <keep-alive>
      <report-show v-if="show==='report'" :params-data="paramsData" :show-top="showTop"/>
    </keep-alive>
    <keep-alive>
      <contrast-show v-if="show==='contrast'" :params-data="paramsData"/>
    </keep-alive>
  </div>
</template>
<script>
import ContrastShow from './contrast/show'
/* 当前组件必要引入 */
import RectifyNoticeShow from './rectifyNotice/show'
import ReportShow from './report/show'

export default {
  name: 'DictionaryManagementInput',
  components: { ContrastShow, ReportShow, RectifyNoticeShow },
  // props: {},
  data() {
    return {
      loading: false,
      buttonLoading: false,
      show: 'notice',
      viewData: {
        draft: {
          departmentName: '',
          time: ''
        },
        suggest: ''
      },
      behaviorContent: [],
      showTop: false,
      showButton: false,
      paramsData: null
    }
  },
  computed: {},
  created() {
    this.init()
  },
  mounted() {
  },
  methods: {
    // 初始化
    init() {
      this.paramsData = this.$route.params
    },
    // 是否显示顶部后两个button
    ifShowButton(val) {
      console.log(val)
      if (val !== 0) {
        this.showButton = true
      } else {
        this.showButton = false
      }
    }
  }
}
</script>
