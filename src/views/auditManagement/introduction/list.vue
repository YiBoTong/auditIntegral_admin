<!--
****--@date     2019-01-12 22:28
****--@author   XXL
****--@describe 介绍信列表
-->
<template>
  <table-layout>
    <el-row slot="top" :gutter="10">
      <el-col align="right">
        <el-form
          v-model="search"
          :inline="true">
          <el-form-item label="项目名称:">
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
    <el-table
      v-loading="tableLoading"
      :data="listData"
      :cell-style="cellStyle"
      height="100%"
      @cell-click="cellClick">
      <el-table-column
        prop="projectName"
        show-overflow-tooltip
        label="项目名称" />
      <el-table-column
        prop="programmeTitle"
        show-overflow-tooltip
        label="方案标题" />
      <el-table-column
        prop="queryDepartmentName"
        show-overflow-tooltip
        label="被检查机构">
        <template slot-scope="scope">
          {{ scope.row.queryDepartmentName || "—" }}
        </template>
      </el-table-column>
      <el-table-column
        prop="departmentName"
        show-overflow-tooltip
        label="检查机构" >
        <template slot-scope="scope">
          {{ scope.row.departmentName || "—" }}
        </template>
      </el-table-column>
      <el-table-column
        prop="number"
        show-overflow-tooltip
        label="编号" >
        <template slot-scope="scope">
          {{ scope.row.year | numbers(scope.row.number) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="queryStartTime"
        show-overflow-tooltip
        label="检查开始日期">
        <template slot-scope="scope">
          {{ scope.row.queryStartTime || '—' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="queryEndTime"
        show-overflow-tooltip
        label="检查结束时间">
        <template slot-scope="scope">
          {{ scope.row.queryEndTime || '—' }}
        </template>
      </el-table-column>
    </el-table>
    <pagination
      slot="pager"
      :total="paginationPage.total"
      :page="paginationPage.page"
      :limit="paginationPage.size"
      :page-sizes="pageSizes"
      @pagination="paginationEmit" />
  </table-layout>
</template>
<script>
/* 当前组件必要引入 */
import { introductionList } from '@/api/auditManagement'
import Pagination from '@/components/Pagination/index'
import TableLayout from '../../../components/TableLayout/TableLayout'

export default {
  name: 'DictionaryManagementList',
  components: { TableLayout, Pagination },
  // props: [],
  data() {
    return {
      tableLoading: false,
      listData: [],
      paginationPage: {
        total: 0,
        page: 1,
        size: 20
      },
      pageSizes: [10, 20, 30, 40, 50],
      search: {
        'projectName': '',
        'state': ''
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
    init() {
      this.getListData()
    },
    // 获取数据 搜索
    getListData() {
      this.tableLoading = true
      introductionList({ page: this.paginationPage, search: this.search }).then(res => {
        if (!res.status.error) {
          this.listData = res.data || []
          this.paginationPage = res.page
        } else {
          this.$message.error(res.status.msg)
        }
        this.tableLoading = false
      })
    },
    // 点击查看
    cellClick(row, column, cell, event) {
      if (column.property === 'projectName') {
        console.log(row)
        this.selectRoute('introduction', 'view', row)
      } else {
        return ''
      }
    },
    // 设置单元格style
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return 'color:#409EFF;cursor: pointer;'
      } else {
        return ''
      }
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
