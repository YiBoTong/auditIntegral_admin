<!--
****--@date     2019-01-03 14:29
****--@author   XXL
****--@describe 审计报告列表
-->
<template>
  <div class="audit-report-list-container">
    <div class="list-top">
      <div class="top-right">
        <el-form
          v-model="search"
          :inline="true">
          <el-form-item label="项目名称">
            <el-input
              v-model="search.projectName"
              placeholder="请输入检查项目"
              prefix-icon="el-icon-search"
              clearable />
          </el-form-item>
          <el-button
            type="primary"
            plain
            @click="getListData">搜索
          </el-button>
        </el-form>
      </div>
    </div>
    <div class="public-table">
      <el-table
        :data="listData"
        :cell-style="cellStyle"
        height="100%"
        @cell-click="cellClick">
        <el-table-column
          prop="projectName"
          label="项目名称" />
        <el-table-column
          prop="number"
          label="编号" />
        <el-table-column
          prop="time"
          label="检查日期"/>
        <el-table-column
          prop="updateTime"
          show-overflow-tooltip
          label="更新时间" />
        <el-table-column
          prop="state"
          show-overflow-tooltip
          label="状态">
          <template slot-scope="scope">
            {{ scope.row.state | publicListState }}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button
              :disabled="scope.row.state === 'publish'"
              type="text"
              size="small"
              @click="handleEdit(scope.row)">填写审计报告
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="public-pagination">
      <pagination
        :total="paginationPage.total"
        :page="paginationPage.page"
        :limit="paginationPage.size"
        :page-sizes="pageSizes"
        @pagination="paginationEmit" />
    </div>
  </div>
</template>

<script>
/* 当前组件必要引入 */
import Pagination from '@/components/Pagination/index'
import { auditReportList } from '@/api/auditManagement'

export default {
  name: 'DictionaryManagementList',
  components: { Pagination },
  // props: [],
  data() {
    return {
      visible: false,
      width: '',
      title: '',
      listLoading: false,
      programme: '',
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
        'projectName': '',
        'state': ''
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
      auditReportList({ page: this.paginationPage, search: this.search }).then(res => {
        this.listData = res.data || []
        this.paginationPage = res.page
      })
    },
    // 填写审计报告
    handleEdit(obj) {
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
      if (column.property === 'projectName') {
        console.log(row)
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
