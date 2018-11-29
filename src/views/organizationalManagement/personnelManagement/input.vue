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
          @click="submitForm(formData)">{{ todoType | typeText }}</el-button>
        <el-button @click="resetForm('refForm')">重置</el-button>
      </div>
    </div>
    <div class="form-title">
      <span>{{ todoType | typeText }}人员</span>
      <hr>
    </div>
    <el-row>
      <el-form
        ref="refForm"
        :model="formData"
        label-width="100px">
        <el-col
          :xs="{span: 24}"
          :sm="{span: 12}"
          :md="{span: 12}"
          :lg="{span: 8}"
          :xl="{span: 6}">
          <el-form-item
            label="人员姓名"
            prop="userName">
            <el-input
              v-model="formData.userName"
              type="text"
              clearable />
          </el-form-item>
        </el-col>
        <el-col
          :xs="{span: 24}"
          :sm="{span: 12}"
          :md="{span: 12}"
          :lg="{span: 8}"
          :xl="{span: 6}">
          <el-form-item
            label="员工号"
            prop="userCode">
            <el-input
              v-model="formData.userCode"
              type="text"
              clearable />
          </el-form-item>
        </el-col>
        <el-col
          :xs="{span: 24}"
          :sm="{span: 12}"
          :md="{span: 12}"
          :lg="{span: 8}"
          :xl="{span: 6}">
          <el-form-item label="所属部门">
            <el-input
              v-model="formData.departmentId"
              placeholder="" />
          </el-form-item>
        </el-col>
        <el-col
          :xs="{span: 24}"
          :sm="{span: 12}"
          :md="{span: 12}"
          :lg="{span: 8}"
          :xl="{span: 6}">
          <el-form-item
            label="性别"
            prop="sex">
            <el-radio-group v-model="formData.sex">
              <el-radio label="男" />
              <el-radio label="女" />
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col
          :xs="{span: 24}"
          :sm="{span: 12}"
          :md="{span: 12}"
          :lg="{span: 8}"
          :xl="{span: 6}">
          <el-form-item
            label="名族"
            prop="class">
            <el-input
              v-model="formData.class"
              type="text"
              clearable />
          </el-form-item>
        </el-col>
        <el-col
          :xs="{span: 24}"
          :sm="{span: 12}"
          :md="{span: 12}"
          :lg="{span: 8}"
          :xl="{span: 6}">
          <el-form-item
            label="身份证号"
            prop="idCard">
            <el-input
              v-model="formData.idCard"
              type="text"
              clearable />
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { userAdd, userEdit, userGet } from '@/api/organizationalManagement'
export default {
  name: 'PersonnelManagementInput',
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
      formData: {
        userName: '',
        userCode: '',
        departmentId: '',
        sex: '',
        class: '',
        idCard: ''
      },
      todoType: 'Add'
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
        console.log(this.paramsData)
      } else {
        this.todoType = 'Edit'
        this.getPersonData()
        console.log(this.paramsData)
      }
    },
    getPersonData() {
      const id = this.paramsData.userId
      userGet({ id: id }).then(res => {
        this.formData = res.data
      })
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
        this[this.todoType.toLocaleLowerCase() + 'Person'](data)
      })
    },
    // 创建
    addPerson(data) {
      userAdd(data).then((res) => {
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
    editPerson(data) {
      userEdit(data).then((res) => {
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
