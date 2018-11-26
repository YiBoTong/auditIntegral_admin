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
      <!--  -->
    </div>
    <br>
    <div class="form-title">
      <span>查看部门</span>
      <hr>
    </div>
    <el-form
      ref="refForm"
      :model="formData"
      label-width="100px"
      disabled
      class="department-form">
      <el-form-item
        label="类型标题"
        prop="title">
        <el-input
          v-model="formData.name"
          type="text" />
      </el-form-item>
      <el-form-item label="部门编码">
        <el-input
          v-model="formData.code"
          disabled/>
      </el-form-item>
      <el-form-item label="部门级别">
        <el-input
          v-model="formData.level"
          disabled/>
      </el-form-item>
      <el-form-item label="地址">
        <el-input
          v-model="formData.address"
          type="text"
          disabled />
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input
          v-model="formData.phone"
          type="text"
          disabled />
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input
          v-model="formData.phone"
          type="text"
          disabled />
      </el-form-item>
      <el-form-item label="更新时间">
        <el-input
          v-model="formData.updateTime"
          type="text"
          disabled />
      </el-form-item>
    </el-form>
    <div class="form-title">
      <span>部门负责人</span>
      <hr>
    </div>
    <el-form
      v-for="(user,index) in formData.userList"
      :key="index"
      :ref="'userForm'+index"
      :model="user"
      label-width="80px"
      disabled
      class="person-form">
      <el-form-item
        label="键"
        prop="userId">
        <el-input v-model="user.userId" />
      </el-form-item>
      <el-form-item
        label="值"
        prop="userName">
        <el-input v-model="user.userName" />
      </el-form-item>
      <el-form-item
        label="备注"
        prop="type">
        <el-input v-model="user.type" />
      </el-form-item>
    </el-form>
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
        if (!res.data.status.error) {
          this.formData = res.data.data
        } else {
          this.$message({
            type: 'error',
            message: res.data.status.msg + '!'
          })
        }
      })
    }
  }
}
</script>
