<template>
  <div class="login-container">

    <el-form
      ref="loginForm"
      :model="loginForm"
      class="login-form"
      label-position="left">
      <div class="logo">
        <img
          :src="logo"
          alt="">
      </div>

      <div class="title-container">
        <h3 class="title">稽核系统登录</h3>
        <lang-select class="set-language"/>
      </div>

      <el-form-item>
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
        <el-input
          v-model="loginForm.userCode"
          placeholder="账号"
          type="text"/>
      </el-form-item>

      <el-form-item>
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input
          :type="passwordType"
          v-model="loginForm.password"
          placeholder="密码"
          name="password"
          auto-complete="on"
          @keyup.enter.native="handleLogin"/>
        <span
          class="show-pwd"
          @click="showPwd">
          <svg-icon icon-class="eye"/>
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin">登录
      </el-button>
    </el-form>

  </div>
</template>

<script>
// import { isvalidUsername } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
import { userLogin } from '@/api/login'

export default {
  name: 'Login',
  components: { LangSelect },
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!isvalidUsername(value)) {
    //     callback(new Error('请输入账号'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validatePassword = (rule, value, callback) => {
    //   if (value.length < 6) {
    //     callback(new Error('The password can not be less than 6 digits'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      logo: require('../../assets/logo.png'),
      loginForm: {
        'userCode': '',
        'password': ''
      },
      // loginRules: {
      //   username: [
      //     { required: true, trigger: 'blur', validator: validateUsername }
      //   ],
      //   password: [
      //     { required: true, trigger: 'blur', validator: validatePassword }
      //   ]
      // },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined
    }
  },
  watch: {
    // $route: {
    //   handler: function(route) {
    //     this.redirect = route.query && route.query.redirect
    //   },
    //   immediate: true
    // }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          userLogin(this.loginForm).then(res => {
            if (res.status.code === 0 && res.status.error === false) {
              this.$message({
                type: 'success',
                message: res.status.msg + '！'
              })
              // this.$store.commit('SET_USERINFO', res.data)
              // 获取用户信息并加载字典及权限等
              this.$store.dispatch('GetUserInfo').then(path => {
                this.loading = false
                this.$router.push({ path })
              })
              // this.$store.dispatch('GenerateRoutes') // 动态修改权限后 重绘侧边菜单
            } else {
              this.loading = false
              this.$message({
                type: 'error',
                message: res.status.msg + '！'
              })
            }
          })
          // this.$store.dispatch('LoginByUsername', this.loginForm)
          //   .then(() => {
          //     this.loading = false
          //     this.$router.push({ path: this.redirect || '/' })
          //   })
          //   .catch(() => {
          //     this.loading = false
          //   })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg: #283443;
  $light_gray: #eee;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
      &::first-line {
        color: $light_gray;
      }
    }
  }

  /* reset element-ui css */
  .login-container {
    text-align: center;
    .logo {
      padding: 0 0 30px 0;
      img {
        height: 100%;
        border-radius: 60px;
      }
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    /*position: fixed;*/
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: $bg;
    min-width: 550px;
    min-height: 550px;
    .login-form {
      width: 520px;
      max-width: 100%;
      padding: 35px 35px 15px 35px;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
    .title-container {
      position: relative;
      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
      .set-language {
        color: #fff;
        position: absolute;
        top: 5px;
        right: 0px;
      }
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .thirdparty-button {
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }
</style>
