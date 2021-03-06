<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 人员列表
-->
<template>
  <table-layout :has-left="hasDepTree">
    <org-tree slot="left" @click="departmentClick" @load="loadDep"/>
    <el-row slot="top">
      <el-col :span="5">
        <el-button v-if="authorEdit" type="primary" plain @click="selectRoute('notice','add',department,department)">添加通知</el-button>
        <span v-else/>
      </el-col>
      <el-col :span="19" align="right"><el-form :model="paramsTable.search" :inline="true">
        <el-form-item label="公告标题">
          <el-input v-model="paramsTable.search.title" placeholder="请输入" clearable />
        </el-form-item>
        <el-button type="primary" plain @click="getListData">搜索</el-button>
      </el-form>
      </el-col>
    </el-row>
    <el-table v-loading="tableLoading" :data="listData" :cell-style="cellStyle" height="100%" @cell-click="cellClick">
      <el-table-column
        prop="title"
        show-overflow-tooltip
        label="公告标题" />
      <el-table-column
        min-width="120"
        prop="time"
        show-overflow-tooltip
        label="发布时间" />
      <el-table-column
        prop="range"
        label="通知范围">
        <template slot-scope="scope">
          {{ scope.row.range | rangeText }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="authorEdit"
        prop="state"
        label="状态">
        <template slot-scope="scope">
          {{ scope.row.state | typeText }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="authorEdit"
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button
            :disabled="scope.row.state!='draft'"
            type="text"
            size="small"
            @click="handleDelete(scope.row)">删除</el-button>
          <el-button
            :disabled="scope.row.state!='draft'"
            type="text"
            size="small"
            @click="selectRoute('notice','edit',scope.row,scope.row)">管理</el-button>
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
import Tree from '@/components/Tree/index'
import { noticeList, noticeDelete } from '@/api/organizationalManagement'
import OrgLayout from '@/components/OrgLayout/index'
import OrgTree from '@/components/OrgTree/index'
import TableLayout from '../../../components/TableLayout/TableLayout'

export default {
  name: 'PersonnelManagementList',
  // props: [],
  components: { TableLayout, OrgTree, OrgLayout, Pagination, Tree },
  data() {
    return {
      tableLoading: false,
      listData: null,
      paramsTable: {
        'page': {
          'page': 1,
          'size': 20
        },
        'search': {
          'title': '',
          'state': '',
          parentId: ''
        }
      },
      paginationPage: {
        total: 0,
        page: 1,
        size: 20
      },
      pageSizes: [10, 20, 30, 40, 50]
    }
  },
  created() {
    this.init()
  },
  activated() {},
  mounted() {
  },
  methods: {
    // 初始化
    init() {
      // 鉴权
      this.getAuthorEdit(this.$route)
    },
    // 获取列表
    getListData() {
      this.tableLoading = true
      this.paramsTable.search.parentId = this.department.id
      noticeList({ page: this.paginationPage, search: this.paramsTable.search }).then(res => {
        if (!res.status.error) {
          this.paginationPage = res.page
          this.listData = res.data || []
        } else {
          this.$message.error(res.status.msg)
        }
        this.tableLoading = false
      })
    },
    // 修改 或 创建
    handelAddOrEdit(obj) {
      const data = this.department
      // 判断是添加还是修改
      if (obj === null) { // 添加
        this.publishSubscribe('input', data)
      } else { // 修改
        obj['addOrEdit'] = 'Edit'
        this.publishSubscribe('input', obj)
      }
    },
    // 向父组件传递信息
    publishSubscribe(type, obj) {
      this.$emit('view', type, obj)
    },
    loadDep(arr, userDep) {
      this.department = userDep
      console.log(userDep)
      if (!arr.length && this.hasDepTree) {
        this.hasDepTree = false
      }
      if (this.listData === null) {
        this.getListData()
      }
    },
    // 删除
    handleDelete(row) {
      console.log(row)
      this.$confirm('确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用删除接口
        noticeDelete({ id: row.id }).then(res => {
          if (res) {
            this.$message({
              type: res.status.error ? 'error' : 'success',
              message: (res.status.msg || '完成删除操作') + '!'
            })
            this.getListData()
          } else {
            this.$message({
              type: 'error',
              message: '删除失败，请重试!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 分页子组件传递过来的信息
    paginationEmit(paginationInfo) {
      this.paginationPage.page = paginationInfo.page
      this.paginationPage.size = paginationInfo.limit
      this.getListData()
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
      if (column.property === 'title') {
        this.selectRoute('notice', 'view', row)
      } else {
        return ''
      }
    },
    departmentClick(data) {
      console.log(data)
      this.department = data
      this.getListData()
    }
  }
}
</script>
