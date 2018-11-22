<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 查看通知
-->
<template>
  <div class="show-container">
    <div class="show-header">
      <div class="header-left">
        <el-button @click="backList">返回列表</el-button>
      </div>
    </div>
    <div class="form-title">
      <span>负责人</span>
      <hr>
    </div>
    <el-form
      ref="refForm"
      :model="formData"
      label-width="100px">
      <el-form-item
        label="公告标题"
        prop="title">
        <el-input
          v-model="formData.title"
          type="text"
          clearable />
      </el-form-item>
      <el-form-item
        label="公告内容"
        prop="content">
        <el-input
          v-model="formData.content"
          type="text"
          clearable />
      </el-form-item>
      <el-form-item
        label="通知范围"
        prop="range">
        <el-input
          v-model="formData.range"
          type="text"
          clearable />
      </el-form-item>
      <el-form-item
        label="部门ID"
        prop="inform_id">
        <el-input
          v-model="formData.inform_id"
          type="text"
          clearable />
      </el-form-item>
      <el-form-item
        label="附件ID"
        prop="fileIds">
        <el-input
          v-model="formData.state"
          type="text"
          clearable />
      </el-form-item>
      <el-form-item
        label="附件ID"
        prop="fileIds">
        <el-input
          v-model="formData.state"
          type="text"
          clearable />
      </el-form-item>
    </el-form>
    <div class="form-title">
      <span>负责人</span>
      <hr>
    </div>
    <el-form
      ref="refForm"
      :model="formData"
      label-width="100px">
      <el-form-item
        label="公告标题"
        prop="title">
        <el-input
          v-model="formData.title"
          type="text"
          clearable />
      </el-form-item>
      <el-form-item
        label="公告内容"
        prop="content">
        <el-input
          v-model="formData.content"
          type="text"
          clearable />
      </el-form-item>
      <el-form-item
        label="通知范围"
        prop="range">
        <el-input
          v-model="formData.range"
          type="text"
          clearable />
      </el-form-item>
      <el-form-item
        label="部门名称"
        prop="informName">
        <el-input
          v-model="formData.informName"
          type="text"
          clearable />
      </el-form-item>
      <el-form-item
        label="发布时间"
        prop="time">
        <el-input
          v-model="formData.time"
          type="text"
          clearable />
      </el-form-item>
    </el-form>
    <el-form-item
      label="发布状态"
      prop="state">
      <el-input
        v-model="formData.state"
        type="text"
        clearable />
    </el-form-item>
  </div>
</template>
<script>
/* 当前组件必要引入 */
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
        content: '',
        range: '',
        inform_id: '',
        informName: '',
        fileIds: '',
        time: '',
        state: '',
        fileList: {
          id: '',
          name: '',
          suffix: '',
          time: '',
          fileName: '',
          path: ''
        }
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
    },
    // 返回列表
    backList() {
      this.$emit('view', 'list')
    }
  }
}

</script>
