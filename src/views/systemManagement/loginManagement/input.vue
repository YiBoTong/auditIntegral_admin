<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 创建修改
-->
<template>
  <div
    v-loading="listLoading"
    class="dict-container">
    <div class="form-header">
      <div class="header-left">
        <el-button @click="backList">返回列表</el-button>
      </div>
      <div class="header-right">
        <el-button
          :disabled="!canEdit"
          type="primary"
          @click="submitForm">完成
        </el-button>
        <el-button
          :disabled="!canEdit"
          @click="resetForm('refForm')">重置</el-button>
      </div>
    </div>
    <br>
    <div class="dict-title">
      <span>{{ todoType | typeText }}登录人员</span>
      <hr>
    </div>
    <el-form
      ref="refForm"
      :rules="loginTypeRules"
      :model="formData"
      :disabled="!canEdit"
      label-width="100px"
      class="dict-add">
      <el-form-item
        label="员工号"
        prop="userCode">
        <el-input
          v-model="formData.userCode"
          type="text"
          clearable />
      </el-form-item>
      <el-form-item label="是否启用">
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
import { dictionaryType as loginTypeRules, dictionary as loginRules } from '../rules'
import { loginAdd, loginEdit } from '@/api/systemManagement'

export default {
  name: 'DictionaryManagementInput',
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
      loginRules,
      loginTypeRules,
      formData: {
        userCode: '',
        isUse: ''
      },
      dictionaries: [],
      todoType: 'Add',
      canEdit: true
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
      if (!this.paramsData) {
        return ''
      } else {
        this.todoType = 'Edit'
        this.formData = this.paramsData
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
      // this.listLoading = true
      console.log(this.formData)
      this.$refs.refForm.validate(valid => {
        if (!valid) return false
        const data = Object.assign({}, this.formData)
        this[this.todoType.toLocaleLowerCase() + 'User'](data)
      })
    },
    // 创建
    addUser(data) {
      loginAdd(data).then((res) => {
        this.$message({
          type: res.data.status.error ? 'error' : 'success',
          message: res.data.status.msg + '!'
        })
        if (!res.data.status.error) {
          this.backList()
        }
      })
    },
    // 编辑
    editUser(data) {
      loginEdit(data).then((res) => {
        this.$message({
          type: res.data.status.error ? 'error' : 'success',
          message: res.data.status.msg + '!'
        })
        if (!res.data.status.error) {
          this.backList()
        }
      })
    }
  }
}

</script>
