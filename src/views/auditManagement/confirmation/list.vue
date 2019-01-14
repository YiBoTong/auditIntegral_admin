<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 字典管理列表
-->
<template>
  <table-layout :has-left="hasDepTree">
    <org-tree slot="left" @click="departmentClick" @load="loadDep"/>
    <el-row slot="top" :gutter="10">
      <el-col align="right">
        <el-form
          v-model="search"
          :inline="true">
          <el-form-item label="项目名称">
            <el-input
              v-model="search.projectName"
              placeholder="请输入项目名称"
              prefix-icon="el-icon-search"
              clearable />
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
          {{ scope.row.number || "—" }}
        </template>
      </el-table-column>
      <el-table-column
        prop="time"
        show-overflow-tooltip
        label="检查开始日期">
        <template slot-scope="scope">
          {{ scope.row.queryStartTime || "—" }}
        </template>
      </el-table-column>
      <el-table-column
        prop="updateTime"
        show-overflow-tooltip
        label="检查结束日期" >
        <template slot-scope="scope">
          {{ scope.row.queryEndTime || "—" }}
        </template>
      </el-table-column>
      <el-table-column
        prop="hasRead"
        label="是否已读">
        <template slot-scope="scope">
          {{ scope.row.hasRead | hasRead }}
        </template>
      </el-table-column>
      <el-table-column
        prop="hasReadTime"
        show-overflow-tooltip
        label="回执时间" >
        <template slot-scope="scope">
          {{ scope.row.hasReadTime || "—" }}
        </template>
      </el-table-column>
      <el-table-column
        prop="state"
        show-overflow-tooltip
        label="状态">
        <template slot-scope="scope">
          {{ scope.row.state | publicListState }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="authorEdit"
        prop="date"
        label="操作"
        align="center">
        <template slot-scope="scope">
          <!--<el-button-->
          <!--:disabled="scope.row.state === 'publish'"-->
          <!--type="text"-->
          <!--size="small"-->
          <!--@click="handleState(scope.row)">发布-->
          <!--</el-button>-->
          <el-button
            :disabled="scope.row.state !== 'draft' || !~[0,loginUserId].indexOf(scope.row.authorId)"
            type="text"
            size="small"
            @click="handleEdit(scope.row)">管理
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
import { confirmationList, changeStateConfirmation } from '@/api/auditManagement'
import OrgTree from '../../../components/OrgTree/index'
import TableLayout from '../../../components/TableLayout/TableLayout'

export default {
  name: 'DictionaryManagementList',
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
      confirmationList({ page: this.paginationPage, search: this.search }).then(res => {
        if (!res.status.error) {
          this.listData = res.data || []
          this.paginationPage = res.page
        } else {
          this.$message.error(res.status.msg)
        }
        this.tableLoading = false
      })
    },
    // 操作状态
    handleState(row) {
      console.log(row)
      this.stateForm.id = row.id
      this.stateForm.state = 'publish'
      this.$confirm('发布事实确认书后将同时推送惩罚通知书给稽核并生成整改通知', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        changeStateConfirmation(this.stateForm).then(res => {
          if (!res.status.error) {
            this.$message({
              type: 'success',
              message: '发布成功' + '!'
            })
            this.getListData()
          } else {
            this.$message({
              type: 'error',
              message: '发布失败，请重试!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消发布'
        })
      })
    },
    // 打开选择方案对话框
    openDialog() {
      this.visible = true
      this.width = '600px'
      this.title = '选择方案'
    },
    // 修改
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
        this.publishSubscribe('show', row)
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
