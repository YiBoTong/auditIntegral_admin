<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 字典管理列表
-->
<template>
  <div class="dictionary-management-container">
    <div class="dictionary-management-top">
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
          <el-form-item label="字典类型">
            <el-select
              v-model="search.key"
              placeholder="请选择">
              <el-option
                v-for="(item,index) in dictionaries"
                :key="index"
                :value="item.key"
                :label="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="字典:">
            <el-input
              v-model="search.title"
              placeholder="请输入字典"
              prefix-icon="el-icon-search" />
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
          label="字典类型名称" />
        <el-table-column
          prop="isUse"
          label="是否启用">
          <template slot-scope="scope">
            {{ scope.row.isUse | typeText }}
          </template>
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="最后更新时间" />
        <el-table-column
          :formatter="formatterType"
          prop="describe"
          label="字典类型" />
        <el-table-column
          prop="userName"
          label="更新人姓名">
          <template slot-scope="scope">
            {{ scope.row.userName || '——' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleState(scope.row)">{{ scope.row.isUse | startText }}
            </el-button>
            <el-button
              :disabled="scope.row.isUse"
              type="text"
              size="small"
              @click="handelUpdateOrCreate(scope.row)">修改
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
import { dictList, dictDelete, dictGet, dictEdit } from '@/api/systemManagement'

export default {
  name: 'DictionaryManagementList',
  components: { Pagination },
  // props: [],
  data() {
    return {
      listLoading: false,
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
      this.getSeleteDict()
    },
    // 获取数据 搜索
    getListData() {
      dictList({ page: this.paginationPage, search: this.search }).then(res => {
        this.listData = res.data.data || []
        this.paginationPage = res.data.page
      })
    },
    // 获取字典类型
    getSeleteDict() {
      dictGet({ id: -1 }).then(res => {
        this.dictionaries = res.data.data.dictionaries || []
      })
    },
    // 操作状态
    handleState(row) {
      const newState = !row.isUse
      dictGet({ id: row.id }).then(res => {
        if (!res.data.status.error) {
          this.formData = res.data.data
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
              if (!res.data.status.error) {
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
            message: res.data.status.msg + '!'
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
        dictDelete({ id: row.id }).then(res => {
          if (res) {
            this.$message({
              type: res.data.status.error ? 'error' : 'success',
              message: (res.data.status.msg || '完成删除操作') + '!'
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
