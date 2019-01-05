<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 字典管理列表
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
              v-model="search.title"
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
      :data="listData"
      :cell-style="cellStyle"
      height="100%"
      @cell-click="cellClick">
      <el-table-column
        prop="userName"
        label="通知人">
        <template slot-scope="scope">
          {{ scope.row.userName || '—' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="projectName"
        label="项目名称">
        <template slot-scope="scope">
          {{ scope.row.projectName || '—' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="programmeTitle"
        label="方案名称">
        <template slot-scope="scope">
          {{ scope.row.programmeTitle || '—' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="queryDepartmentName"
        label="查询机构名称">
        <template slot-scope="scope">
          {{ scope.row.queryDepartmentName || '—' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="departmentName"
        show-overflow-tooltip
        label="被查询机构名称">
        <template slot-scope="scope">
          {{ scope.row.departmentName || '—' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="time"
        align="center"
        show-overflow-tooltip
        label="检查日期">
        <template slot-scope="scope">
          {{ scope.row.time | fmtDate('yyyy年MM月dd日') }}
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="操作"
        align="center">
        <template slot-scope="scope">
          <!--<el-button-->
          <!--:disabled="scope.row.id < 0"-->
          <!--type="text"-->
          <!--size="small"-->
          <!--@click="handleState(scope.row)">发布-->
          <!--</el-button>-->
          <el-button
            :disabled="scope.row.state !== 'draft'"
            type="text"
            size="small"
            @click="handelEditAction(scope.row)">填写违规行为
          </el-button>
          <el-button
            :disabled="scope.row.state !== 'jh_draft'"
            type="text"
            size="small"
            @click="handelEdit(scope.row,'score')">填写分数
          </el-button>
          <el-button
            :disabled="scope.row.state !== 'ld_draft'"
            type="text"
            size="small"
            @click="handelEdit(scope.row,'author')">领导签署
          </el-button>
          <el-button
            :disabled="scope.row.state !== 'bgs_draft'"
            type="text"
            size="small"
            @click="handelEdit(scope.row,'number')">填写编号
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
import { punishNoticeList } from '@/api/auditManagement'
import TableLayout from '../../../components/TableLayout/TableLayout'

export default {
  name: 'PunishNoticeList',
  components: { TableLayout, Pagination },
  // props: [],
  data() {
    return {
      self: this,
      listLoading: false,
      listData: [],
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
        'title': ''
      },
      dictionaries: []
    }
  },
  created() {
    this.init()
  },
  mounted() {
  },
  activated() {
    this.getListData()
  },
  methods: {
    // 初始化
    init() {
      this.getListData()
    },
    // 获取数据 搜索
    getListData() {
      punishNoticeList({ page: this.paginationPage, search: this.search }).then(res => {
        this.listData = res.data || []
        this.paginationPage = res.page
      })
    },
    // 填写违规行为
    handelEditAction(obj) {
      this.publishSubscribe('edit', obj)
    },
    // 修改 或 创建
    handelEdit(obj, editType) {
      obj['editType'] = editType
      this.publishSubscribe('input', obj)
    },
    // 向父组件传递信息
    publishSubscribe(type, obj) {
      this.$emit('view', type, obj)
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
      console.log(column)
      if (column.property === 'userName') {
        this.publishSubscribe('show', row)
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
