<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 查看办法
-->
<template>
  <div class="show-container">
    <div class="show-header">
      <div class="header-left">
        <el-button @click="backList">返回列表</el-button>
      </div>
    </div>
    <div class="form-title">
      <span>{{ todoType }}管理办法</span>
      <hr>
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
    <div class="form-title">
      <span>管理内容</span>
      <hr>
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
    </el-form>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { clauseGet } from '@/api/organizationalManagement'
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
      clauseGet().then(res => {

      })
    },
    // 返回列表
    backList() {
      this.$emit('view', 'list')
    },
    // 添加
    addMethods() {
      this.formData.content.push({
        content: '',
        isTitle: '',
        titleLevel: '',
        order: ''
      })
    }
  }
}

</script>
