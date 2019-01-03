<!--
****--@date     2019-01-03 14:29
****--@author   XXL
****--@describe 审计报告列表
-->
<template>
  <div class="manuscript-list-container">
    <div class="list-top">
      <div class="top-create">
        <el-button
          type="primary"
          plain
          @click="openDialog()">添加
        </el-button>
      </div>
      <div class="top-form">
        <el-form
          v-model="search"
          :inline="true">
          <el-form-item label="工作底稿">
            <el-input
              v-model="search.projectName"
              placeholder="请输入工作底稿"
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
          label="项目名" />
        <!--<el-table-column-->
        <!--prop="departmentName"-->
        <!--label="方案名"/>-->
        <!--<el-table-column-->
        <!--prop="departmentName"-->
        <!--label="所属部门" />-->
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
              @click="handleState(scope.row)">发布
            </el-button>
            <el-button
              :disabled="scope.row.id > 0 && scope.row.isUse"
              type="text"
              size="small"
              @click="handelUpdateOrCreate(scope.row)">修改
            </el-button>
            <el-button
              :disabled="scope.row.isUse || scope.row.id < 0"
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
import { getDraftList, deleteDraft, changeStateDraft } from '@/api/auditManagement'

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
      getDraftList({ page: this.paginationPage, search: this.search }).then(res => {
        this.listData = res.data || []
        this.paginationPage = res.page
      })
    },
    // 操作状态
    handleState(row) {
      this.stateForm.id = row.id
      this.stateForm.state = 'publish'
      changeStateDraft(this.stateForm).then(res => {
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
    // 打开选择方案对话框
    openDialog() {
      this.visible = true
      this.width = '600px'
      this.title = '选择方案'
    },
    // 选择回调
    selectProgramme(value) {
      value['isProgramme'] = true
      this.handelUpdateOrCreate(value)
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
        deleteDraft({ id: row.id }).then(res => {
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
