<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 创建修改
-->
<template>
  <div
    v-loading="listLoading"
    class="department-show-container">
    <div class="form-header">
      <div class="header-left">
        <el-button @click="backList">返回列表</el-button>
      </div>
    </div>
    <el-card>
      <div slot="header" class="card-header">
        <span>查看部门</span>
      </div>
      <el-row :gutter="10">
        <el-form
          ref="refForm"
          :model="formData"
          label-width="100px"
          class="dict-add">
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 8}">
            <el-form-item label="部门名称">
              {{ formData.name }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 8}">
            <el-form-item label="部门编码">
              {{ formData.code | typeText }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 8}">
            <el-form-item label="部门级别">
              {{ formData.level }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 8}">
            <el-form-item label="地址">
              {{ formData.address }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 8}">
            <el-form-item label="联系方式">
              {{ formData.phone }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 8}">
            <el-form-item label="更新时间">
              {{ formData.updateTime }}
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-card>

    <el-card>
      <div slot="header" class="card-header">
        <span>部门负责人</span>
      </div>
      <el-table
        :data="formData.userList"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="100" />
        <el-table-column
          prop="userName"
          label="用户姓名" />
        <el-table-column
          prop="type"
          label="角色分类" />
      </el-table>
    </el-card>

  </div>
</template>
<script>
/* 当前组件必要引入 */
import { departmentGet } from '@/api/organizationalManagement'

export default {
  name: 'DepartmentManagementShow',
  components: {},
  props: {
    paramsData: {
      type: [Object, String],
      required: false,
      default: ''
    }
  },
  data() {
    return {
      listLoading: false,
      formData: {
        id: '',
        parent_id: '',
        code: '',
        level: '',
        address: '',
        phone: '',
        updateTime: '',
        userList: []
      },
      autosize: { minRows: 4, maxRows: 6 }
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
      if (this.paramsData) {
        this.departmentGet()
      }
    },
    // 返回列表
    backList() {
      this.$emit('view', 'list')
    },
    // 获取部门
    departmentGet() {
      const { id } = this.paramsData
      departmentGet({ id }).then(res => {
        if (!res.status.error) {
          this.formData = res.data
        } else {
          this.$message({
            type: 'error',
            message: res.status.msg + '!'
          })
        }
      })
    }
  }
}
</script>
