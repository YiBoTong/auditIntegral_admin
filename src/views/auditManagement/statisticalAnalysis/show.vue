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
        <el-button @click="backList">返回列表</el-button>
      </div>
    </div>
    <el-row :gutter="10">
      <el-col
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
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 12}"
        :lg="{span: 12}"
        :xl="{span: 12}">
        <ve-radar
          :extend="{
            title:{
              text:'人员违规行为分布',
              top: '40px',
              right: '10%',
            },
            legend:{
              type:'scroll',
              bottom:'5%'
            }
          }"
          :data="raderChartData"/>
      </el-col>
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 12}"
        :lg="{span: 12}"
        :xl="{span: 12}">
        <ve-ring
          :extend="{
            title:{
              text:'人员违规占比',
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
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 10, offset:1}"
        :lg="{span: 10, offset:1}"
        :xl="{span: 10, offset:1}">
        <ve-histogram
          :extend="{
            title:{
              text:'人员违规情况',
              top: '40px',
              right: '5%',
            },
            legend:{
              type:'scroll',
              bottom:'5%'
            }
          }"
          :data="histogramChartData"/>
      </el-col>
    </el-row>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { getStatistical } from '@/api/auditManagement'

export default {
  name: 'DictionaryManagementInput',
  components: { },
  props: {
    paramsData: {
      type: [Object, String],
      required: false,
      default: ''
    }
  },
  data() {
    return {
      depVisible: false,
      CheckVisible: false,
      ReviewVisible: false,
      chartData: {
        columns: ['业务', '数量'],
        rows: [
          { '业务': '业务1', '数量': 1 },
          { '业务': '业务2', '数量': 1 },
          { '业务': '业务3', '数量': 1 }
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
        columns: ['行为', '小张', '小王', '小明'],
        rows: [
          { '行为': '违规行为1', '小张': 1, '小王': 2, '小明': 3 },
          { '行为': '违规行为2', '小张': 3, '小王': 0, '小明': 2 },
          { '行为': '违规行为3', '小张': 2, '小王': 1, '小明': 0 }
        ]
      },
      ringChartData: {
        columns: ['姓名', '分数'],
        rows: [
          { '姓名': '小张', '分数': 1.1 },
          { '姓名': '小王', '分数': 0.8 },
          { '姓名': '小明', '分数': 1.4 }
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
      this.getStatistical(this.paramsData.id)
    },
    // 返回列表
    backList() {
      this.$emit('view', 'list')
    },
    // 获取底稿
    getStatistical(id) {
      getStatistical({ id }).then(res => {
        if (!res.status.error) {
          const data = res.data
          console.log(data)
        } else {
          // this.$message({
          //   type: 'error',
          //   message: res.status.msg + '!'
          // })
        }
      })
    }
  }
}

</script>
