<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 部门列表
-->
<template>
  <div class="department-list-container">
    <div class="left-tree-container">
      <tree
        :tree-data="treeData"
        @tree="treeEmit" />
    </div>
    <div class="right-table-container">
      <el-row class="public-table-header">
        <el-col span="2">
          <div>
            <el-button
              type="primary"
              @click="handelAddOrEdit(null)">添加部门</el-button>
          </div>
        </el-col>
        <el-col
          span="22"
          class="right-col">
          <div>
            <el-form
              :model="paramsTable.search"
              :inline="true">
              <el-form-item label="部门标题">
                <el-input
                  v-model="paramsTable.search.title"
                  placeholder="" />
              </el-form-item>
              <el-button type="primary">搜索</el-button>
            </el-form>
          </div>
        </el-col>
      </el-row>
      <div class="public-table">
        <el-table
          :data="listData"
          :cell-style="cellStyle"
          height="100%"
          @cell-click="cellClick">
          <el-table-column
            prop="name"
            label="部门名称" />
          <el-table-column
            prop="code"
            label="部门编码" />
          <el-table-column
            prop="level"
            label="部门级别" />
          <el-table-column
            prop="address"
            label="地址" />
          <el-table-column
            prop="phone"
            label="联系方式" />
          <el-table-column
            min-width="150"
            prop="updateTime"
            label="更新时间" />
          <el-table-column
            prop="date"
            label="操作"
            align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="handleDelete(scope.row)">删除</el-button>
              <el-button
                type="text"
                size="small"
                @click="handelAddOrEdit(scope.row)">管理</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import Pagination from '@/components/Pagination/index'
import Tree from '@/components/Tree/index'
import { departmentList, departmentDelete, departmentTree } from '@/api/organizationalManagement'

export default {
  name: 'DepartmentManagementList',
  // props: [],
  components: { Pagination, Tree },
  data() {
    return {
      treeData: [],
      listData: [],
      paramsTree: {
        parentId: -1
      },
      paramsTable: {
        'search': {
          'parentId': '',
          'title': '',
          'code': '',
          'level': ''
        }
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
      this.getdepartmentTree()
      this.getListData()
    },
    // 获取部门树
    getdepartmentTree() {
      departmentTree(this.paramsTree).then(res => {
        const treeData = res.data.data || []
        treeData.map(v => {
          v.label = v.name
          v.children = {}
          delete v.name
        })
        console.log(treeData)
        this.treeData = treeData
      })
    },
    // 获取table数据
    getListData() {
      departmentList(this.paramsTable).then(res => {
        this.listData = res.data.data || []
      })
    },
    // 发布
    handlePublish() {
    },
    // 修改 或 创建
    handelAddOrEdit(obj) {
      this.publishSubscribe('input', obj)
      console.log(obj)
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
        departmentDelete({ id: row.id }).then(res => {
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
    // tree子组件传递过来的数据
    treeEmit(value) {
      if (value) {
        this.paramsTable.search.parentId = value.id
        this.getListData()
      }
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
      if (column.property === 'name') {
        this.publishSubscribe('show', row)
      } else {
        return ''
      }
    }
  }
}

</script>
