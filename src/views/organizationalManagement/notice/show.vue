<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 查看通知
-->
<template>
  <div class="notice-input-container">
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
      <span>{{ todoType | typeText }}通知</span>
      <hr>
    </div>
    <el-form
      ref="refForm"
      :model="formData"
      label-width="100px"
      class="department-form">
      <el-form-item
        label="公告标题"
        prop="title">
        <el-input
          v-model="formData.title"
          type="text"
          clearable />
      </el-form-item>
      <el-form-item
        label="通知范围"
        prop="range">
        <el-select
          v-model="formData.range"
          placeholder="请选择范围">
          <el-option
            v-for="item in range"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>
    </el-form>
    <div class="form-title">
      <span>通知内容</span>
      <hr>
    </div>
    <div class="text-content">
      <tinymce
        :height="300"
        v-model="formData.content" />
    </div>
    <div class="form-title">
      <span>相关文件</span>
      <hr>
    </div>
    <div class="public-upload">
      <el-upload
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList"
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple>
        <el-button
          size="small"
          type="primary">点击上传</el-button>
        <div
          slot="tip"
          class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import Tinymce from '@/components/Tinymce/index'
import { noticeAdd, noticeEdit, noticeGet } from '@/api/organizationalManagement'
export default {
  name: 'NoticeInput',
  components: { Tinymce },
  props: {
    paramsData: {
      type: [Object, String, Array],
      required: false,
      default: ''
    }
  },
  data() {
    return {
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
      content: '',
      todoType: 'Add',
      formData: {
        title: '',
        content: '',
        range: '',
        inform_id: '',
        fileIds: ''
      },
      range: [{
        value: '0',
        label: '全部部门'
      }, {
        value: '1',
        label: '指定部门'
      }]
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
        this.addNotice()
      } else {
        this.todoType = 'Edit'
        this.getNotice()
      }
    },
    // 获取部门
    getNotice() {
      const { id } = this.paramsData
      noticeGet({ id }).then(res => {
        if (!res.data.status.error) {
          this.formData = res.data
        } else {
          this.$message({
            type: 'error',
            message: res.data.status.msg + '!'
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
    addNotice(data) {
      noticeAdd(data).then((res) => {
        this.$message({
          type: res.data.status.error ? 'error' : 'success',
          message: res.data.status.msg + '!'
        })
        if (!res.data.status.error) {
          this.backList()
        }
      })
    },
    // 编辑
    editNotice(data) {
      noticeEdit(data).then((res) => {
        this.$message({
          type: res.data.status.error ? 'error' : 'success',
          message: res.data.status.msg + '!'
        })
        if (!res.data.status.error) {
          this.backList()
        }
      })
    },
    // 文件上传
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}

</script>
