<template>
  <div class="login-management-container">
    <div class="login-management-top">
      <div class="top-create">
        <el-button
          type="primary"
          plain
          @click="handelUpdateOrCreate(null)">添加</el-button>
      </div>
      <div class="top-form">
        <el-form>
          <el-form-item label="登录管理:">
            <el-input
              placeholder="请输入"
              prefix-icon="el-icon-search"/>
            <el-button
              type="primary"
              plain>搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="public-table">
      <el-table
        :data="paramsData"
        height="100%"
        style="width: 100%;">
        <el-table-column
          prop="projectName"
          label="项目名称">
          <template slot-scope="scope">
            <el-button type="text">
              {{ scope.row.projectName }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="number"
          label="编号"/>
        <el-table-column
          prop="departmentName"
          label="检查机构"/>
        <el-table-column
          prop="queryDepartmentName"
          label="被检查机构"/>
        <el-table-column
          prop="adminUserName"
          label="检查人"/>
        <el-table-column
          prop="state"
          label="状态">
          <template slot-scope="scope">
            {{ scope.row.state | typeText }}
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          label="日期"/>
        <el-table-column
          prop="date"
          label="操作"
          width="220"
          align="center">
          <template slot-scope="scope">
            <el-button
              :disabled="scope.row.state=='publish'"
              type="text"
              @click="handlePublish(scope.row)">发布</el-button>
            <el-button
              type="text"
            >打印</el-button>
            <el-button
              :disabled="scope.row.state=='publish'"
              type="text"
              @click="handelUpdateOrCreate(scope.row)"><i class="el-icon-edit"/>修改</el-button>
            <el-button
              :disabled="scope.row.state=='publish'"
              type="text"
              @click="handleDelete(scope.row)"><i class="el-icon-delete"/>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="public-pagination">
      <pagination
        :total="3"
        @pagination="paginationEmit"/>
    </div>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import Axios from 'axios'
import Pagination from '@/components/Pagination/index'
// import { loginList, loginAdd, loginEdit, loginDelete } from '@/api/systemManagement'

export default {
  name: 'LoginManagementList',
  components: { Pagination },
  // props: [],
  data() {
    return {
      paramsData: undefined
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
      Axios.get('../../static/mock/workManuscript.json').then(this.getTableData)
    },
    // 获取table数据
    getTableData(res) {
      this.paramsData = res.data || []
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
        // logDelete({ id: 1 }).then(res => {
        //   if (res) {
        //     this.$message({
        //       type: 'success',
        //       message: '删除成功!'
        //     })
        //   } else {
        //     this.$message({
        //       type: 'error',
        //       message: '删除失败，请重试!'
        //     })
        //   }
        // })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 分页子组件传递过来的信息
    paginationEmit(page, limit) {
      console.log(page, limit)
    }
  }
}

</script>
