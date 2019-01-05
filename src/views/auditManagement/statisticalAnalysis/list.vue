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
        prop="projectName"
        label="项目名称" />
      <el-table-column
        prop="programmeTitle"
        label="方案" />
      <el-table-column
        prop="number"
        label="编号" />
      <el-table-column
        prop="startTime"
        label="开始时间"/>
      <el-table-column
        prop="startTime"
        show-overflow-tooltip
        label="结束时间" />
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
import { statisticalList } from '@/api/auditManagement'
import Pagination from '@/components/Pagination/index'
import TableLayout from '../../../components/TableLayout/TableLayout'

export default {
  name: 'DictionaryManagementList',
  components: { TableLayout, Pagination },
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
      statisticalList({ page: this.paginationPage, search: this.search }).then(res => {
        this.listData = res.data || []
        this.paginationPage = res.page
      })
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
    // 分页子组件传递过来的信息
    paginationEmit(paginationInfo) {
      this.paginationPage.page = paginationInfo.page
      this.paginationPage.size = paginationInfo.limit
      this.getListData()
    }
  }
}
</script>
