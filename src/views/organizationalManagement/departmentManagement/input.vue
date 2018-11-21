<template>
  <div class="department-input-container">
    <div class="form-header">
      <div class="header-left">
        <el-button @click="backList">返回列表</el-button>
      </div>
      <div class="header-right">
        <el-button
          type="primary"
          @click="submitForm(formData)">{{ todoType }}</el-button>
        <el-button @click="resetForm('refForm')">重置</el-button>
      </div>
    </div>
    <div class="form-title">
      <span>编辑部门</span>
      <hr>
    </div>
    <el-form
      ref="refForm"
      :model="formData"
      label-width="100px">
      <el-form-item
        label="部门编码"
        prop="code">
        <el-input
          v-model="formData.code"
          type="text"
          clearable />
      </el-form-item>
      <el-form-item
        label="部门等级"
        prop="level">
        <el-input
          v-model="formData.level"
          type="text"
          clearable />
      </el-form-item>
      <el-form-item
        label="地址"
        prop="address">
        <el-input
          v-model="formData.address"
          type="text"
          clearable />
      </el-form-item>
      <el-form-item
        label="联系方式"
        prop="phone">
        <el-input
          v-model="formData.phone"
          type="text"
          clearable />
      </el-form-item>
    </el-form>
    <div class="form-title">
      <span>负责人</span>
      <hr>
    </div>
    <el-form
      :model="formData.userList"
      label-width="100px">
      <el-form-item label="用户角色">
        <el-select
          v-model="formData.userList.type"
          placeholder="请选择角色"
          clearable>
          <el-option value="角色1">角色1</el-option>
          <el-option value="角色2">角色2</el-option>
          <el-option value="角色3">角色3</el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
/* 当前组件必要引入 */
// import { orgGet, orgAdd, orgEdit } from '@/api/organizationalManagement'
export default {
  name: 'LoginManagementInput',
  components: {},
  props: {
    paramsData: {
      type: [Object, String],
      required: false,
      default: ''
    }
  },
  data() {
    return {
      todoType: '',
      formData: {
        code: '',
        level: '',
        address: '',
        phone: '',
        userList: {
          type: ''
        }
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
      if (!this.paramsData) {
        this.todoType = '添加'
        console.log(this.paramsData)
      } else {
        this.todoType = '编辑'
        // this.getDictionary()
        console.log(this.paramsData)
      }
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
