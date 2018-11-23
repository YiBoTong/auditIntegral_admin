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
        <el-form>
          <el-form-item label="字典:">
            <el-input
              v-model="search.title"
              placeholder="请输入字典"
              prefix-icon="el-icon-search"/>
            <el-button
              type="primary"
              plain
              @click="getListData">搜索
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="public-table">
      <el-table
        :data="listData"
        :cell-style="cellStyle"
        height="100%"
        empty-text="暂无数据"
        @cell-click="cellClick">
        <el-table-column
          prop="title"
          label="字典类型名称"/>
        <el-table-column
          prop="isUse"
          label="是否启用">
          <template slot-scope="scope">
            {{ scope.row.isUse | typeText }}
          </template>
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="最后更新时间"/>
        <el-table-column
          prop="describe"
          label="字典类型描述"/>
        <el-table-column
          prop="userName"
          label="更新人姓名">
          <template slot-scope="scope">
            {{ scope.row.userName || '-' }}
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
              @click="handlePublish(scope.row)">发布
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="handelUpdateOrCreate(scope.row)">修改
            </el-button>
            <el-button
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
        :page-size="paginationPage.size"
        @pagination="paginationEmit"/>
    </div>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import Pagination from '@/components/Pagination/index'
import { dictList, dictDelete } from '@/api/systemManagement'

export default {
  name: 'DictionaryManagementList',
  components: { Pagination },
  // props: [],
  data() {
    return {
      listLoading: false,
      listData: [],
      paginationPage: {
        total: 0,
        page: 1,
        size: 20
      },
      search: {
        'title': '',
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
  activated() {
    this.getListData()
  },
  methods: {
    // 初始化
    init() {
      this.getListData()
    },
    getListData() {
      dictList({ page: this.paginationPage, search: this.search }).then(res => {
        this.listData = res.data.data || []
        this.paginationPage = res.data.page
      })
    },
    // 发布
    handlePublish() {
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
    paginationEmit(paginationPage, paginationSize) {
      this.paginationPage.page = paginationPage.page
      this.paginationPage.size = paginationPage.limit
      this.getListData()
    }
  }
}
</script>
