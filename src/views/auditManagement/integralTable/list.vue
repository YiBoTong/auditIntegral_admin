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
          <el-form-item label="项目名称">
            <el-input
              v-model="search.projectName"
              placeholder="请输入检查项目"
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
        prop="projectName"
        show-overflow-tooltip
        label="项目名称" />
      <el-table-column
        prop="userName"
        show-overflow-tooltip
        label="责任人" />
      <el-table-column
        show-overflow-tooltip
        prop="cognizanceUserName"
        label="认定人" />
      <el-table-column
        show-overflow-tooltip
        prop="queryDepartmentName"
        label="被检查部门" />
      <el-table-column
        prop="departmentName"
        show-overflow-tooltip
        label="检查部门" />
      <el-table-column
        prop="score"
        show-overflow-tooltip
        label="分数">
        <template slot-scope="scope">
          {{ scope.row.score / 1000 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="number"
        show-overflow-tooltip
        label="文件号" />
      <el-table-column
        prop="time"
        align="center"
        show-overflow-tooltip
        label="生效日期" >
        <template slot-scope="scope">
          {{ scope.row.time || "—" }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="authorEdit"
        prop="date"
        label="操作"
        align="center"
        width="120px">
        <template slot-scope="scope">
          <el-button
            :disabled="!!scope.row.integralEditId && !~['draft','reject'].indexOf(scope.row.state)"
            type="text"
            size="small"
            @click="handelEditScore(scope.row)">修改分数
          </el-button>
          <el-button
            v-if="!!~writeRoules.indexOf('management')"
            :disabled="!scope.row.integralEditId || scope.row.state !== 'report'"
            type="text"
            size="small"
            @click="handelEditAudit(scope.row)">审核
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
      @pagination="paginationEmit" />
  </table-layout>
</template>
<script>
/* 当前组件必要引入 */
import Pagination from '@/components/Pagination/index'
import { integralList } from '@/api/auditManagement'
import TableLayout from '../../../components/TableLayout/TableLayout'

export default {
  name: 'IntegralList',
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
      // 鉴权
      this.getAuthorEdit(this.$route)
      this.getListData()
    },
    // 获取数据 搜索
    getListData() {
      integralList({ page: this.paginationPage, search: this.search }).then(res => {
        this.listData = res.data || []
        this.paginationPage = res.page
      })
    },
    // 修改分数
    handelEditScore(obj) {
      this.publishSubscribe('input', obj)
    },
    handelEditAudit(obj) {
      this.publishSubscribe('audit', obj)
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
      if (column.property === 'projectName') {
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
