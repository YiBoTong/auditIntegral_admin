<template>
  <div class="dashboard-editor-container">

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row v-loading="lineChartLoading" style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <!--进度-->
    <el-row>
      <progress-show/>
    </el-row>

    <!--我的待办-->
    <el-row style="background:#fff;margin-bottom:32px;">
      <todo-list/>
    </el-row>

    <el-row :gutter="32">
      <el-col
        :xs="24"
        :sm="24"
        :lg="8">
        <div v-loading="loadCharting" class="chart-wrapper">
          <raddar-chart v-if="!loadCharting" :show-data="departmentData"/>
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :lg="8">
        <div v-loading="loadCharting" class="chart-wrapper">
          <pie-chart v-if="!loadCharting" :show-data="behaviorData"/>
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :lg="8">
        <div v-loading="loadCharting" class="chart-wrapper">
          <bar-chart v-if="!loadCharting" :show-data="scoreData"/>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 24}"
        :lg="{span: 12}"
        :xl="{span: 12}"
        style="padding-right:8px;margin-bottom:30px;">
        <confirmation-table/>
      </el-col>
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 24}"
        :lg="{span: 12}"
        :xl="{span: 12}"
        style="margin-bottom:30px;">
        <rectify-notice-table/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import ConfirmationTable from './components/confirmationTable'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import RectifyNoticeTable from './components/rectifyNoticeTable'
import TransactionTable from './components/TransactionTable'
import BoxCard from './components/BoxCard'
import { getStatisticalTopDepartment } from '@/api/auditManagement'
import TodoList from '@/components/TodoList/index'
import ProgressShow from './components/ProgressShow'

const lineChartData = {
  integral: {
    expectedData: [],
    actualData: []
  },
  behavior: {
    expectedData: [],
    actualData: []
  },
  confirmation: {
    expectedData: [],
    actualData: []
  },
  notice: {
    expectedData: [],
    actualData: []
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    RectifyNoticeTable,
    ConfirmationTable,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    BoxCard,
    TodoList,
    ProgressShow
  },
  data() {
    return {
      lineChartData: {
        expectedData: [],
        actualData: []
      },
      lineChartLoading: true,
      loadCharting: true,
      departmentData: [],
      scoreData: [],
      behaviorData: []
    }
  },
  created() {
    this.getStatisticalTopDepartment()
  },
  methods: {
    handleSetLineChartData(type, data = []) {
      const keyIndex = ['expectedData', 'actualData']
      if (!lineChartData[type].expectedData.length) {
        data.map((item, index) => {
          item.info.map(iItem => lineChartData[type][keyIndex[index]].push(iItem.num))
        })
      }
      this.lineChartLoading = false
      this.lineChartData = lineChartData[type]
    },
    getStatisticalTopDepartment() {
      getStatisticalTopDepartment().then(res => {
        this.departmentData = res.data.department
        this.scoreData = res.data.score
        this.behaviorData = res.data.behavior
        this.loadCharting = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
