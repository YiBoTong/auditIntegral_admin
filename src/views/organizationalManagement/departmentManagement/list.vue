<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 部门列表
-->
<!--suppress ALL -->
<template>
  <table-layout :has-left="hasDepTree" :has-pager="false">
    <org-tree slot="left" :is-admin="true" @click="departmentClick" @load="loadDep"/>
    <el-row slot="top">
      <div/>
      <el-col :span="5">
        <el-button v-if="authorEdit" type="primary" plain @click="handelAddOrEdit(null)">添加部门</el-button>
        <span v-else/>
      </el-col>
      <el-col :span="19" align="right">
        <el-form :model="paramsTable.search" :inline="true">
          <el-form-item label="部门名称">
            <el-input v-model="paramsTable.search.name" placeholder="请输入" clearable />
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
        prop="name"
        show-overflow-tooltip
        label="部门名称"/>
      <el-table-column
        prop="code"
        label="部门编码">
        <template slot-scope="scope">
          {{ scope.row.code || '—' }}
        </template>
      </el-table-column>
      <!--<el-table-column-->
      <!--prop="level"-->
      <!--label="部门级别"/>-->
      <el-table-column
        prop="address"
        label="地址">
        <template slot-scope="scope">
          {{ scope.row.address || '—' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系方式">
        <template slot-scope="scope">
          {{ scope.row.address || '—' }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="150"
        prop="updateTime"
        label="更新时间"/>
      <el-table-column
        v-if="authorEdit"
        prop="date"
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button
            :disabled="scope.row.id===1"
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
  </table-layout>
</template>
<script>
/* 当前组件必要引入 */
import Pagination from '@/components/Pagination/index'
import { departmentList, departmentDelete } from '@/api/organizationalManagement'
import OrgLayout from '@/components/OrgLayout/index'
import OrgTree from '@/components/OrgTree/index'
import TableLayout from '../../../components/TableLayout/TableLayout'

export default {
  name: 'DepartmentManagementList',
  components: { TableLayout, OrgTree, OrgLayout, Pagination },
  data() {
    return {
      tableLoading: false,
      listData: null,
      paramsTree: {
        parentId: -1
      },
      paramsTable: {
        'search': {
          'parentId': '',
          'name': '',
          'code': '',
          'level': ''
        }
      }
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
    // 获取table数据
    getListData() {
      this.tableLoading = true
      this.paramsTable.search.parentId = this.department.id
      departmentList(this.paramsTable).then(res => {
        if (!res.status.error) {
          this.listData = res.data || []
        } else {
          this.$message.error(res.status.msg)
        }
        this.tableLoading = false
      })
    },
    // 修改 或 添加
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
      if (column.property === 'name') {
        this.publishSubscribe('show', row)
      } else {
        return ''
      }
    },
    // 点击树
    departmentClick(data) {
      console.log(data)
      this.department = data
      this.getListData()
    }
  }
}

</script>
