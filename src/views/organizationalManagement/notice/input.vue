<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 添加 or 编辑
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
          placeholder="请选择范围"
          clearable>
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
        ref="upload"
        :before-remove="beforeRemove"
        :http-request="doUpload"
        :limit="10"
        :file-list="fileList"
        :on-exceed="handleExceed"
        :on-remove="onRemove"
        :on-preview="headleShow"
        class="upload"
        action=""
        multiple>
        <el-button
          slot="trigger"
          size="small"
          type="primary">选取文件</el-button>
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
import { fileUpload } from '@/api/uploadFile'
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
      content: '',
      todoType: '',
      uploadFile: '',
      uploadFileUrl: '',
      fileList: [],
      formData: {
        'departmentId': 1,
        'title': '',
        'content': '',
        'range': '',
        'informIds': '1',
        'fileIds': '',
        'state': 'draft'
      },
      range: [{
        value: '1',
        label: '全部部门'
      }, {
        value: '2',
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
        this.todoType = 'Add'
      } else {
        this.todoType = 'Edit'
        this.getNotice()
      }
    },
    // 获取通知
    getNotice() {
      console.log(this.paramsData)
      noticeGet({ id: this.paramsData.id }).then(res => {
        if (!res.status.error) {
          this.formData = res.data
          console.log(res)
          const list = res.data.fileList || []
          for (const v of list) {
            if (this.formData.fileIds) {
              this.formData.fileIds = this.formData.fileIds + ',' + v.id
              if (this.formData.fileIds.substr(0, 1) === ',') this.formData.fileIds = this.formData.fileIds.substr(1)
            } else {
              this.formData.fileIds = v.id
            }
          }
          console.log(this.formData.fileIds)
          list.map(v => {
            console.log(v)
            v.url = v.path + v.fileName + '.' + v.suffix
            v.name = v.name + '.' + v.suffix
          })
          this.fileList = list
          console.log(this.fileList)
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
    // 移除文件
    onRemove(file, fileList) {
      console.log(fileList)
      if (fileList.length > 0) {
        this.formData.fileIds = ''
        for (const v of fileList) {
          if (v.id) {
            this.formData.fileIds = this.formData.fileIds + ',' + v.id
            if (this.formData.fileIds.substr(0, 1) === ',') this.formData.fileIds = this.formData.fileIds.substr(1)
          } else {
            this.formData.fileIds = this.formData.fileIds + ',' + v.raw.fileId
            if (this.formData.fileIds.substr(0, 1) === ',') this.formData.fileIds = this.formData.fileIds.substr(1)
          }
        }
        console.log(this.formData.fileIds)
      }
    },
    // 下载文件
    headleShow(file) {
      console.log(file)
      this.downloadMulti(file.name, file.url)
    },
    // 上传文件
    doUpload(content) {
      const fd = new FormData()
      console.log(content)
      fd.append('file', content.file)
      fileUpload(fd).then(res => {
        content.file['fileId'] = res.data
        this.formData.fileIds = this.formData.fileIds + ',' + res.data
        if (this.formData.fileIds.substr(0, 1) === ',') this.formData.fileIds = this.formData.fileIds.substr(1)
        console.log(this.formData.fileIds)
      })
    },
    // 提交表单
    submitForm() {
      // this.listLoading = true
      console.log(this.formData)
      this.$refs.refForm.validate(valid => {
        if (!valid) return false
        const data = Object.assign({}, this.formData)
        this[this.todoType.toLocaleLowerCase() + 'Notice'](data)
      })
    },
    // 创建
    addNotice(data) {
      noticeAdd(data).then((res) => {
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
    editNotice(data) {
      noticeEdit(data).then((res) => {
        this.$message({
          type: res.status.error ? 'error' : 'success',
          message: res.status.msg + '!'
        })
        if (!res.status.error) {
          this.backList()
        }
      })
    },
    // 文件上传
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}

</script>
