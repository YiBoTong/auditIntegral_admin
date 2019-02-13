<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 人员列表
-->
<template>
  <div style="height:100%">
    <table-layout :has-left="hasDepTree">
      <org-tree slot="left" @click="departmentClick" @load="loadDep"/>
      <el-row slot="top">
        <el-col :span="12">
          <template v-if="authorEdit">
            <el-button type="primary" plain @click="selectRoute('personnelManagement', 'add', department, department)">添加人员</el-button>
            <el-button type="primary" plain @click="openOrCloseUploadXlsxCall(true)">导入人员</el-button>
          </template>
          <span v-else/>
        </el-col>
        <el-col :span="12" align="right">
          <el-form :model="paramsTable.search" :inline="true">
            <el-form-item label="姓名">
              <el-input v-model="paramsTable.search.userName" placeholder="请输入" clearable/>
            </el-form-item>
            <el-button type="primary" plain @click="getListData">搜索</el-button>
          </el-form>
        </el-col>
      </el-row>
      <el-table v-loading="tableLoading" :data="listData" :cell-style="cellStyle" height="100%" @cell-click="cellClick">
        <el-table-column prop="userName" show-overflow-tooltip label="姓名"/>
        <el-table-column show-overflow-tooltip prop="userCode" label="员工号"/>
        <el-table-column prop="class" show-overflow-tooltip label="名族">
          <template slot-scope="scope">{{ scope.row.class || '—' }}</template>
        </el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">{{ scope.row.sex | userChange }}</template>
        </el-table-column>
        <el-table-column prop="phone" show-overflow-tooltip label="联系方式">
          <template slot-scope="scope">{{ scope.row.phone || '—' }}</template>
        </el-table-column>
        <el-table-column prop="idCard" label="身份证号" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.idCard || '—' }}</template>
        </el-table-column>
        <el-table-column prop="updateTime" show-overflow-tooltip label="更新时间"/>
        <el-table-column v-if="authorEdit" prop="date" label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              :disabled="scope.row.userId<0"
              type="text"
              size="small"
              @click="handleDelete(scope.row)"
            >删除</el-button>
            <el-button type="text" size="small" @click="selectRoute('personnelManagement','edit',scope.row,scope.row)">管理</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        slot="pager"
        :total="paginationPage.total"
        :page="paginationPage.page"
        :limit="paginationPage.size"
        :page-sizes="pageSizes"
        @pagination="paginationEmit"
      />
    </table-layout>
    <el-dialog :visible.sync="openUploadXlsx" :title="`导入人员${department&&department.name?'到'+department.name:''}`">
      <upload-xlsx v-if="openUploadXlsx" :params-data="department" @upload="uploadXlsxCall"/>
    </el-dialog>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import Pagination from '@/components/Pagination/index'
import { userList, userDelete } from '@/api/organizationalManagement'
import OrgLayout from '@/components/OrgLayout/index'
import OrgTree from '@/components/OrgTree/index'
import TableLayout from '../../../components/TableLayout/TableLayout'
import UploadXlsx from '../../../components/uploadXlsx/uploadXlsx'

export default {
  name: 'PersonnelManagementList',
  components: { TableLayout, OrgTree, OrgLayout, Pagination, UploadXlsx },
  data() {
    return {
      tableLoading: false,
      listData: null,
      openUploadXlsx: false,
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
      pageSizes: [10, 20, 30, 40, 50],
      department: null
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
    },
    // 获取list数据
    getListData() {
      this.tableLoading = true
      this.paramsTable.search.departmentId = this.department.id
      userList({ page: this.paginationPage, search: this.paramsTable.search }).then(res => {
        if (!res.status.error) {
          this.paginationPage = res.page
          this.listData = res.data || []
        } else {
          this.$message.error(res.status.msg)
        }
        this.tableLoading = false
      })
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
        this.selectRoute('personnelManagement', 'view', row)
      } else {
        return ''
      }
    },
    openOrCloseUploadXlsxCall(open = false) {
      if (open && this.checkHasDep()) {
        this.openUploadXlsx = open
      } else if (!open) {
        this.openUploadXlsx = open
      }
    },
    uploadXlsxCall(update) {
      this.openOrCloseUploadXlsxCall()
      if (update) {
        this.getListData()
      }
    },
    // 默认显示的部门信息
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
    // 选择部门
    departmentClick(data) {
      console.log(data)
      this.department = data
      this.getListData()
    }
  }
}
</script>
