<!--
****--@date     2018-11-29 14:01
****--@author   XXL
****--@describe 个人中心
-->
<template>
  <div class="user-info-container">
    <div class="user-info-header">
      <el-button
        type="info"
        @click="logout">退出登录</el-button>
    </div>
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix">
        <span>个人中心</span>
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane
          label="基本资料"
          name="user"
          class="userInfo">
          <personal-data/>
        </el-tab-pane>
        <el-tab-pane
          ref="refPwdForm"
          label="修改密码"
          name="second"
          class="changePwd">
          <el-form
            :model="pwdFormData"
            label-width="60px">
            <el-form-item
              label="新密码"
              prop="newPasswoed">
              <el-input
                v-model="pwdFormData.password"
                type="password"
                clearable
                placeholder="请输入新密码" />
            </el-form-item>
            <div class="pwdBottom">
              <el-button
                type="primary"
                @click="submitForm()">
                确认修改
              </el-button>
              <el-button
                type="primary"
                @click="resetForm('refPwdForm')">
                重置
              </el-button>
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import PersonalData from './components/PersonalData'
import { getUserInfo, changePassword, editUser } from '@/api/login'
export default {
  name: 'NoticeInput',
  components: { PersonalData },
  data() {
    return {
      activeName: 'user',
      pwdFormData: {
        userCode: '',
        new: ''
      },
      userFormData: []
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
      this.getUserInfo()
    },
    // 获取用户信息
    getUserInfo() {
      getUserInfo().then(res => {
        console.log(res)
        this.pwdFormData.userCode = res.data.userCode
        this.userFormData = this.objToArr(res.data)
        console.log(this.userFormData)
      })
    },
    // 把对象转换成数组对象 因情景只会有一条数据 所以考虑如下 较粗暴
    objToArr(obj) {
      var arr = []
      arr.push(obj)
      return arr
    },
    // 退出登录
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    // 重置表单
    resetForm(formName) {
      console.log(formName)
      this.$refs[formName].resetFields()
    },
    // 提交表单 修改密码
    submitForm() {
      console.log(this.pwdFormData)
      changePassword(this.pwdFormData).then(res => {
        console.log(res)
        if (res) {
          this.$message({
            type: res.status.error ? 'error' : 'success',
            message: (res.status.msg || '修改成功') + '!'
          })
        } else {
          this.$message({
            type: 'error',
            message: '删除失败，请重试!'
          })
        }
      })
    },
    // 修改信息
    editUserData() {
      editUser().then(res => {})
    }
  }
}

</script>
