<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 创建修改
-->
<template>
  <div class="form-container">
    <div class="form-header">
      <div class="header-left">
        <el-button @click="backList">返回列表</el-button>
      </div>
      <div class="header-right">
        <el-button
          type="primary"
          @click="submitForm">{{ todoType }}</el-button>
        <el-button @click="resetForm('refForm')">重置</el-button>
      </div>
    </div>
    <el-form
      ref="refForm"
      :model="formData"
      label-width="100px">
      <el-form-item
        label="员工号"
        prop="notificationScope">
        <el-input
          v-model="formData.userCode"
          type="text"
          clearable />
      </el-form-item>
      <el-form-item
        label="是否启用"
        prop="notificationScope">
        <el-switch
          v-model="formData.isUse"
          active-color="#13ce66"
          inactive-color="#ff4949" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { loginList, loginAdd, loginEdit } from '@/api/systemManagement'

export default {
  name: 'LoginManagementInput',
  components: {},
  props: {
    paramsData: {
      type: [Object, String],
      // 选择不必填
      required: false,
      default: ''
    }
  },
  data() {
    return {
      listLoading: false,
      todoType: '',
      formData: {
        isUse: '',
        userCode: ''
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
      } else {
        this.todoType = '编辑'
        this.getLoginList()
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
    // 获取登录列表
    getLoginList() {
      loginList().then(res => {

      })
    },
    // 提交表单
    submitForm() {
      const data = Object.assign({}, this.formData)
      this.$refs.refForm.validate(valid => {
        if (!valid) return
        if (!this.formData) {
          loginEdit(data).then(res => {
            this.$message.success('编辑成功')
          })
        } else {
          loginAdd(data).then(res => {
            this.$message.success('新增成功')
          })
        }
      })
    }
  }
}

</script>
