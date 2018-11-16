<template>
  <div class="change-password-container">
    <div class="change-password-header">
      <div class="header-right">
        <el-button type="info"
                   @click="logout">退出登录</el-button>
      </div>
    </div>
    <el-form :model="formData"
             ref="refForm"
             label-width="100px">
      <el-form-item label="旧密码"
                    prop="title">
        <el-input type="text"
                  v-model="formData.oldPassword"
                  clearable
                  placeholder="请输入旧密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码"
                    prop="power">
        <el-input type="password"
                  v-model="formData.newPasswoed"
                  clearable
                  placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-button type="primary"
                 @click="submitForm(formData)">
        确认修改
      </el-button>
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
        oldPassword: '',
        newPasswoed: '',
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
    // 修改密码
    submitForm(data) {
      console.log(data);
      this.$confirm('确定修改密码吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$alert('已成功修改,请您重新登录！', '提示', {
          confirmButtonText: '确定',
          callback: goBack => {
            this.logout()
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        });
      });
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
