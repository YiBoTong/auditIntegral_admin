<template>
  <div class="dashboard-editor-container">

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32">
      <el-col
        :xs="24"
        :sm="24"
        :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
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
        <transaction-table />
      </el-col>
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 24}"
        :lg="{span: 12}"
        :xl="{span: 12}"
        style="margin-bottom:30px;">
        <transaction-table />
      </el-col>
    </el-row>

  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import BoxCard from './components/BoxCard'

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
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    BoxCard
  },
  data() {
    return {
      lineChartData: {
        expectedData: [],
        actualData: []
      }
    }
  },
  methods: {
    handleSetLineChartData(type) {
      if (!lineChartData[type].expectedData.length) {
        '1'.repeat(12).split('').map((v, i) => {
          if (i < new Date().getMonth() + 1) {
            lineChartData[type].expectedData.push(Math.floor(Math.random() * 3 + (12 - i) * 0.6))
          }
          lineChartData[type].actualData.push(Math.floor(Math.random() * 3 + (12 - i) * 1.6))
        })
      }
      this.lineChartData = lineChartData[type]
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
