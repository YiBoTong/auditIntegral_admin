<template>
  <table-layout>
    <el-row slot="top">
      <el-col align="right">
        <el-form :inline="true">
          <el-form-item label="系统日志:">
            <el-input
              v-model="search.userId"
              placeholder="请输入"
              prefix-icon="el-icon-search"
              clearable />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              plain
              @click="getListData">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-table
      :data="listData"
      height="100%">
      <el-table-column
        prop="server"
        label="服务" />
      <el-table-column
        prop="method"
        label="请求方式" />
      <el-table-column
        prop="userName"
        label="操作人" />
      <el-table-column
        prop="msg"
        label="日志信息" />
      <el-table-column
        prop="time"
        label="操作日期" />
      <el-table-column
        v-if="authorEdit"
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleDelete(scope.row)">删除</el-button>
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
import { logList, logDelete } from '@/api/systemManagement'
import TableLayout from '../../../components/TableLayout/TableLayout'

export default {
  name: 'SystemLogList',
  components: { TableLayout, Pagination },
  // props: [],
  data() {
    return {
      listLoading: false,
      paramsData: undefined,
      listData: [],
      paginationPage: {
        total: 0,
        page: 1,
        size: 20
      },
      pageSizes: [10, 20, 30, 40, 50],
      search: {
        'key': '',
        'userId': ''
      }
    }
  },
  created() {
    this.init()
  },
  mounted() {
  },
  methods: {
    // 初始化
    init() {
      this.getAuthorEdit(this.$route)
      this.getListData()
    },
    // 获取table数据
    getListData(res) {
      logList({ page: this.paginationPage, search: this.search }).then(res => {
        this.listData = res.data || []
        console.log(this.listData)
        this.paginationPage = res.page
      })
    },
    // 删除
    // 删除
    handleDelete(row) {
      this.$confirm('确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用删除接口
        logDelete({ id: row.Id }).then(res => {
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
