<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 添加 or 编辑
-->
<template>
  <div class="personnel-input-container">
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
      <span>编辑人员</span>
      <hr>
    </div>
    <el-form
      ref="refForm"
      :model="formData"
      label-width="100px">
      <el-form-item
        label="部门编码"
        prop="userName">
        <el-input
          v-model="formData.userName"
          type="text"
          clearable />
      </el-form-item>
      <el-form-item
        label="部门等级"
        prop="userCode">
        <el-input
          v-model="formData.userCode"
          type="text"
          clearable />
      </el-form-item>
      <el-form-item
        label="地址"
        prop="sex">
        <el-input
          v-model="formData.sex"
          type="text"
          clearable />
      </el-form-item>
      <el-form-item
        label="联系方式"
        prop="idCard">
        <el-input
          v-model="formData.idCard"
          type="text"
          clearable />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { userAdd, userEdit } from '@/api/organizationalManagement'
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
        userName: '',
        userCode: '',
        sex: '',
        idCard: ''
      }
    }
  },
  created() {
    this.init()
  },
  mounted() { },
  methods: {
    // 初始化
    init() {
      if (!this.paramsData) {
        this.todoType = '添加'
        console.log(this.paramsData)
      } else {
        this.todoType = '编辑'
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
          userEdit(data).then(res => {
            this.$message.success('编辑成功')
          })
        } else {
          userAdd(data).then(res => {
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
