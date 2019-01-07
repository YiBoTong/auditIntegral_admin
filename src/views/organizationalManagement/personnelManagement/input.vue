<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 添加 or 编辑
-->
<template>
  <div>
    <el-card class="editMainBox">
      <div slot="header" class="card-header">
        <el-row>
          <el-col :span="12">
            <el-button type="text">{{ todoType | typeText }}人员</el-button>
          </el-col>
          <el-col :span="12" align="right">
            <el-button type="text" @click="backList">返回列表</el-button>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-form ref="refForm" :model="formData" label-width="100px">
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 6}"
          >
            <el-form-item label="人员姓名" prop="userName">
              <el-input v-model="formData.userName" type="text" clearable/>
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 6}"
          >
            <el-form-item label="员工号" prop="userCode">
              <el-input
                :disabled="formData.userId<0"
                v-model="formData.userCode"
                type="text"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 6}"
          >
            <el-form-item label="所属部门">
              <el-input
                :disabled="formData.userId<0"
                v-model="formData.departmentName"
                placeholder="请选择部门"
                clearable
                @focus="selectDepartment"
              />
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 6}"
          >
            <el-form-item label="性别" prop="sex">
              <el-radio v-model="formData.sex" label="0">男</el-radio>
              <el-radio v-model="formData.sex" label="1">女</el-radio>
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 6}"
          >
            <el-form-item label="名族" prop="class">
              <el-input v-model="formData.class" type="text" clearable/>
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 6}"
          >
            <el-form-item label="联系方式" prop="phone">
              <el-input v-model="formData.phone" type="text" clearable/>
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 6}"
          >
            <el-form-item label="身份证号" prop="idCard">
              <el-input v-model="formData.idCard" type="text" clearable/>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div align="center">
        <el-button type="primary" size="small" @click="submitForm(formData)">保存</el-button>
        <el-button size="small" @click="resetForm('refForm')">重置</el-button>
      </div>
    </el-card>
    <department-dialog
      :select-one="true"
      :show-checkbox="showCheckbox"
      :visible.sync="visible"
      :width="width"
      :title="title"
      @department="onDepartment"
    />
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { userAdd, userEdit, userGet } from '@/api/organizationalManagement'
import DepartmentDialog from '@/components/DepartmentDialog/departmentDialog'

export default {
  name: 'PersonnelManagementInput',
  components: { DepartmentDialog },
  props: {
    paramsData: {
      type: [Object, String, Array],
      required: false,
      default: ''
    }
  },
  data() {
    return {
      visible: false,
      showCheckbox: true,
      title: '',
      width: '',
      formData: {
        departmentName: '',
        userName: '',
        userCode: '',
        departmentId: '',
        sex: '0',
        phone: '',
        class: '',
        idCard: ''
      },
      todoType: ''
    }
  },
  created() {
    this.init()
  },
  mounted() { },
  methods: {
    // 初始化
    init() {
      if (this.paramsData.parentId) {
        this.todoType = 'Add'
        this.formData.departmentName = this.paramsData.name
        this.formData.departmentId = this.paramsData.id
      } else {
        this.todoType = 'Edit'
        this.getPersonData()
      }
    },
    // 获取人员信息
    getPersonData() {
      const id = this.paramsData.userId
      userGet({ id: id }).then(res => {
        console.log(res)
        res.data.sex = res.data.sex.toString()
        this.formData = res.data
      })
    },
    // dialog选择部门
    selectDepartment() {
      this.visible = true
      this.width = '600px'
      this.title = '选择部门'
    },
    // dialog获取的指定部门
    onDepartment(data) {
      console.log(data)
      this.formData.departmentName = data.name
      this.formData.departmentId = data.id
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
        this.formData.sex = Number(this.formData.sex)
        // this.formData.phone = Number(this.formData.phone)
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
