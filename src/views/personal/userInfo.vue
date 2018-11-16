<template>
  <div class="user-info-container">
    <div class="user-info-header">
      <div class="header-left">
        <router-link to='/personal/changePassword'>
          <el-button type="primary">修改密码</el-button>
        </router-link>
      </div>
      <div class="header-right">
        <el-button type="info"
                   @click="logout">退出登录</el-button>
      </div>
    </div>
    <el-form :model="formData"
             ref="refForm"
             label-width="140px">
      <el-form-item label="名字"
                    prop="title">
        <el-input type="text"
                  v-model="formData.name"
                  clearable></el-input>
      </el-form-item>
      <el-form-item label="权限"
                    prop="power">
        <el-input type="text"
                  v-model="formData.power"
                  clearable></el-input>
      </el-form-item>
      <el-form-item label="上次登录时间"
                    prop="lastLoginTime">
        <el-input type="text"
                  v-model="formData.lastLoginTime"
                  clearable></el-input>
      </el-form-item>
      <el-form-item label="最后修改密码时间"
                    prop="lastchangePasswordTime">
        <el-input type="text"
                  v-model="formData.lastchangePasswordTime"
                  clearable></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
/* 当前组件必要引入 */
export default {
  name: 'noticeInput',
  data() {
    return {
      formData: {
        name: '小罗伯特',
        power: '管理员',
        lastLoginTime: '2018-11-15 18:30',
        lastchangePasswordTime: '2018-11-16 11:30'
      }
    };
  },
  methods: {
    // 初始化
    init() {
    },
    // 退出登录
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 提交表单
    submitForm(data) {
      console.log(data);
    }
  },
  created() {
    this.init();
  },
  mounted() {

  },
  components: {}
};

</script>
