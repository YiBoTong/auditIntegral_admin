<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 整改通知列表
-->
<template>
  <table-layout :has-left="hasDepTree">
    <org-tree slot="left" @click="departmentClick" @load="loadDep"/>
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
        label="检查项目"
        show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.projectName || '—' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="departmentName"
        label="检查单位"
        show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.departmentName || '—' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="queryDepartmentName"
        show-overflow-tooltip
        label="被检查单位">
        <template slot-scope="scope">
          {{ scope.row.queryDepartmentName || '—' }}
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
        label="检查开始时间">
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
      <el-table-column
        v-if="authorEdit"
        prop="date"
        label="操作"
        align="center"
        width="140">
        <template slot-scope="scope">
          <!--填写意见-->
          <el-button
            :disabled="scope.row.state!=='draft' || !~[0,loginUserId].indexOf(scope.row.authorId)"
            type="text"
            size="small"
            @click="selectRoute('rectifyNotice','edit',scope.row,scope.row)">填写意见
          </el-button>
          <!--填写报告 todo 是进入整改报告模块下填写-->
          <el-button
            :disabled="((!!scope.row.rectifyReportId && scope.row.reportState!=='draft') || scope.row.state==='draft') || scope.row.reportState=='publish' || !~[0,loginUserId].indexOf(scope.row.authorId)"
            type="text"
            size="small"
            @click="selectRoute('rectifyReport','edit',scope.row,scope.row)">填写报告
          </el-button>
        </template>
      </el-table-column>
    </el-table>
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
import Pagination from '@/components/Pagination/index'
import { rectifyList } from '@/api/auditManagement'
import OrgTree from '@/components/OrgTree/index'
import TableLayout from '@/components/TableLayout/TableLayout'

export default {
  name: 'RectifyNoticeList',
  components: { OrgTree, TableLayout, Pagination },
  // props: [],
  data() {
    return {
      self: this,
      tableLoading: false,
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
        queryDepartmentId: ''
      },
      dictionaries: []
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
      // 鉴权
      this.getAuthorEdit(this.$route)
    },
    // 获取数据 搜索
    getListData() {
      this.tableLoading = true
      this.search.queryDepartmentId = this.department.id
      rectifyList({ page: this.paginationPage, search: this.search }).then(res => {
        if (!res.status.error) {
          this.listData = res.data || []
          this.paginationPage = res.page
          this.tableLoading = false
        } else {
          this.$message.error(res.status.msg)
          this.tableLoading = false
        }
      })
    },
    // 设置单元格style
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return 'color:#409EFF;cursor: pointer;'
      } else {
        return ''
      }
    },
    // 点击查看
    cellClick(row, column, cell, event) {
      if (column.property === 'projectName') {
        this.selectRoute('rectifyNotice', 'view', row)
        console.log(row)
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
