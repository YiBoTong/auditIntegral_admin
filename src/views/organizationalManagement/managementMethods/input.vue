<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 添加 or 编辑
-->
<template>
  <div class="methods-input-container">
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
    <el-card>
      <div slot="header" class="card-header">
        <span>{{ todoType }}管理办法</span>
      </div>
      <el-form
        ref="refForm"
        :model="formData"
        label-width="130px">
        <el-form-item
          label="管理办法标题"
          prop="title">
          <el-input
            v-model="formData.title"
            type="text"
            clearable />
        </el-form-item>
        <el-form-item
          label="所属机构id"
          prop="departmentId">
          <el-input
            v-model="formData.departmentId"
            type="text"
            clearable />
        </el-form-item>
        <el-form-item
          label="状态"
          prop="state">
          <el-input
            v-model="formData.state"
            type="text"
            clearable />
        </el-form-item>
        <el-form-item
          label="指定部门的部门id"
          prop="informId">
          <el-input
            v-model="formData.informId"
            type="text"
            clearable />
        </el-form-item>
        <el-form-item
          label="附件ID"
          prop="fileIds">
          <el-input
            v-model="formData.fileIds"
            type="text"
            clearable />
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header" class="card-header">
        <span>管理内容</span>
      </div>
      <el-form
        v-for="(content,index) in formData.content"
        :key="index"
        :ref="'departmentForm'+index"
        :model="content"
        label-width="100px">
        <el-form-item
          label="内容"
          prop="content">
          <el-input v-model="content.content" />
        </el-form-item>
        <el-form-item
          label="是否为标题"
          prop="isTitle">
          <el-input v-model="content.isTitle" />
        </el-form-item>
        <el-form-item
          label="标题级别"
          prop="titleLevel">
          <el-input v-model="content.titleLevel" />
        </el-form-item>
        <el-form-item
          label="数字顺序"
          prop="order">
          <el-input v-model="content.order" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="text"
            size="medium"
            @click="addMethods"><i class="el-icon-plus" />添加
          </el-button>
          <el-button
            :disabled="formData.content.length === 1"
            type="text"
            size="medium"
            @click="delMethods(index)"><i class="el-icon-delete" />删除
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { clauseAdd, clauseEdit } from '@/api/organizationalManagement'
export default {
  name: 'ManagementMethodsInput',
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
      todoType: '',
      formData: {
        title: '',
        departmentId: '',
        titleLevel: '',
        isTitle: '',
        fileIds: '',
        content: []
      }
    }
  },
  created() {
    this.init()
  },
  mounted() { },
  methods: {
    // 初始化
    init() {
      if (!this.paramsData) {
        this.todoType = '添加'
        this.addMethods()
        console.log(this.paramsData)
      } else {
        this.todoType = '编辑'
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
    submitForm() {
      this.listLoading = true
      console.log(this.formData)
      const data = Object.assign({}, this.formData)
      this.$refs.refForm.validate(valid => {
        if (!valid) return
        if (this.paramsData) {
          clauseEdit(data).then(res => {
            this.$message.success('编辑成功')
          })
        } else {
          clauseAdd(data).then(res => {
            this.$message.success('新增成功')
          })
        }
        this.listLoading = false
      })
    },
    // 添加
    addMethods() {
      this.formData.content.push({
        content: '',
        isTitle: '',
        titleLevel: '',
        order: ''
      })
    },
    // 删除
    delMethods(index) {
      this.formData.content.splice(index, 1)
    }
  }
}

</script>
