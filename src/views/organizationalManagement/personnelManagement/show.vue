<template>
  <div class="show-container">
    <div class="show-header">
      <div class="header-left">
        <el-button @click="backList">返回列表</el-button>
      </div>
    </div>
    <el-form
      ref="refForm"
      :model="formData"
      label-width="100px">
      <el-form-item
        label="部门编码"
        prop="userName">
        <el-input
          v-model="formData.userName"
          type="text"
          clearable />
      </el-form-item>
      <el-form-item
        label="部门等级"
        prop="userCode">
        <el-input
          v-model="formData.userCode"
          type="text"
          clearable />
      </el-form-item>
      <el-form-item
        label="地址"
        prop="sex">
        <el-input
          v-model="formData.sex"
          type="text"
          clearable />
      </el-form-item>
      <el-form-item
        label="联系方式"
        prop="idCard">
        <el-input
          v-model="formData.idCard"
          type="text"
          clearable />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { userGet } from '@/api/organizationalManagement'
export default {
  name: 'NoticeShow',
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
        title: '',
        notificationScope: ''
      }
    }
  },
  created() {
    this.init()
  },
  mounted() {
    if (this.paramsData) this.formData = this.paramsData
    console.log(this.formData)
  },
  methods: {
    // 初始化
    init() {
      userGet().then(res => {

      })
    },
    // 返回列表
    backList() {
      this.$emit('view', 'list')
    }
  }
}

</script>
