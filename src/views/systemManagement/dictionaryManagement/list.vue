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
          @click="handelUpdateOrCreate(null)">添加</el-button>
      </div>
      <div class="top-form">
        <el-form>
          <el-form-item label="字典:">
            <el-input
              v-model="search.title"
              placeholder="请输入字典"
              prefix-icon="el-icon-search" />
            <el-button
              type="primary"
              plain
              @click="searchList">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="public-table">
      <el-table
        :data="listData"
        :cell-style="cellStyle"
        height="100%"
        empty-text="sss"
        @cell-click="cellClick">
        <el-table-column
          prop="title"
          label="字典类型名称" />
        <el-table-column
          :formatter="formatState"
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
          prop="describe"
          label="字典类型描述" />
        <el-table-column
          :formatter="formatData"
          prop="userName"
          label="更新人姓名">
          <template slot-scope="scope">
            {{ scope.row.userName || "-" }}
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
              @click="handlePublish(scope.row)">发布</el-button>
            <el-button
              type="text"
              size="small"
              @click="handelUpdateOrCreate(scope.row)">修改</el-button>
            <el-button
              type="text"
              size="small"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="public-pagination">
      <pagination
        :total="paginationPage.total"
        :page="paginationPage.page"
        :page-size="paginationPage.size"
        @pagination="paginationEmit" />
    </div>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import Axios from 'axios'
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
      paginationPage: {},
      page: {
        'page': 1,
        'size': 20
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
  methods: {
    // 初始化
    init() {
      Axios.get('../../static/mock/tableData.json').then(this.getTableData)
      const page = this.page
      const search = this.search
      dictList({ page, search }).then(res => {
        const data = res.data
        if (!data.status.error) {
          this.listData = data.data
          this.paginationPage = data.page
        }
      })
    },
    // 获取table数据
    getTableData(res) {
      this.paramsData = res.data.noticeBulletinData
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
        dictDelete({ id: 1 }).then(res => {
          if (res) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
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
      const page = Object.assign(paginationPage, paginationSize)
      const search = this.search
      dictList({ page, search }).then(res => {
        const data = res.data
        if (!data.status.error) {
          this.listData = data.data
          this.paginationPage = data.page
        }
      })
    },
    // 搜索
    searchList() {
      const search = this.search
      dictList({ search }).then(res => {
        const data = res.data
        if (!data.status.error) {
          this.listData = data.data
        }
      })
    },
    // 是否启用
    formatState(row, column) {
      return row.isUse === true ? '是' : '否'
    },
    // 数据为空时
    formatData(row, column) {
      return row.userName === '' ? '——' : row.userName
    }
  }
}
</script>
