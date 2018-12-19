<!--
****--@date     2018-12-10 17:48
****--@author   XXL
****--@describe 稽核方案
-->
<template>
  <div class="audit-plan-container">
    <div class="audit-plan-top">
      <div class="top-create">
        <el-button
          type="primary"
          plain
          @click="handelUpdateOrCreate(null)">添加
        </el-button>
      </div>
      <div class="top-form">
        <el-form
          v-model="search"
          :inline="true">
          <el-form-item label="稽核方案">
            <el-input
              v-model="search.userName"
              placeholder="请输入"
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
          prop="title"
          label="标题" />
        <el-table-column
          prop="key"
          label="类型" />
        <el-table-column
          prop="purpose"
          label="目的" />
        <el-table-column
          prop="type"
          label="审计方式" />
        <el-table-column
          prop="startTime"
          show-overflow-tooltip
          label="审计开始时间"/>
        <el-table-column
          prop="endTime"
          show-overflow-tooltip
          label="审计结束时间" />
        <el-table-column
          prop="planStartTime"
          show-overflow-tooltip
          label="工作开始时间" />
        <el-table-column
          prop="planEndTime"
          show-overflow-tooltip
          label="工作结束时间" />
        <el-table-column
          prop="state"
          show-overflow-tooltip
          label="状态"
          width="80">
          <template slot-scope="scope">
            {{ scope.row.state | typeText }}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleState(scope.row)">发布
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="handelUpdateOrCreate(scope.row)">管理
            </el-button>
            <el-button
              :disabled="scope.row.isUse"
              type="text"
              size="small"
              @click="handleDelete(scope.row)">删除
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
import { programmeList, programmeDelete } from '@/api/auditManagement'
import auditData from './auditData'

export default {
  name: 'LoginManagementList',
  components: { Pagination },
  // props: [],
  data() {
    return {
      auditData,
      listLoading: false,
      listData: [],
      formData: [],
      paginationPage: {
        total: 0,
        page: 1,
        size: 20
      },
      pageSizes: [10, 20, 30, 40, 50],
      search: {
        'page': {
          'page': 1,
          'size': 20
        },
        'search': {
          'title': ''
        }
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
      programmeList(this.search).then(res => {
        this.listData = res.data || []
        this.paginationPage = res.page
      })
    },
    // 操作状态
    // handleState(row) {
    //   console.log(row)
    //   const newState = !row.isUse
    //   this.formData.isUse = newState
    //   this.formData.userCode = row.userCode
    //   const stateStr = newState ? '启用' : '禁用'
    //   this.$confirm('确定' + stateStr + '？', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     loginEdit(this.formData).then(res => {
    //       this.$message({
    //         type: 'success',
    //         message: '已' + stateStr + '！'
    //       })
    //       this.getListData()
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消' + stateStr
    //     })
    //   })
    // },
    // 字典类型转换显示
    // formatterType(row) {
    //   switch (row.key) {
    //     case 'system':
    //       return '系统'
    //     case 'yes':
    //       return '其他'
    //     case 'other':
    //       return '其他'
    //   }
    // },
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
