<!--
****--@date     2018-12-10 17:48
****--@author   XXL
****--@describe 审计方案
-->
<template>
  <table-layout>
    <el-row slot="top" :gutter="10">
      <el-col :span="8">
        <el-button
          v-if="authorEdit"
          type="primary"
          plain
          @click="handelUpdateOrCreate(null)">添加
        </el-button>
        <span v-else/>
      </el-col>
      <el-col :span="16" align="right">
        <el-form
          v-model="search"
          :inline="true">
          <el-form-item label="审计方案">
            <el-input
              v-model="search.title"
              placeholder="请输入审计方案"
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
        prop="title"
        show-overflow-tooltip
        label="项目名称" />
      <el-table-column
        prop="key"
        show-overflow-tooltip
        label="类型">
        <template slot-scope="scope">
          {{ scope.row.key | dictionaries(self,-5) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        show-overflow-tooltip
        label="审计方式">
        <template slot-scope="scope">
          {{ scope.row.type | dictionaries(self,-6) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="startTime"
        show-overflow-tooltip
        label="审计开始时间">
        <template slot-scope="scope">
          {{ scope.row.startTime || '—' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="endTime"
        show-overflow-tooltip
        label="审计结束时间" >
        <template slot-scope="scope">
          {{ scope.row.endTime || '—' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="planStartTime"
        show-overflow-tooltip
        label="业务开始时间" >
        <template slot-scope="scope">
          {{ scope.row.planStartTime || '—' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="planEndTime"
        show-overflow-tooltip
        label="业务结束时间" >
        <template slot-scope="scope">
          {{ scope.row.planEndTime || '—' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="state"
        show-overflow-tooltip
        label="状态">
        <template slot-scope="scope">
          {{ scope.row.state | auditStateChange }}
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="操作"
        align="center"
        min-width="100px"
      >
        <template slot-scope="scope">
          <!--<el-button-->
          <!--type="text"-->
          <!--size="small"-->
          <!--@click="handleState(scope.row)">上报-->
          <!--</el-button>-->
          <!-- 只有部门负责人才有这个按钮 -->
          <el-button
            v-if="!!~writeRoules.indexOf('management')"
            type="text"
            size="small"
            @click="handelAudit(scope.row)" >审核
          </el-button>
          <el-button
            v-if="authorEdit"
            :disabled="!~['draft','reject'].indexOf(scope.row.state)"
            type="text"
            size="small"
            @click="handelUpdateOrCreate(scope.row)">管理
          </el-button>
          <el-button
            v-if="authorEdit"
            :disabled="!~['draft','reject'].indexOf(scope.row.state)"
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
import { programmeList, programmeDelete, programmeState } from '@/api/auditManagement'
import TableLayout from '../../../components/TableLayout/TableLayout'

export default {
  name: 'LoginManagementList',
  components: { TableLayout, Pagination },
  // props: [],
  data() {
    return {
      self: this,
      listData: [],
      formData: [],
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
        'title': '',
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
      // 鉴权
      this.getAuthorEdit(this.$route)
      this.getListData()
    },
    // 获取数据 搜索
    getListData() {
      programmeList({ page: this.paginationPage, search: this.search }).then(res => {
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
      this.stateForm.id = row.id
      this.stateForm.state = 'report'
      programmeState(this.stateForm).then(res => {
        if (res) {
          this.$message({
            type: res.status.error ? 'error' : 'success',
            message: (res.status.msg || '完成上报') + '!'
          })
          this.getListData()
        } else {
          this.$message({
            type: 'error',
            message: '上报失败，请重试!'
          })
        }
      })
    },
    // 审核
    handelAudit(obj) {
      this.publishSubscribe('audit', obj)
    },
    // 修改 或 创建
    handelUpdateOrCreate(obj) {
      this.publishSubscribe('input', obj)
    },
    // 向父组件传递信息
    publishSubscribe(type, obj) {
      this.$emit('view', type, obj)
    },
    // 删除
    handleDelete(row) {
      this.$confirm('确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用删除接口
        programmeDelete({ id: row.id }).then(res => {
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
      console.log(row)
      console.log(column)
      console.log(cell)
      console.log(event)
      if (column.property === 'title') {
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
