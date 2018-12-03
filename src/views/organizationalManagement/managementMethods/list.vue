<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 人员列表
-->
<template>
  <div class="personnel-list-container">
    <div class="left-tree-container">
      <el-tree
        :lazy="true"
        :data="treeData"
        :props="struct"
        icon-class="tree"
        @node-click="treeEmit"
      >
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <el-button type="text">{{ node.label }}</el-button>
        </span>
      </el-tree>
      <!--<org-tree @click="orgTreeClick" @open="orgTreeOpen"/>-->
    </div>
    <div class="right-table-container">
      <el-row class="public-table-header">
        <el-col :span="2">
          <div>
            <el-button
              type="primary"
              plain
              @click="handelAddOrEdit(null)">添加办法</el-button>
          </div>
        </el-col>
        <el-col
          :span="22"
          class="right-col">
          <div>
            <el-form
              :model="paramsTable.search"
              :inline="true">
              <el-form-item label="办法标题">
                <el-input
                  v-model="paramsTable.search.title"
                  placeholder="请输入"
                  clearable />
              </el-form-item>
              <el-button
                type="primary"
                plain
                @click="getListData">搜索</el-button>
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
            prop="title"
            show-overflow-tooltip
            label="管理办法" />
          <el-table-column
            prop="authorName"
            label="发布人" />
          <el-table-column
            prop="state"
            label="状态" >
            <template slot-scope="scope">
              {{ scope.row.state | typeText }}
            </template>
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="更新时间" />
          <el-table-column
            prop="date"
            label="操作"
            align="center">
            <template slot-scope="scope">
              <el-button
                :disabled="scope.row.state!='draft'"
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
      <div class="public-pagination">
        <pagination
          :total="paginationPage.total"
          :page="paginationPage.page"
          :limit="paginationPage.size"
          :page-sizes="pageSizes"
          @pagination="paginationEmit" />
      </div>
    </div>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import Pagination from '@/components/Pagination/index'
import Tree from '@/components/Tree/index'
import { clauseList, clauseDelete, departmentTree } from '@/api/organizationalManagement'
import OrgTree from '@/components/OrgTree/index'

export default {
  name: 'MMList',
  // props: [],
  components: { OrgTree, Pagination, Tree },
  data() {
    return {
      treeData: [],
      listData: [],
      paramsTree: {
        parentId: -1
      },
      paramsTable: {
        'page': {
          'page': 1,
          'size': 20
        },
        'search': {
          'title': '',
          'state': '',
          'startTime': '',
          'endTime': ''
        }
      },
      paginationPage: {
        total: 0,
        page: 1,
        size: 20
      },
      pageSizes: [10, 20, 30, 40, 50],
      struct: {
        label: 'name',
        children: 'children',
        isLeaf: 'hasChild'
      }
    }
  },
  created() {
    this.init()
  },
  activated() {
    this.getListData()
  },
  mounted() {
  },
  methods: {
    // 初始化
    init() {
      this.getListData()
      this.getdepartmentTree().then(treeData => {
        this.treeData = treeData
      })
    },
    // 获取部门树
    getdepartmentTree(parentId) {
      const data = {
        parentId: parentId || this.parentId
      }
      return new Promise((resolve, reject) => {
        departmentTree(data).then(res => {
          const treeData = res.data || []
          treeData.map(v => {
            v.children = []
            v.open = false
            v.getChild = false
          })
          console.log(treeData)
          resolve(treeData)
        })
      })
    },
    orgTreeClick() {

    },
    orgTreeOpen() {

    },
    getListData() {
      clauseList(this.paramsTable).then(res => {
        this.paginationPage = res.page
        this.listData = res.data || []
      })
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
        clauseDelete({ id: row.userId }).then(res => {
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
    // tree子组件传递过来的数据
    treeEmit(label, value) {
      console.log(label, value)
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
