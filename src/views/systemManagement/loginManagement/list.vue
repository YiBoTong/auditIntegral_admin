<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 登录管理列表
-->
<template>
  <table-layout>
    <el-row slot="top">
      <el-col :span="2">
        <el-button v-if="authorEdit" type="primary" plain @click="selectRoute('loginManagement','add',null)">添加</el-button>
        <span v-else/>
      </el-col>
      <el-col :span="22" align="right">
        <el-form v-model="search" :inline="true">
          <el-form-item label="姓名">
            <el-input
              v-model="search.userName"
              placeholder="请输入姓名"
              prefix-icon="el-icon-search"
              clearable />
          </el-form-item>
          <el-form-item label="员工号">
            <el-input
              v-model="search.userCode"
              placeholder="请输入员工号"
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
      height="100%">
      <el-table-column
        prop="userName"
        show-overflow-tooltip
        label="姓名" />
      <el-table-column
        prop="userCode"
        show-overflow-tooltip
        label="员工号" />
      <el-table-column
        prop="isUse"
        label="是否启用">
        <template slot-scope="scope">
          {{ scope.row.isUse | typeText }}
        </template>
      </el-table-column>
      <el-table-column
        prop="loginNum"
        label="登录次数" />
      <el-table-column
        prop="authorName"
        show-overflow-tooltip
        label="授权人">
        <template slot-scope="scope">
          {{ scope.row.userName || '—' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="changePdTime"
        show-overflow-tooltip
        label="最后修改密码时间" >
        <template slot-scope="scope">
          {{ scope.row.changePdTime || '—' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="loginTime"
        show-overflow-tooltip
        label="最后登录时间" >
        <template slot-scope="scope">
          {{ scope.row.loginTime || '—' }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="authorEdit"
        prop="date"
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button
            :disabled="scope.row.userCode === 'admin' "
            type="text"
            size="small"
            @click="handleState(scope.row)">{{ scope.row.isUse | startText }}
          </el-button>
          <!--<el-button-->
          <!--:disabled="scope.row.isUse"-->
          <!--type="text"-->
          <!--size="small"-->
          <!--@click="handelUpdateOrCreate(scope.row)">修改-->
          <!--</el-button>-->
          <el-button
            :disabled="scope.row.isUse"
            type="text"
            size="small"
            @click="handleDelete(scope.row)">删除
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
import { loginList, loginDelete, loginEdit } from '@/api/systemManagement'
import TableLayout from '../../../components/TableLayout/TableLayout'

export default {
  name: 'LoginManagementList',
  components: { TableLayout, Pagination },
  // props: [],
  data() {
    return {
      listData: [],
      formData: {
        'isUse': false,
        'userCode': '10001'
      },
      paginationPage: {
        total: 0,
        page: 1,
        size: 20
      },
      pageSizes: [10, 20, 30, 40, 50],
      search: {
        'userName': '',
        'userCode': ''
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
      this.getAuthorEdit(this.$route)
      this.getListData()
    },
    // 获取数据 搜索
    getListData() {
      this.tableLoading = true
      loginList({ page: this.paginationPage, search: this.search }).then(res => {
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
      const newState = !row.isUse
      this.formData.isUse = newState
      this.formData.userCode = row.userCode
      const stateStr = newState ? '启用' : '禁用'
      this.$confirm('确定' + stateStr + '？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        loginEdit(this.formData).then(res => {
          this.$message({
            type: 'success',
            message: '已' + stateStr + '！'
          })
          this.getListData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消' + stateStr
        })
      })
    },
    // 删除
    handleDelete(row) {
      this.$confirm('确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用删除接口
        loginDelete({ userCode: row.userCode }).then(res => {
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
    }
  }
}
</script>
