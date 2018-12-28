<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 字典管理列表
-->
<template>
  <div class="punish-list-container">
    <div class="list-top">
      <div class="top-left">
        <el-button
          type="primary"
          plain
          @click="handelEdit(null)">添加
        </el-button>
      </div>
      <div class="top-right">
        <el-form
          v-model="search"
          :inline="true">
          <el-form-item label="违规积分通知书:">
            <el-input
              v-model="search.title"
              placeholder="请输入违规通知书"
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
          prop="programmeTitle"
          label="方案名称" />
        <el-table-column
          prop="queryDepartmentName"
          label="查询机构名称" />
        <el-table-column
          prop="departmentName"
          show-overflow-tooltip
          label="被查询机构名称" />
        <el-table-column
          prop="updateTime"
          show-overflow-tooltip
          label="更新时间" />
        <el-table-column
          prop="time"
          show-overflow-tooltip
          label="检查日期" />
        <el-table-column
          prop="startTime"
          label="业务开始时间" />
        <el-table-column
          prop="endTime"
          show-overflow-tooltip
          label="业务结束时间" />
        <el-table-column
          prop="planStartTime"
          show-overflow-tooltip
          label="检查开始时间" />
        <el-table-column
          prop="planEndTime"
          show-overflow-tooltip
          label="检查结束时间" />
        <el-table-column
          prop="date"
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button
              :disabled="scope.row.id < 0"
              type="text"
              size="small"
              @click="handleState(scope.row)">发布
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="handelEdit(scope.row,'score')">填写分数
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="handelEdit(scope.row,'number')">填写编号
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="handelEdit(scope.row,'author')">领导签署
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
import { punishNoticeList, deletePunishNotice, editPunishNoticeState } from '@/api/auditManagement'

export default {
  name: 'PunishNoticeList',
  components: { Pagination },
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
      this.getListData()
    },
    // 获取数据 搜索
    getListData() {
      punishNoticeList({ page: this.paginationPage, search: this.search }).then(res => {
        this.listData = res.data || []
        this.paginationPage = res.page
      })
    },
    // 操作状态
    handleState(row) {
      this.stateForm.id = row.id
      this.stateForm.state = 'publish'
      editPunishNoticeState(this.stateForm).then(res => {
        if (res) {
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
    // 删除
    handleDelete(row) {
      this.$confirm('确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用删除接口
        deletePunishNotice({ id: row.id }).then(res => {
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
