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
          <el-form
            :model="pwdFormData"
            label-width="100px">
            <el-form-item
              label="员工号"
              prop="userId">
              <el-input
                v-model="userFormData.userId"
                type="text"
                readonly />
            </el-form-item>
            <el-form-item
              label="姓名"
              prop="power">
              <el-input
                v-model="userFormData.userName"
                type="userName"
                readonly />
            </el-form-item>
            <el-form-item
              label="角色"
              prop="power">
              <el-input
                v-model="userFormData.role"
                type="role"
                readonly />
            </el-form-item>
            <el-form-item
              label="上次登录时间"
              prop="time">
              <el-input
                v-model="userFormData.time"
                type="text"
                readonly />
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane
          ref="refInfoForm"
          label="修改资料"
          name="change"
          class="userInfo">
          <el-form
            :model="userFormData"
            label-width="60px">
            <el-form-item
              label="员工号"
              prop="userId">
              <el-input
                v-model="userFormData.userId"
                type="text"
                disabled />
            </el-form-item>
            <el-form-item
              label="姓名"
              prop="power">
              <el-input
                v-model="userFormData.userName"
                type="userName"
                clearable />
            </el-form-item>
            <el-form-item
              label="角色"
              prop="power">
              <el-input
                v-model="userFormData.role"
                type="role"
                clearable />
            </el-form-item>
            <div class="changeUserBottom">
              <el-button
                type="primary"
                @click="submitForm(userFormData)">
                确认修改
              </el-button>
              <el-button
                type="primary"
                @click="resetForm('refInfoForm')">
                重置
              </el-button>
            </div>
          </el-form>
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
              label="旧密码"
              prop="oldPassword">
              <el-input
                v-model="pwdFormData.oldPassword"
                type="text"
                clearable
                placeholder="请输入旧密码" />
            </el-form-item>
            <el-form-item
              label="新密码"
              prop="newPasswoed">
              <el-input
                v-model="pwdFormData.newPasswoed"
                type="password"
                clearable
                placeholder="请输入新密码" />
            </el-form-item>
            <div class="pwdBottom">
              <el-button
                type="primary"
                @click="submitForm(pwdFormData)">
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
import { getUserInfo } from '@/api/login'
export default {
  name: 'NoticeInput',
  components: {},
  data() {
    return {
      activeName: 'user',
      pwdFormData: {
        oldPassword: '',
        newPasswoed: ''
      },
      userFormData: {
        userId: '9527',
        userName: '小罗伯特唐尼',
        role: '管理员',
        time: '2018-11-11 22:22:22'
      }
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
        const data = res.data
        console.log(data)
      })
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
    // 提交表单
    submitForm(data) {
      console.log(data)
    }
  }
}

</script>
