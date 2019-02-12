<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 字典管理列表
-->
<template>
  <table-layout>
    <el-row slot="top">
      <el-col :span="2">
        <el-button v-if="authorEdit" type="primary" plain @click="selectRoute('dictionaryManagement','add',null)">添加</el-button>
        <span v-else/>
      </el-col>
      <el-col :span="22" align="right">
        <el-form v-model="search" :inline="true">
          <el-form-item label="字典类型">
            <el-input
              v-model="search.title"
              placeholder="请输入"
              prefix-icon="el-icon-search"
              clearable />
          </el-form-item>
          <el-form-item label="字典分类">
            <el-select
              v-model="search.key"
              clearable
              placeholder="请选择">
              <el-option
                v-for="(item,index) in dictionaries"
                :key="index"
                :value="item.key"
                :label="item.value" />
            </el-select>
          </el-form-item>
          <el-button
            type="primary"
            plain
            @click="getListData">搜索
          </el-button>
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
        label="字典类型" />
      <el-table-column
        prop="isUse"
        label="是否启用">
        <template slot-scope="scope">
          {{ scope.row.isUse | typeText }}
        </template>
      </el-table-column>
      <el-table-column
        :formatter="formatterType"
        prop="key"
        show-overflow-tooltip
        label="字典分类" />
      <el-table-column
        prop="userName"
        show-overflow-tooltip
        label="更新人姓名">
        <template slot-scope="scope">
          {{ scope.row.userName || '—' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="updateTime"
        show-overflow-tooltip
        label="最后更新时间" />
      <el-table-column
        v-if="authorEdit"
        prop="date"
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button
            :disabled="scope.row.id < 0"
            type="text"
            size="small"
            @click="handleState(scope.row)">{{ scope.row.isUse | startText }}
          </el-button>
          <el-button
            :disabled="scope.row.id > 0 && scope.row.isUse"
            type="text"
            size="small"
            @click="selectRoute('dictionaryManagement','edit',scope.row,scope.row)">修改
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
import { dictList, dictDelete, dictGet, dictEdit } from '@/api/systemManagement'
import TableLayout from '../../../components/TableLayout/TableLayout'

export default {
  name: 'DictionaryManagementList',
  components: { TableLayout, Pagination },
  // props: [],
  data() {
    return {
      self: this,
      listData: [],
      formData: '',
      paginationPage: {
        total: 0,
        page: 1,
        size: 20
      },
      pageSizes: [10, 20, 30, 40, 50],
      search: {
        'title': '',
        'key': '',
        'userId': ''
      },
      dictionaries: [],
      canEdit: false
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
      this.getSeleteDict()
    },
    // 获取数据 搜索
    getListData() {
      this.tableLoading = true
      dictList({ page: this.paginationPage, search: this.search }).then(res => {
        if (!res.status.error) {
          this.listData = res.data || []
          this.paginationPage = res.page
        } else {
          this.$message.error(res.status.msg)
        }
        this.tableLoading = false
      })
    },
    // 获取字典类型
    getSeleteDict() {
      dictGet({ id: -1 }).then(res => {
        this.dictionaries = res.data.dictionaries || []
      })
    },
    // 操作状态
    handleState(row) {
      const newState = !row.isUse
      dictGet({ id: row.id }).then(res => {
        if (!res.status.error) {
          this.formData = res.data
          this.formData.isUse = newState
          const stateStr = newState ? '启用' : '撤销'
          this.$confirm('确定' + stateStr + '？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            dictEdit(this.formData).then((res) => {
              this.$message({
                type: 'success',
                message: '已' + stateStr + '！'
              })
              if (!res.status.error) {
                this.getListData()
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消' + stateStr
            })
          })
        } else {
          this.$message({
            type: 'error',
            message: res.status.msg + '!'
          })
        }
      })
    },
    // 字典类型转换显示
    formatterType(row) {
      switch (row.key) {
        case 'system':
          return '系统'
        case 'yes':
          return '其他'
        case 'other':
          return '其他'
      }
    },
    // 删除
    handleDelete(row) {
      this.$confirm('确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用删除接口
        dictDelete({ id: row.id }).then(res => {
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
        this.selectRoute('dictionaryManagement', 'view', row)
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
