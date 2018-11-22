<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 添加 or 编辑
-->
<template>
  <div class="department-input-container">
    <div class="form-header">
      <div class="header-left">
        <el-button @click="backList">返回列表</el-button>
      </div>
      <div class="header-right">
        <el-button
          type="primary"
          @click="submitForm(formData)">{{ todoType }}</el-button>
        <el-button @click="resetForm('refForm')">重置</el-button>
      </div>
    </div>
    <div class="form-title">
      <span>{{ todoType }}部门</span>
      <hr>
    </div>
    <el-form
      ref="refForm"
      :model="formData"
      label-width="100px">
      <el-form-item
        label="部门编码"
        prop="code">
        <el-input
          v-model="formData.code"
          type="text"
          clearable />
      </el-form-item>
      <el-form-item
        label="部门等级"
        prop="level">
        <el-input
          v-model="formData.level"
          type="text"
          clearable />
      </el-form-item>
      <el-form-item
        label="地址"
        prop="address">
        <el-input
          v-model="formData.address"
          type="text"
          clearable />
      </el-form-item>
      <el-form-item
        label="联系方式"
        prop="phone">
        <el-input
          v-model="formData.phone"
          type="text"
          clearable />
      </el-form-item>
    </el-form>
    <div class="form-title">
      <span>负责人</span>
      <hr>
    </div>
    <el-form
      v-for="(user,index) in formData.userList"
      :key="index"
      :ref="'departmentForm'+index"
      :model="user"
      label-width="80px">
      <el-form-item
        label="用户角色"
        prop="type">
        <el-input v-model="user.type" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="text"
          size="medium"
          @click="addDepatrment"><i class="el-icon-plus" />添加
        </el-button>
        <el-button
          :disabled="formData.userList.length === 1"
          type="text"
          size="medium"
          @click="delDepartment(index)"><i class="el-icon-delete" />删除
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { orgAdd, orgEdit } from '@/api/organizationalManagement'
export default {
  name: 'LoginManagementInput',
  components: {},
  props: {
    paramsData: {
      type: [Object, String, Array],
      required: false,
      default: ''
    }
  },
  data() {
    return {
      todoType: '',
      formData: {
        code: '',
        level: '',
        address: '',
        phone: '',
        userList: []
      }
    }
  },
  created() {
    this.init()
  },
  mounted() {
    if (this.paramsData) {
      const data = JSON.parse(JSON.stringify(this.paramsData))
      this.formData = data
    } else {
      return ''
    }
  },
  methods: {
    // 初始化
    init() {
      if (!this.paramsData) {
        this.todoType = '添加'
        this.addDepatrment()
        console.log(this.paramsData)
      } else {
        this.todoType = '编辑'
        // this.getDictionary()
        console.log(this.paramsData)
      }
    },
    // 返回列表
    backList() {
      this.$emit('view', 'list')
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 提交表单
    submitForm() {
      this.listLoading = true
      console.log(this.formData)
      const data = Object.assign({}, this.formData)
      this.$refs.refForm.validate(valid => {
        if (!valid) return
        if (this.paramsData) {
          orgEdit(data).then(res => {
            this.$message.success('编辑成功')
          })
        } else {
          orgAdd(data).then(res => {
            this.$message.success('新增成功')
          })
        }
        this.listLoading = false
      })
    },
    // 添加负责人
    addDepatrment() {
      this.formData.userList.push({
        type: ''
      })
    },
    // 删除负责人
    delDepartment(index) {
      this.formData.userList.splice(index, 1)
    }
  }
}

</script>
