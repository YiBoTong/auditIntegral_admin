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
        label="人员姓名"
        prop="userName">
        <el-input
          v-model="formData.userName"
          type="text"
          clearable />
      </el-form-item>
      <el-form-item
        label="员工号"
        prop="userCode">
        <el-input
          v-model="formData.userCode"
          type="text"
          clearable />
      </el-form-item>
      <el-form-item label="所属部门">
        <el-input
          v-model="formData.departmentId"
          placeholder=""/>
      </el-form-item>
      <el-form-item
        label="性别"
        prop="sex">
        <el-radio-group v-model="formData.sex">
          <el-radio label="男"/>
          <el-radio label="女"/>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="名族"
        prop="class">
        <el-input
          v-model="formData.class"
          type="text"
          clearable />
      </el-form-item>

      <el-form-item
        label="身份证号"
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
  name: 'PersonnelManagementShow',
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
