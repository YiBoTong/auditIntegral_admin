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
        <el-form v-model="search" :inline="true">
          <el-form-item label="项目名称:">
            <el-input
              v-model="search.projectName"
              placeholder="请输入项目名称"
              prefix-icon="el-icon-search"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain @click="getListData">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-table v-loading="tableLoading" :data="listData" :cell-style="cellStyle" height="100%" @cell-click="cellClick">
      <el-table-column prop="userName" show-overflow-tooltip label="通知人">
        <template slot-scope="scope">{{ scope.row.userName || '—' }}</template>
      </el-table-column>
      <el-table-column prop="projectName" show-overflow-tooltip label="项目名称">
        <template slot-scope="scope">{{ scope.row.projectName || '—' }}</template>
      </el-table-column>
      <el-table-column prop="queryDepartmentName" show-overflow-tooltip label="被查询机构">
        <template slot-scope="scope">{{ scope.row.queryDepartmentName || '—' }}</template>
      </el-table-column>
      <el-table-column prop="departmentName" show-overflow-tooltip label="查询机构">
        <template slot-scope="scope">{{ scope.row.departmentName || '—' }}</template>
      </el-table-column>
      <el-table-column prop="queryStartTime" align="center" show-overflow-tooltip label="检查开始时间">
        <template slot-scope="scope">{{ scope.row.queryStartTime|| '—' }}</template>
      </el-table-column>
      <el-table-column prop="queryEndTime" align="center" show-overflow-tooltip label="检查结束时间">
        <template slot-scope="scope">{{ scope.row.queryEndTime|| '—' }}</template>
      </el-table-column>
      <el-table-column v-if="authorEdit" prop="date" label="操作" align="center" width="300">
        <template slot-scope="scope">
          <!--<el-button-->
          <!--:disabled="scope.row.id < 0"-->
          <!--type="text"-->
          <!--size="small"-->
          <!--@click="handleState(scope.row)">发布-->
          <!--</el-button>-->
          <!-- 业务员 -->
          <el-button
            v-if="!!~writeRoules.indexOf('staff')"
            :disabled="scope.row.state !== 'draft' || !~[0,loginUserId].indexOf(scope.row.authorId)"
            type="text"
            size="small"
            @click="handelEditAction(scope.row)"
          >填写违规行为</el-button>
          <!-- 部门负责人  -->
          <el-button
            v-if="!!~writeRoules.indexOf('management')"
            :disabled="scope.row.state !== 'jh_draft'"
            type="text"
            size="small"
            @click="handelEdit(scope.row,'score')"
          >填写分数</el-button>
          <!-- 部门分管领导 -->
          <el-button
            v-if="!!~writeRoules.indexOf('fgld')"
            :disabled="scope.row.state !== 'ld_draft'"
            type="text"
            size="small"
            @click="handelEdit(scope.row,'author')"
          >领导签署</el-button>
          <!-- 办公室的人都可以填写  -->
          <el-button
            v-if="$store.state.user.userInfo.departmentId===19"
            :disabled="scope.row.state !== 'bgs_draft'"
            type="text"
            size="small"
            @click="handelEdit(scope.row,'number')"
          >填写编号</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      slot="pager"
      :total="paginationPage.total"
      :page="paginationPage.page"
      :limit="paginationPage.size"
      :page-sizes="pageSizes"
      @pagination="paginationEmit"
    />
  </table-layout>
</template>
<script>
/* 当前组件必要引入 */
import Pagination from '@/components/Pagination/index'
import { punishNoticeList } from '@/api/auditManagement'
import OrgTree from '../../../components/OrgTree/index'
import TableLayout from '../../../components/TableLayout/TableLayout'

export default {
  name: 'PunishNoticeList',
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
      punishNoticeList({ page: this.paginationPage, search: this.search }).then(res => {
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
