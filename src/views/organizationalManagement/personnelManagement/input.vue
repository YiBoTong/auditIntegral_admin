<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 添加 or 编辑
-->
<template>
  <div v-loading="showLoading">
    <el-card class="editMainBox">
      <div slot="header" class="card-header">
        <el-row>
          <el-col :span="12">
            <el-button type="text" disabled>{{ todoType | typeText }}人员</el-button>
          </el-col>
          <el-col :span="12" align="right">
            <el-button type="text" @click="backList('personnelManagement')">返回列表</el-button>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-form ref="refForm" :model="formData" :rules="personnelRules" label-width="100px">
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 6}"
          >
            <el-form-item label="姓名" prop="userName">
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
            <el-form-item label="所属部门" prop="departmentName">
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
              <el-radio v-model="formData.sex" label="2">男</el-radio>
              <el-radio v-model="formData.sex" label="1">女</el-radio>
              <el-radio v-model="formData.sex" label="0">保密</el-radio>
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
      v-if="visible"
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
import { personnelRules } from '@/utils/rules'

export default {
  name: 'PersonnelManagementInput',
  components: { DepartmentDialog },
  // props: {},
  data() {
    return {
      personnelRules,
      visible: false,
      showCheckbox: true,
      title: '',
      width: '',
      formData: {
        departmentName: '',
        userName: '',
        userCode: '',
        departmentId: '',
        sex: '2',
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
      console.log(this.$route.query)
      const data = this.decodeURI(this.$route.query)
      if (data && data.id) {
        this.todoType = 'Add'
        this.formData.departmentName = data.name
        this.formData.departmentId = data.id
        this.showLoading = false
      } else {
        this.todoType = 'Edit'
        this.getPersonData()
      }
    },
    // 获取人员信息
    getPersonData() {
      userGet({ id: this.$route.query.userId }).then(res => {
        if (!res.status.error) {
          res.data.sex = res.data.sex.toString()
          this.formData = res.data
        } else {
          this.$message.error(res.status.msg)
        }
        this.showLoading = false
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
          this.backList('personnelManagement')
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
          this.backList('personnelManagement')
        }
      })
    }
  }
}

</script>
