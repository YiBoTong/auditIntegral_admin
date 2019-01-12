<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 字典管理列表
-->
<template>
  <table-layout>
    <el-row slot="top" :gutter="10">
      <el-col :span="8">
        <el-button
          v-if="authorEdit"
          type="primary"
          plain
          @click="openDialog()">添加
        </el-button>
        <span v-else/>
      </el-col>
      <el-col :span="16" align="right">
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
        label="项目名" >
        <template slot-scope="scope">
          {{ scope.row.projectName || '—' }}
        </template>
      </el-table-column>
      <!--<el-table-column-->
      <!--prop="departmentName"-->
      <!--label="方案名"/>-->
      <!--<el-table-column-->
      <!--prop="departmentName"-->
      <!--label="所属部门" />-->
      <el-table-column
        prop="number"
        show-overflow-tooltip
        label="编号" >
        <template slot-scope="scope">
          {{ scope.row.number || '—' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="time"
        show-overflow-tooltip
        label="检查日期">
        <template slot-scope="scope">
          {{ scope.row.time || '—' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="updateTime"
        show-overflow-tooltip
        label="更新时间">
        <template slot-scope="scope">
          {{ scope.row.updateTime || '—' }}
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
        align="center"
        min-width="100px">
        <template slot-scope="scope">
          <el-button
            :disabled="scope.row.state === 'draft' || scope.row.introductionId !== 0 "
            type="text"
            size="small"
            @click="handleCreate(scope.row)">介绍信
          </el-button>
          <el-button
            :disabled="scope.row.state!=='draft'"
            type="text"
            size="small"
            @click="handelUpdateOrCreate(scope.row)">修改
          </el-button>
          <el-button
            :disabled="scope.row.state!=='draft'"
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
    <select-programme :visible.sync="visible" :width="width" :title="title" @select="selectProgramme"/>
  </table-layout>
</template>
<script>
/* 当前组件必要引入 */
import Pagination from '@/components/Pagination/index'
import TableLayout from '../../../components/TableLayout/TableLayout'
import SelectProgramme from './components/selectProgrammeDialog'
import { getDraftList, deleteDraft, createIntroduction } from '@/api/auditManagement'

export default {
  name: 'DictionaryManagementList',
  components: { TableLayout, Pagination, SelectProgramme },
  // props: [],
  data() {
    return {
      visible: false,
      width: '',
      title: '',
      tableLoading: false,
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
      // 鉴权
      this.getAuthorEdit(this.$route)
      this.getListData()
    },
    // 获取数据 搜索
    getListData() {
      this.tableLoading = true
      getDraftList({ page: this.paginationPage, search: this.search }).then(res => {
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
    // 操作状态
    // handleState(row) {
    //   this.stateForm.id = row.id
    //   this.stateForm.state = 'publish'
    //   changeStateDraft(this.stateForm).then(res => {
    //     if (res) {
    //       this.$message({
    //         type: 'success',
    //         message: '发布成功' + '!'
    //       })
    //       this.getListData()
    //     } else {
    //       this.$message({
    //         type: 'error',
    //         message: '发布失败，请重试!'
    //       })
    //     }
    //   })
    // },
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
    // 生成介绍信
    handleCreate(row) {
      this.$confirm('是否生成查库介绍信？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        createIntroduction({ draftId: row.id }).then(res => {
          if (!res.status.error) {
            this.$message({
              type: res.status.error ? 'error' : 'success',
              message: (res.status.msg || '完成生成操作') + '!'
            })
            this.getListData()
          } else {
            this.$message({
              type: 'error',
              message: '生成失败，请重试!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消生成'
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
        deleteDraft({ id: row.id }).then(res => {
          if (!res.status.error) {
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
