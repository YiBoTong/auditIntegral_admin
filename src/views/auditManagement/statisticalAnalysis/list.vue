<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 字典管理列表
-->
<template>
  <table-layout :has-left="hasDepTree">
    <org-tree slot="left" @click="departmentClick" @load="loadDep"/>
    <el-row slot="top" :gutter="10">
      <el-col :span="12">
        <template v-if="showType==='detailed'">
          <el-button type="primary" @click="showTypeCall('')">查看明细</el-button>
          <el-button type="text">总罚款：{{ detailedTotal.sumMoney | numberConvert }}</el-button>
          <el-button type="text">总积分：{{ detailedTotal.sumScore | numberConvert }}</el-button>
        </template>
        <el-button v-else type="primary" @click="showTypeCall('detailed')">单条统计</el-button>
      </el-col>
      <el-col :span="12" align="right">
        <el-form
          v-model="search"
          :inline="true">
          <el-form-item v-if="showType==='detailed'" label="姓名:">
            <el-input
              v-model="search.userName"
              placeholder="请输入人员姓名"
              prefix-icon="el-icon-search"
              clearable/>
          </el-form-item>
          <el-form-item v-else label="项目名称:">
            <el-input
              v-model="search.projectName"
              placeholder="请输入项目名称"
              prefix-icon="el-icon-search"
              clearable/>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              plain
              @click="getListData">搜索
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <template>
      <statistical-detailed-table v-loading="tableLoading" v-if="showType==='detailed'" :list-data="listData"/>
      <statistical-analysis-table v-loading="tableLoading" v-else :list-data="listData"/>
    </template>
    <pagination
      slot="pager"
      :total="paginationPage.total"
      :page="paginationPage.page"
      :limit="paginationPage.size"
      :page-sizes="pageSizes"
      @pagination="paginationEmit"/>
  </table-layout>
</template>
<script>
/* 当前组件必要引入 */
import { statisticalList, getStatisticalDetailed, getDetailedTotal } from '@/api/auditManagement'
import Pagination from '@/components/Pagination/index'
import OrgTree from '@/components/OrgTree/index'
import TableLayout from '@/components/TableLayout/TableLayout'
import StatisticalDetailedTable from './components/detailedInfo'
import StatisticalAnalysisTable from './components/tableInfo'

export default {
  name: 'StatisticalAnalysisList',
  components: { StatisticalDetailedTable, StatisticalAnalysisTable, OrgTree, TableLayout, Pagination },
  // props: [],
  data() {
    return {
      showType: 'detailed',
      visible: false,
      width: '',
      title: '',
      tableLoading: false,
      programme: '',
      listData: null,
      stateForm: {
        id: '',
        state: ''
      },
      paginationPage: {
        total: 0,
        page: 1,
        size: 20
      },
      pageSizes: [10, 20, 30, 40, 50],
      search: {
        projectName: '',
        queryDepartmentId: '',
        userName: ''
      },
      dictionaries: [],
      loadDetailedTotal: false,
      detailedTotal: {
        sumMoney: 0,
        sumScore: 0
      }
    }
  },
  created() {
    this.init()
  },
  mounted() {
  },
  activated() {},
  methods: {
    // 初始化
    init() {},
    showTypeCall(type) {
      this.showType = type
      if (!type) {
        this.search.projectName = ''
        this.loadDetailedTotal = false
      } else {
        this.search.userName = ''
      }
      this.getListData()
    },
    // 获取数据 搜索
    getListData() {
      this.tableLoading = true
      this.search.queryDepartmentId = this.department.id
      if (this.showType === 'detailed') {
        this.getStatisticalDetailedCall()
      } else {
        this.statisticalListCall()
      }
    },
    getDetailedTotal() {
      getDetailedTotal({ search: this.search }).then(res => {
        if (!res.status.error) {
          this.detailedTotal = res.data
        } else {
          this.$message.error(res.status.msg)
        }
        this.tableLoading = false
      })
    },
    getStatisticalDetailedCall() {
      getStatisticalDetailed({ page: this.paginationPage, search: this.search }).then(res => {
        if (!res.status.error) {
          this.listData = res.data || []
          this.paginationPage = res.page
        } else {
          this.$message.error(res.status.msg)
        }
        this.tableLoading = false
      })
      this.getDetailedTotal()
    },
    statisticalListCall() {
      statisticalList({ page: this.paginationPage, search: this.search }).then(res => {
        if (!res.status.error) {
          this.listData = res.data || []
          this.paginationPage = res.page
        } else {
          this.$message.error(res.status.msg)
        }
        this.tableLoading = false
      })
    },
    // 分页子组件传递过来的信息
    paginationEmit(paginationInfo) {
      this.paginationPage.page = paginationInfo.page
      this.paginationPage.size = paginationInfo.limit
      this.getListData()
    }
  }
}
</script>
