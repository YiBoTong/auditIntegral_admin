<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 人员列表
-->
<template>
  <div style="height: 100%" class="file-list-container">
    <table-layout :has-left="hasDepTree">
      <org-tree slot="left" @click="departmentClick" @load="loadDep"/>
      <el-row slot="top">
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <template v-if="authorEdit">
            <!--<el-button type="primary" plain @click="handelAddOrEdit(null)">新建文件</el-button>-->
            <el-button type="primary" plain @click="createFile(null)">新建文件</el-button>
            <el-button type="primary" plain @click="openOrCloseUploadDocxCall(true)">导入文件</el-button>
          </template>
          <span v-else/>
        </el-col>
        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16" align="right">
          <el-form :model="paramsTable.search" :inline="true">
            <el-form-item label="标题">
              <el-input v-model="paramsTable.search.title" placeholder="请输入" clearable />
            </el-form-item>
            <el-form-item label="分类" >
              <el-select v-model="paramsTable.search.type" placeholder="请选择" clearable>
                <dictionary-option :id="-10"/>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" plain @click="getListData">搜索</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <file-list :file-list-data="listData" @showFile="showFile" @deleteFile="handleDelete" @changeFileName="handleChangeFileName"/>
      <!--<el-table-->
      <!--v-loading="tableLoading"-->
      <!--:data="listData"-->
      <!--:cell-style="cellStyle"-->
      <!--height="100%"-->
      <!--@cell-click="cellClick">-->
      <!--<el-table-column-->
      <!--prop="title"-->
      <!--show-overflow-tooltip-->
      <!--label="标题"-->
      <!--class="file-icon-column">-->
      <!--<template slot-scope="scope">-->
      <!--<img :src="fileIcon" alt="图标加载失败">{{ scope.row.title || "—" }}-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
      <!--prop="from"-->
      <!--show-overflow-tooltip-->
      <!--label="来源" >-->
      <!--<template slot-scope="scope">-->
      <!--{{ scope.row.from || "—" }}-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
      <!--prop="number"-->
      <!--show-overflow-tooltip-->
      <!--label="文件号" >-->
      <!--<template slot-scope="scope">-->
      <!--{{ scope.row.number || "—" }}-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
      <!--prop="type"-->
      <!--show-overflow-tooltip-->
      <!--label="分类" >-->
      <!--<template slot-scope="scope">-->
      <!--{{ (scope.row.type || "—") | dictionaries(self,-10) }}-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
      <!--prop="authorName"-->
      <!--show-overflow-tooltip-->
      <!--label="发布人" />-->
      <!--<el-table-column-->
      <!--v-if="authorEdit"-->
      <!--prop="state"-->
      <!--show-overflow-tooltip-->
      <!--label="状态" >-->
      <!--<template slot-scope="scope">-->
      <!--{{ scope.row.state | typeText }}-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
      <!--prop="updateTime"-->
      <!--show-overflow-tooltip-->
      <!--label="更新时间" />-->
      <!--<el-table-column-->
      <!--v-if="authorEdit"-->
      <!--prop="date"-->
      <!--label="操作"-->
      <!--align="center">-->
      <!--<template slot-scope="scope">-->
      <!--<el-button-->
      <!--:disabled="scope.row.state === 'publish' "-->
      <!--type="text"-->
      <!--size="small"-->
      <!--@click="handleState(scope.row)">发布</el-button>-->
      <!--<el-button-->
      <!--:disabled="scope.row.state!='draft'"-->
      <!--type="text"-->
      <!--size="small"-->
      <!--@click="handleDelete(scope.row)">删除</el-button>-->
      <!--<el-button-->
      <!--:disabled="scope.row.state!='draft'"-->
      <!--type="text"-->
      <!--size="small"-->
      <!--@click="handelAddOrEdit(scope.row)">管理</el-button>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--</el-table>-->
      <!--<pagination-->
      <!--slot="pager"-->
      <!--:total="paginationPage.total"-->
      <!--:page="paginationPage.page"-->
      <!--:limit="paginationPage.size"-->
      <!--:page-sizes="pageSizes"-->
      <!--@pagination="paginationEmit" />-->
    </table-layout>
    <el-dialog :visible.sync="openUploadDocx" :title="`导入文件${department&&department.name?'到'+department.name:''}`">
      <upload-docx v-if="openUploadDocx" :params-data="department" @upload="uploadDocxCall"/>
    </el-dialog>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { clauseList, clauseDelete, clausesState } from '@/api/organizationalManagement'
import DictionaryOption from '@/components/DictionaryOption/dictionaryOption'
import OrgTree from '@/components/OrgTree/index'
import FileList from '@/components/FileList'
// import Pagination from '@/components/Pagination/index'
import TableLayout from '@/components/TableLayout/TableLayout'
import UploadDocx from '@/components/uploadDocx/uploadDocx'

export default {
  name: 'MMList',
  // props: [],
  components: { DictionaryOption, UploadDocx, OrgTree, TableLayout, FileList },
  data() {
    return {
      tableLoading: false,
      self: this,
      listData: null,
      openUploadDocx: false,
      paramsTable: {
        page: {
          page: 1,
          size: 100
        },
        search: {
          title: '',
          state: '',
          type: '',
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
  activated() {},
  mounted() {
  },
  methods: {
    // 初始化
    init() {
      // 鉴权
      this.getAuthorEdit(this.$route)
      // this.getListData()
    },
    getListData() {
      this.tableLoading = true
      this.paramsTable.search.departmentId = this.department.id
      clauseList(this.paramsTable).then(res => {
        if (!res.status.error) {
          this.paginationPage = res.page
          this.listData = res.data || []
        } else {
          this.$message.error(res.status.msg)
        }
        this.tableLoading = false
      })
    },
    // 改变状态
    handleState(val) {
      clausesState({ id: val.id, state: 'publish' }).then(res => {
        if (!res.status.error) {
          this.$message.success('发布成功！')
          this.getListData()
        } else {
          this.$message.error(res.status.msg)
        }
      })
    },
    // 新建文件
    createFile() {
      this.$prompt('请输入文件名', '新建文件', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '新建成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消新建'
        })
      })
    },
    // 重命名文件
    handleChangeFileName(val) {
      this.$prompt('请输入新文件名', '重命名', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: val.title
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消新建'
        })
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
    handleDelete(val) {
      this.$confirm(`确定删除${val.title}？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用删除接口
        clauseDelete({ id: val.id }).then(res => {
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
    // 查看文件
    showFile(value) {
      this.selectRoute('managementMethods', 'view', value)
    }
  }
}
</script>
