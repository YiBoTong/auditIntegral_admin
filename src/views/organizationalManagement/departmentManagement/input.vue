<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 添加 or 编辑
-->
<template>
  <div class="department-input-container">
    <div class="form-header">
      <div class="header-left">
        <el-button @click="backList">返回列表</el-button>
      </div>
      <div class="header-right">
        <el-button
          type="primary"
          @click="submitForm(formData)">{{ todoType | typeText }}</el-button>
        <el-button @click="resetForm('refForm')">重置</el-button>
      </div>
    </div>
    <div class="form-title">
      <span>{{ todoType | typeText }}部门</span>
      <hr>
    </div>
    <el-row>
      <el-form
        ref="refForm"
        :model="formData"
        label-width="100px"
        class="department-form">
        <el-col
          :xs="{span: 24}"
          :sm="{span: 12}"
          :md="{span: 12}"
          :lg="{span: 8}"
          :xl="{span: 6}">
          <el-form-item
            label="上级部门"
            prop="code">
            <el-input
              v-model="formData.parentId"
              type="text"
              clearable />
          </el-form-item>
        </el-col>
        <el-col
          :xs="{span: 24}"
          :sm="{span: 12}"
          :md="{span: 12}"
          :lg="{span: 8}"
          :xl="{span: 6}">
          <el-form-item
            label="部门名称"
            prop="code">
            <el-input
              v-model="formData.name"
              type="text"
              clearable />
          </el-form-item>
        </el-col>
        <el-col
          :xs="{span: 24}"
          :sm="{span: 12}"
          :md="{span: 12}"
          :lg="{span: 8}"
          :xl="{span: 6}">
          <el-form-item
            label="部门编码"
            prop="code">
            <el-input
              v-model="formData.code"
              type="text"
              clearable />
          </el-form-item>
        </el-col>
        <el-col
          :xs="{span: 24}"
          :sm="{span: 12}"
          :md="{span: 12}"
          :lg="{span: 8}"
          :xl="{span: 6}">
          <el-form-item
            label="部门等级"
            prop="level">
            <el-input
              v-model="formData.level"
              type="text"
              clearable />
          </el-form-item>
        </el-col>
        <el-col
          :xs="{span: 24}"
          :sm="{span: 12}"
          :md="{span: 12}"
          :lg="{span: 8}"
          :xl="{span: 6}">
          <el-form-item
            label="地址"
            prop="address">
            <el-input
              v-model="formData.address"
              type="text"
              clearable />
          </el-form-item>
        </el-col>
        <el-col
          :xs="{span: 24}"
          :sm="{span: 12}"
          :md="{span: 12}"
          :lg="{span: 8}"
          :xl="{span: 6}">
          <el-form-item
            label="联系方式"
            prop="phone">
            <el-input
              v-model="formData.phone"
              type="text"
              clearable />
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <div class="form-title">
      <span>负责人</span>
      <hr>
    </div>
    <el-row>
      <el-form
        v-for="(user,index) in formData.userList"
        :key="index"
        :ref="'departmentForm'+index"
        :model="user"
        label-width="80px"
        class="person-form">
        <el-col
          :xs="{span: 24}"
          :sm="{span: 12}"
          :md="{span: 12}"
          :lg="{span: 8}"
          :xl="{span: 6}">
          <el-form-item
            label="用户角色"
            prop="type">
            <el-input
              v-model="user.type"
              clearable />
          </el-form-item>
        </el-col>
        <el-col
          :xs="{span: 24}"
          :sm="{span: 12}"
          :md="{span: 12}"
          :lg="{span: 8}"
          :xl="{span: 6}">
          <el-form-item>
            <el-button
              type="text"
              size="medium"
              @click="addPerson"><i class="el-icon-plus" />添加
            </el-button>
            <el-button
              :disabled="formData.userList.length === 1"
              type="text"
              size="medium"
              @click="delPerson(index)"><i class="el-icon-delete" />删除
            </el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { departmentAdd, departmentEdit, departmentGet } from '@/api/organizationalManagement'
export default {
  name: 'DepartmentManagementInput',
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
      todoType: 'Add',
      formData: {
        parentId: '',
        name: '',
        code: '',
        level: '',
        address: '',
        phone: '',
        userList: []
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
      if (!this.paramsData) {
        this.addPerson()
      } else {
        this.todoType = 'Edit'
        this.departmentGet()
      }
    },
    // 获取部门
    departmentGet() {
      const { id } = this.paramsData
      departmentGet({ id }).then(res => {
        if (!res.status.error) {
          this.formData = res.data
        } else {
          this.$message({
            type: 'error',
            message: res.status.msg + '!'
          })
        }
      })
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
    submitForm() {
      // this.listLoading = true
      console.log(this.formData)
      this.$refs.refForm.validate(valid => {
        if (!valid) return false
        const data = Object.assign({}, this.formData)
        // data.dictionaries.map((item, index) => item.order = index + 1)
        data.userList.map(function(item, index) {
          item.order = index + 1
          return item.order
        })
        this[this.todoType.toLocaleLowerCase() + 'Dictionaries'](data)
      })
    },
    // 创建
    addDictionaries(data) {
      departmentAdd(data).then((res) => {
        this.$message({
          type: res.status.error ? 'error' : 'success',
          message: res.status.msg + '!'
        })
        if (!res.status.error) {
          this.backList()
        }
      })
    },
    // 编辑
    editDictionaries(data) {
      departmentEdit(data).then((res) => {
        this.$message({
          type: res.status.error ? 'error' : 'success',
          message: res.status.msg + '!'
        })
        if (!res.status.error) {
          this.backList()
        }
      })
    },
    // 添加负责人
    addPerson() {
      this.formData.userList.push({
        userId: '-2',
        type: ''
      })
    },
    // 删除负责人
    delPerson(index) {
      this.formData.userList.splice(index, 1)
    }
  }
}

</script>
