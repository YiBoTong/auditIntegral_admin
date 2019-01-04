<!--
****--@date     2019-01-04 22:55
****--@author   XXL
****--@describe 个人信息
-->
<template>
  <div>
    <div class="user-avatar">
      <el-upload
        v-if="isEdit"
        ref="upload"
        :http-request="doUpload"
        :show-file-list="false"
        :disabled="isEdit"
        class="upload"
        action="">
        <img :src="imageUrl" class="avatar">
        <el-button
          slot="trigger"
          size="small"
          type="primary">上传头像
        </el-button>
      </el-upload>
      <img v-else :src="imageUrl" class="avatar avatar-show">
    </div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :hide-required-asterisk="true"
      class="personal-data"
      label-width="100px"
    >
      <el-form-item label="姓名：" prop="userName">
        {{ ruleForm.userName }}
      </el-form-item>
      <el-form-item label="性别：" prop="sex">
        <span>{{ ruleForm.sex === 0 ? '男' : '女' }}</span>
      </el-form-item>
      <el-form-item label="员工号：" prop="userCode">
        <span>{{ ruleForm.userCode }}</span>
      </el-form-item>
      <el-form-item label="手机号：" prop="phone">
        <base-input v-model="ruleForm.phone" :is-edit="isEdit" tag="phone" clearable/>
      </el-form-item>
      <el-form-item label="所属部门：" prop="departmentName">
        {{ ruleForm.departmentName }}
      </el-form-item>
      <el-form-item style="marginTop: 30px">
        <base-button
          :plain="isEdit"
          :type="isEdit ? '' : 'primary'"
          @click="handleToggle"
        >{{ isEdit ? '取消' : '编辑' }}</base-button>
        <base-button v-show="isEdit" :loading="waiting" style="marginLeft: 20px" @click="onSubmit">保存</base-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getUserInfo, editUser } from '@/api/login'
import { fileUpload } from '@/api/uploadFile'
export default {
  data() {
    return {
      isEdit: false,
      waiting: false,
      ruleForm: {},
      userData: {
        'phone': '',
        'portraitId': ''
      },
      imageUrl: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getUserInfoData()
    },
    getUserInfoData() {
      getUserInfo().then(res => {
        const data = res.data
        this.ruleForm = data
        this.imageUrl = 'http://192.168.1.20:8000/' + data.portraitFile.path + data.portraitFile.fileName + '.' + data.portraitFile.suffix
      })
    },
    // 上传头像
    doUpload(content) {
      const fd = new FormData()
      console.log(content)
      this.imageUrl = URL.createObjectURL(content.file)
      fd.append('file', content.file)
      fileUpload(fd).then(res => {
        this.userData.portraitId = res.data
      })
    },
    handleToggle() {
      if (this.isEdit) {
        this.$confirm(
          '取消后将丢失所有已填写内容，确定放弃当前更改吗？',
          '取消提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }
        ).then(res => {
          this.isEdit = false
          // 这里会把ruleform中的数据清空
          this.$refs.ruleForm.resetFields()
          this.init()
        })
      } else {
        this.isEdit = true
      }
    },
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$confirm('是否确认保存当前更改?', '保存提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            this.waiting = true
            this.userData.phone = this.ruleForm.phone
            editUser(this.userData).then(res => {
              if (!res.status.error) {
                this.$message.success('保存成功')
                this.isEdit = false
                this.waiting = false
              } else {
                this.$message.error(res.status.msg)
              }
            })
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .personal-data {
    width: 600px;
    margin: 30px auto;
    span {
      color: #777;
    }
  }
  .user-avatar {
    width: 200px;
    margin: 0 auto;
  }
  .avatar-show{
    margin: 0!important;
  }
  .avatar {
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    margin-bottom: 30px;
    right: 100px;
    &::after {
      content: "";
      position: absolute;
      top: 10%;
      left: 0%;
      width: 100%;
      height: 100%;
      background: inherit;
      background-size: 100% 100%;
      border-radius: 50%;
      transform: scale(0.95);
      filter: blur(10px) brightness(80%) opacity(0.8);
      z-index: -1;
    }
  }
</style>
