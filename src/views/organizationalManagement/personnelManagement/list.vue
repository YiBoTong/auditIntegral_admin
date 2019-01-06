<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 人员列表
-->
<template>
  <table-layout :has-left="true">
    <org-tree slot="left" @click="departmentClick"/>
    <el-row slot="top">
      <el-col :span="5">
        <el-button v-if="authorEdit" type="primary" plain @click="handelAddOrEdit(null)">添加人员</el-button>
        <span v-else/>
      </el-col>
      <el-col :span="19" align="right">
        <el-form :model="paramsTable.search" :inline="true">
          <el-form-item label="人员姓名">
            <el-input
              v-model="paramsTable.search.userName"
              placeholder="请输入"
              clearable/>
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
      :data="listData"
      :cell-style="cellStyle"
      height="100%"
      @cell-click="cellClick">
      <el-table-column
        prop="userName"
        show-overflow-tooltip
        label="人员姓名"/>
      <el-table-column
        show-overflow-tooltip
        prop="userCode"
        label="员工号"/>
      <el-table-column
        prop="class"
        show-overflow-tooltip
        label="名族">
        <template slot-scope="scope">
          {{ scope.row.class || '—' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别">
        <template slot-scope="scope">
          {{ (scope.row.sex || "—") | userChange }}
        </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        show-overflow-tooltip
        label="联系方式">
        <template slot-scope="scope">
          {{ scope.row.phone || '—' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="idCard"
        label="身份证号"
        show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.idCard || '—' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="updateTime"
        show-overflow-tooltip
        label="更新时间"/>
      <el-table-column
        v-if="authorEdit"
        prop="date"
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button
            :disabled="scope.row.userId<0"
            type="text"
            size="small"
            @click="handleDelete(scope.row)">删除
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="handelAddOrEdit(scope.row)">管理
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
      @pagination="paginationEmit"/>
  </table-layout>
</template>
<script>
/* 当前组件必要引入 */
import Pagination from '@/components/Pagination/index'
import { userList, userDelete, departmentTree } from '@/api/organizationalManagement'
import OrgLayout from '@/components/OrgLayout/index'
import OrgTree from '@/components/OrgTree/index'
import TableLayout from '../../../components/TableLayout/TableLayout'

export default {
  name: 'PersonnelManagementList',
  components: { TableLayout, OrgTree, OrgLayout, Pagination },
  data() {
    return {
      listData: [],
      department: null,
      paramsTable: {
        'page': {
          'page': 1,
          'size': 20
        },
        'search': {
          'userName': '',
          'userCode': '',
          'departmentId': '',
          'sex': ''
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
    this.getListData()
  },
  mounted() {
  },
  methods: {
    // 初始化
    init() {
      // 鉴权
      this.getAuthorEdit(this.$route)
      this.getListData()
      this.getdepartmentTree()
    },
    // 获取部门树
    getdepartmentTree() {
      departmentTree(this.paramsTree).then(res => {
        const treeData = res.data || []
        treeData.map(v => {
          v.label = v.name
          v.children = {}
          delete v.name
        })
        this.treeData = treeData
      })
    },
    // 获取list数据
    getListData() {
      userList({ page: this.paginationPage, search: this.paramsTable.search }).then(res => {
        this.paginationPage = res.page
        this.listData = res.data || []
      })
    },
    // 修改 或 创建
    handelAddOrEdit(obj) {
      const data = this.department
      if (data || obj !== null) {
        if (obj) {
          this.publishSubscribe('input', obj)
        } else {
          this.publishSubscribe('input', data)
        }
      } else {
        this.$message({
          type: 'info',
          message: '请先选择部门'
        })
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
        userDelete({ id: row.userId }).then(res => {
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
      if (column.property === 'userName') {
        this.publishSubscribe('show', row)
      } else {
        return ''
      }
    },
    // 选择部门
    departmentClick(data) {
      console.log(data)
      this.department = data
      this.paramsTable.search.departmentId = data.id
      this.getListData()
    }
  }
}
</script>
