<template>
  <div class="form-container">
    <div v-if="paramsData == null">
      <div class="form-header">
        <div class="header-left">
          <el-button @click="backList">返回列表</el-button>
        </div>
        <div class="header-right">
          <el-button
            type="primary"
            @click="submitForm(formData)">创建</el-button>
          <el-button @click="resetForm('refForm')">重置</el-button>
        </div>
      </div>
      <el-form
        ref="refForm"
        :model="formData"
        label-width="100px">
        <el-form-item
          label="员工号"
          prop="notificationScope">
          <el-input
            v-model="formData.notificationScope"
            type="text"
            clearable/>
        </el-form-item>
        <el-form-item
          label="是否启用"
          prop="notificationScope">
          <el-input
            v-model="formData.notificationScope"
            type="text"
            clearable/>
        </el-form-item>
      </el-form>
    </div>
    <div v-else>
      <div class="form-header">
        <div class="header-left">
          <el-button @click="backList">返回列表</el-button>
        </div>
        <div class="header-right">
          <el-button
            type="primary"
            @click="submitForm(formData)">修改</el-button>
          <el-button @click="resetForm('refForm')">重置</el-button>
        </div>
      </div>
      <el-form
        ref="refForm"
        :model="formData"
        label-width="100px">
        <el-form-item
          label="员工号"
          prop="title">
          <el-input
            v-model="formData.title"
            type="text"
            clearable/>
        </el-form-item>
        <el-form-item
          label="是否启用"
          prop="notificationScope">
          <el-input
            v-model="formData.notificationScope"
            type="text"
            clearable/>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
/* 当前组件必要引入 */
export default {
  name: 'LoginManagementInput',
  components: {},
  props: {
    paramsData: {
      type: Object,
      default: () => ({})
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
    if (this.paramsData) {
      const data = JSON.parse(JSON.stringify(this.paramsData))
      this.formData = data
    } else {
      return ''
    }
  },
  methods: {
    // 初始化
    init() {
    },
    // 返回列表
    backList() {
      this.$emit('view', 'list')
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 提交表单
    submitForm(data) {
      console.log(data)
    }
  }
}

</script>
