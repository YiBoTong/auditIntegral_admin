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
          @click="submitForm(formData)">{{ todoType | typeText }}
        </el-button>
        <el-button @click="resetForm('refForm')">重置</el-button>
      </div>
    </div>
    <el-card>
      <div slot="header" class="card-header">
        <span>{{ todoType | typeText }}通知</span>
      </div>
      <el-row :gutter="10">
        <el-form
          ref="refForm"
          :model="formData"
          label-width="100px"
        >
          <el-col>
            <el-form-item
              label="公告标题"
              prop="title">
              <el-input
                v-model="formData.title"
                type="text"
                placeholder="请输入通知标题"
                clearable/>
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 8}"
          >
            <el-form-item
              label="通知范围"
              prop="range">
              <el-select
                v-model="formData.range"
                placeholder="请选择范围"
                @change="changeRange">
                <el-option
                  v-for="item in range"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 8}"
          >
            <el-form-item
              label="通知部门">
              <el-input :disabled="formData.range=='1'" v-model="formData.informName" placeholder="点击选择部门"/>
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 8}"
          >
            <el-form-item
              label="状态"
              prop="range">
              <el-select
                v-model="formData.state"
                placeholder="请选择范围">
                <el-option
                  v-for="item in state"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
    <el-card>
      <div slot="header" class="card-header">
        <span>通知内容</span>
      </div>
      <div class="text-content">
        <tinymce
          :height="300"
          v-model="formData.content"/>
      </div>
    </el-card>
    <el-card>
      <div slot="header" class="card-header">
        <span>相关文件</span>
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
            type="primary">选取文件
          </el-button>
          <div
            slot="tip"
            class="el-upload__tip">支持任意文件上传，且不超过1GB
          </div>
        </el-upload>
      </div>
    </el-card>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import range from './range'
import state from './state'
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
      range,
      state,
      content: '',
      todoType: '',
      uploadFile: '',
      uploadFileUrl: '',
      fileList: [],
      formData: {
        'departmentId': 1,
        'title': '',
        'content': '',
        'range': 1,
        'informId': '',
        'informName': '全部部门',
        'fileIds': '',
        'state': 'draft'
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
      // if (!this.paramsData) {
      //   this.todoType = 'Add'
      // } else {
      //   this.todoType = 'Edit'
      //   this.getNotice()
      // }
      const data = this.paramsData
      console.log(data)
      // 判断是添加 还是 修改
      if (data && data.addOrEdit) { // 修改
        this.todoType = data.addOrEdit
        this.formData.range = data.range
        this.getNotice()
      } else if (data) { // 选择部门后进入添加
        this.todoType = 'Add'
        this.formData.range = 2
        this.formData.informName = data.name
        this.formData.informId = data.id
      } else { // 没选择部门进入添加
        this.formData.informName = '全部部门'
      }
    },
    // 获取通知
    getNotice() {
      console.log(this.paramsData)
      noticeGet({ id: this.paramsData.id }).then(res => {
        if (!res.status.error) {
          const data = res.data
          const fileIdArr = []
          const list = res.data.fileList || []
          list.map(item => fileIdArr.push(item.id))
          data.fileIds = fileIdArr.join(',')
          list.map(v => {
            v.url = v.path + v.fileName + '.' + v.suffix
            v.name = v.name + '.' + v.suffix
          })
          this.fileList = list
          this.formData = data
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
      const fileIdArr = []
      if (fileList.length > 0) {
        fileList.map(item => fileIdArr.push(item.id))
        this.formData.fileIds = fileIdArr.join(',')
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
      const fileIdArr = this.formData.fileIds.split(',')
      fd.append('file', content.file)
      fileUpload(fd).then(res => {
        content.file['fileId'] = res.data
        fileIdArr.push(res.data)
      })
      this.formData.fileIds = fileIdArr.join(',')
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
    },
    changeRange(val) {
      const t = val === 1 ? this.range[0].label : ''
      this.formData.informName = t
    }
  }
}

</script>
