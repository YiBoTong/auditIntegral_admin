<!--
****--@date     2018-12-10 17:48
****--@author   XXL
****--@describe 稽核方案
-->
<template>
  <div class="login-input-container">
    <div class="form-header">
      <div class="header-left">
        <el-button @click="backList">返回列表</el-button>
      </div>
    </div>
    <el-card>
      <div slot="header" class="card-header">
        <div class="header-left">
          <span>{{ todoType | typeText }}登录人员</span>
        </div>
        <div class="header-right">
          <el-button
            :disabled="!canEdit"
            type="primary"
            size="small"
            @click="submitForm">完成
          </el-button>
          <el-button
            :disabled="!canEdit"
            size="small"
            @click="resetForm('refForm')">重置</el-button>
        </div>
      </div>
      <el-row :gutter="10">
        <el-form
          ref="refForm"
          :model="formData"
          :disabled="!canEdit"
          label-width="100px"
          class="dict-add">
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 12}"
            :xl="{span: 12}">
            <el-form-item
              label="员工号"
              prop="userCode">
              <el-input
                v-model="formData.userCode"
                type="text"
                clearable
                suffix-icon="el-icon-user" />
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 12}"
            :xl="{span: 12}">
            <el-form-item label="是否启用">
              <el-switch
                v-model="formData.isUse"
                active-color="#13ce66"
                inactive-color="#ff4949" />
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { loginAdd, loginEdit } from '@/api/systemManagement'

export default {
  name: 'LoginManagementInput',
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
          type: res.status.error ? 'error' : 'success',
          message: res.status.msg + '!'
        })
        if (!res.status.error) {
          this.backList()
        }
      })
    },
    // 编辑
    editUser(data) {
      loginEdit(data).then((res) => {
        this.$message({
          type: res.status.error ? 'error' : 'success',
          message: res.status.msg + '!'
        })
        if (!res.status.error) {
          this.backList()
        }
      })
    }
  }
}

</script>
