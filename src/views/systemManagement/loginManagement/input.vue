<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 创建修改
-->
<template>
  <div v-loading="showLoading" class="login-input-container">
    <div class="form-header">
      <div class="header-left">
        <el-button @click="backList">返回列表</el-button>
      </div>
    </div>
    <el-card>
      <div slot="header">
        <el-row>
          <el-col :span="12">
            <el-button type="text">{{ todoType | typeText }}登录人员</el-button>
          </el-col>
          <el-col :span="12" align="right">
            <el-button type="text" @click="backList">返回列表</el-button>
          </el-col>
        </el-row>
      </div>
      <show-user-info :form-data="userInfo"/>
      <el-row :gutter="10">
        <el-form
          ref="refForm"
          :rules="loginTypeRules"
          :model="formData"
          :disabled="!canEdit"
          label-width="100px"
          class="dict-add">
          <!--<el-col-->
          <!--:xs="{span: 24}"-->
          <!--:sm="{span: 12}"-->
          <!--:md="{span: 12}"-->
          <!--:lg="{span: 8}"-->
          <!--:xl="{span: 6}">-->
          <!--<el-form-item-->
          <!--label="员工号"-->
          <!--prop="userCode">-->
          <!--<el-input-->
          <!--v-model="formData.userCode"-->
          <!--type="text"-->
          <!--clearable-->
          <!--suffix-icon="el-icon-user" />-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 6}">
            <el-form-item label="是否启用">
              <el-switch
                v-model="formData.isUse"
                active-color="#13ce66"
                inactive-color="#ff4949" />
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div align="center">
        <el-button type="primary" @click="selectPersonnel">选择人员</el-button>
        <el-button :disabled="!formData.userCode" type="primary" @click="submitForm">保存</el-button>
      </div>
      <personnel-dialog :select-one="true" :visible.sync="PerVisible" :width="width" :title="title" @personnel="onPersonnel"/>
    </el-card>
  </div>
</template>
<script>
import PersonnelDialog from '@/components/PersonnelDialog/personnelDialog'
import ShowUserInfo from '../../organizationalManagement/personnelManagement/showUserInfo'
/* 当前组件必要引入 */
import { dictionaryType as loginTypeRules } from '../rules'
import { loginAdd, loginEdit } from '@/api/systemManagement'
import { userGet } from '@/api/organizationalManagement'

export default {
  name: 'LoginManagementInput',
  components: { PersonnelDialog, ShowUserInfo },
  props: {
    paramsData: {
      type: [Object, String],
      required: false,
      default: ''
    }
  },
  data() {
    return {
      loginTypeRules,
      depVisible: false,
      PerVisible: false,
      formIndex: '',
      width: '',
      title: '',
      formData: {
        userCode: '',
        isUse: false
      },
      userInfo: {},
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
      this.showLoading = false
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
    // 选择人员
    selectPersonnel() {
      this.PerVisible = true
      this.width = '900px'
      this.title = '选择人员'
    },
    // dialog获取的人员
    onPersonnel(data) {
      console.log(data)
      this.formData.userCode = data[0].userCode
      this.getUserInfo(data[0].userId)
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    getUserInfo(id) {
      userGet({ id }).then(res => {
        this.userInfo = res.data
      })
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
