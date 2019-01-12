<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 人员列表
-->
<template>
  <div style="height: 100%">
    <table-layout :has-left="hasDepTree">
      <org-tree slot="left" @click="departmentClick" @load="loadDep"/>
      <el-row slot="top">
        <el-col :span="12">
          <template v-if="authorEdit">
            <el-button type="primary" plain @click="handelAddOrEdit(null)">添加办法</el-button>
            <el-button type="primary" plain @click="openOrCloseUploadDocxCall(true)">导入管理办法</el-button>
          </template>
          <span v-else/>
        </el-col>
        <el-col :span="12" align="right">
          <el-form :model="paramsTable.search" :inline="true">
            <el-form-item label="办法标题">
              <el-input v-model="paramsTable.search.title" placeholder="请输入" clearable />
            </el-form-item>
            <el-button type="primary" plain @click="getListData">搜索</el-button>
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
          label="管理办法" />
        <el-table-column
          prop="from"
          show-overflow-tooltip
          label="来源" >
          <template slot-scope="scope">
            {{ scope.row.from || "—" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="number"
          show-overflow-tooltip
          label="文件号" >
          <template slot-scope="scope">
            {{ scope.row.number || "—" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          show-overflow-tooltip
          label="分类" >
          <template slot-scope="scope">
            {{ (scope.row.type || "—") }}
          </template>
        </el-table-column>
        <el-table-column
          prop="authorName"
          show-overflow-tooltip
          label="发布人" />
        <el-table-column
          v-if="authorEdit"
          prop="state"
          show-overflow-tooltip
          label="状态" >
          <template slot-scope="scope">
            {{ scope.row.state | typeText }}
          </template>
        </el-table-column>
        <el-table-column
          prop="updateTime"
          show-overflow-tooltip
          label="更新时间" />
        <el-table-column
          v-if="authorEdit"
          prop="date"
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button
              :disabled="scope.row.state === 'publish' "
              type="text"
              size="small"
              @click="handleState(scope.row)">发布</el-button>
            <el-button
              :disabled="scope.row.state!='draft'"
              type="text"
              size="small"
              @click="handleDelete(scope.row)">删除</el-button>
            <el-button
              :disabled="scope.row.state!='draft'"
              type="text"
              size="small"
              @click="handelAddOrEdit(scope.row)">管理</el-button>
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
    <el-dialog :visible.sync="openUploadDocx" :title="`导入管理办法${department&&department.name?'到'+department.name:''}`">
      <upload-docx v-if="openUploadDocx" :params-data="department" @upload="uploadDocxCall"/>
    </el-dialog>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { clauseList, clauseDelete, clausesState } from '@/api/organizationalManagement'
import OrgTree from '../../../components/OrgTree/index'
import Pagination from '../../../components/Pagination/index'
import TableLayout from '../../../components/TableLayout/TableLayout'
import UploadDocx from '../../../components/uploadDocx/uploadDocx'

export default {
  name: 'MMList',
  // props: [],
  components: { UploadDocx, Pagination, OrgTree, TableLayout },
  data() {
    return {
      listData: null,
      hasDepTree: true,
      openUploadDocx: false,
      department: null,
      paramsTable: {
        page: {
          page: 1,
          size: 20
        },
        search: {
          title: '',
          state: '',
          startTime: '',
          endTime: '',
          departmentId: ''
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
  activated() {
    if (this.listData !== null) {
      this.getListData()
    }
  },
  mounted() {
  },
  methods: {
    // 初始化
    init() {
      // 鉴权
      this.getAuthorEdit(this.$route)
      // this.getListData()
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
    departmentClick(data) {
      this.department = data
      this.getListData()
    },
    getListData() {
      this.tableLoading = true
      this.paramsTable.search.departmentId = this.department.id
      clauseList(this.paramsTable).then(res => {
        this.paginationPage = res.page
        this.listData = res.data || []
        this.tableLoading = false
      })
    },
    // 改变状态
    handleState(val) {
      clausesState({ id: val.id, state: 'publish' }).then(res => {
        if (!res.status.error) {
          this.$message.success('发布成功！')
        } else {
          this.$message.error(res.status.msg)
        }
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
    openOrCloseUploadDocxCall(open = false) {
      this.openUploadDocx = open
    },
    uploadDocxCall(update) {
      this.openOrCloseUploadDocxCall()
      if (update) {
        this.getListData()
      }
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
        clauseDelete({ id: row.id }).then(res => {
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
        this.publishSubscribe('show', row)
      } else {
        return ''
      }
    }
  }
}
</script>
