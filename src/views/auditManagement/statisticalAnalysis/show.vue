<!--
****--@date     2018-12-24 18:00
****--@author   XXL
****--@describe show
-->
<template>
  <div
    class="manuscript-show-container">
    <div class="form-header">
      <div class="header-left">
        <el-button @click="backList('statisticalAnalysis')">返回列表</el-button>
      </div>
    </div>
    <el-row :gutter="10">
      <el-col
        v-loading="chartLoading"
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 12}"
        :lg="{span: 12}"
        :xl="{span: 12}">
        <ve-pie
          :extend="{
            title:{
              text:'业务范围',
              top: '40px',
              left: '10%',
            },
            legend:{
              type:'scroll',
              bottom:'5%'
            }
          }"
          :data="chartData"
          :settings="{dataType: 'percent'}"
          :option="{title:'稽核业务范围'}"/>
      </el-col>
      <!--<el-col-->
      <!--:xs="{span: 24}"-->
      <!--:sm="{span: 24}"-->
      <!--:md="{span: 12}"-->
      <!--:lg="{span: 12}"-->
      <!--:xl="{span: 12}">-->
      <!--<ve-radar-->
      <!--:extend="{-->
      <!--title:{-->
      <!--text:'人员违规行为分布',-->
      <!--top: '40px',-->
      <!--right: '10%',-->
      <!--},-->
      <!--legend:{-->
      <!--type:'scroll',-->
      <!--bottom:'5%'-->
      <!--}-->
      <!--}"-->
      <!--:data="raderChartData"/>-->
      <!--</el-col>-->
      <el-col
        v-loading="ringChartLoading"
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 12}"
        :lg="{span: 12}"
        :xl="{span: 12}">
        <ve-ring
          :extend="{
            title:{
              text:'人员扣分占比',
              top: '40px',
              left: '10%',
            },
            legend:{
              type:'scroll',
              bottom:'5%'
            }
          }"
          :data="ringChartData"/>
      </el-col>
      <el-col
        v-loading="ringChartLoading"
      >
        <ve-histogram
          :extend="{
            title:{
              text:'人员罚款情况',
              top: '40px',
              right: '5%',
            },
            legend:{
              type:'scroll',
              bottom:'5%'
            }
          }"
          :settings="histogramSettings"
          :data="histogramChartData"/>
      </el-col>
    </el-row>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { getStatistical, getStatisticalDraftTotal } from '@/api/auditManagement'
import { numberConvert } from '../../../filters'

export default {
  name: 'DictionaryManagementInput',
  components: {},
  // props: {},
  data() {
    return {
      paramsData: null,
      chartLoading: true,
      ringChartLoading: true,
      histogramSettings: {
        showLine: ['数量']
      },
      chartData: {
        columns: ['业务', '数量'],
        rows: [
          // { '业务': '业务1', '数量': 1 },
          // { '业务': '业务2', '数量': 1 },
          // { '业务': '业务3', '数量': 1 }
        ]
      },
      raderChartData: {
        columns: ['姓名', '违规行为1', '违规行为2', '违规行为3'],
        rows: [
          { '姓名': '小张', '违规行为1': 0, '违规行为2': 1, '违规行为3': 1 },
          { '姓名': '小王', '违规行为1': 1, '违规行为2': 0, '违规行为3': 2 },
          { '姓名': '小明', '违规行为1': 0, '违规行为2': 0, '违规行为3': 1 }
        ]
      },
      histogramChartData: {
        columns: ['姓名', '金额', '数量'],
        rows: [
          // { '姓名': '小张', '金额': 1, '数量': 2 },
          // { '姓名': '小王', '金额': 3, '数量': 1 },
          // { '姓名': '小明', '金额': 2, '数量': 4 }
        ]
      },
      ringChartData: {
        columns: ['姓名', '分数'],
        rows: [
          // { '姓名': '小张', '分数': 1.1 },
          // { '姓名': '小王', '分数': 0.8 },
          // { '姓名': '小明', '分数': 1.4 }
        ]
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
      this.paramsData = this.$route.params
      this.getStatistical(this.paramsData.id)
      this.getStatisticalDraftTotal(this.paramsData.draftId)
    },
    getStatisticalDraftTotal(draftId) {
      getStatisticalDraftTotal({ draftId }).then(res => {
        if (!res.status.error) {
          const data = res.data
          const histogramChartData = {}
          const ringChartData = {}
          data.score = data.score.filter(item => !!item.userId)
          data.behavior = data.behavior.filter(item => !!item.userId)
          data.score.map(item => {
            if (!histogramChartData[item.userId]) {
              histogramChartData[item.userId] = { '姓名': item.userName, '金额': 0, '数量': 0 }
            }
            if (!ringChartData[item.userId]) {
              ringChartData[item.userId] = { '姓名': item.userName, '分数': 0 }
            }
            histogramChartData[item.userId]['金额'] = numberConvert(item.money)
            ringChartData[item.userId]['分数'] = numberConvert(item.score)
          })
          data.behavior.map(item => {
            if (!histogramChartData[item.userId]) {
              histogramChartData[item.userId] = { '姓名': item.userName, '金额': 0, '数量': 0 }
            }
            if (!ringChartData[item.userId]) {
              ringChartData[item.userId] = { '姓名': item.userName, '分数': 0 }
            }
            histogramChartData[item.userId]['数量'] = item.num
            ringChartData[item.userId]['分数'] = 0
          })
          const histogramChartDataArr = []
          const ringChartDataArr = []
          Object.keys(histogramChartData).map(item => histogramChartDataArr.push(histogramChartData[item]))
          Object.keys(ringChartData).map(item => ringChartDataArr.push(ringChartData[item]))
          this.histogramChartData.rows = histogramChartDataArr
          this.ringChartData.rows = ringChartDataArr
          this.ringChartLoading = false
        } else {
          this.$message({
            type: 'error',
            message: res.status.msg + '!'
          })
        }
        this.chartLoading = false
      })
    },
    // 获取底稿
    getStatistical(id) {
      this.chartLoading = true
      getStatistical({ id }).then(res => {
        if (!res.status.error) {
          const data = res.data
          data.businessList.map(item => {
            this.chartData.rows.push({ '业务': item.content, '数量': 1 })
          })
        } else {
          this.$message({
            type: 'error',
            message: res.status.msg + '!'
          })
        }
        this.chartLoading = false
      })
    }
  }
}

</script>
