<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 添加 or 编辑
-->
<template>
  <div v-loading="showLoading">
    <el-card class="editMainBox">
      <div slot="header" class="card-header">
        <el-row>
          <el-col :span="12">
            <el-button type="text" disabled>{{ todoType | typeText }}通知</el-button>
          </el-col>
          <el-col :span="12" align="right">
            <el-button type="text" @click="backList('notice')">返回列表</el-button>
          </el-col>
        </el-row>
      </div>
      <el-row :gutter="10">
        <el-form ref="refForm" :model="formData" :rules="noticeRules" label-width="100px">
          <el-col>
            <el-form-item label="公告标题" prop="title">
              <el-input
                :autosize="{minRows:3}"
                v-model="formData.title"
                type="textarea"
                placeholder="请输入通知标题"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 8}"
          >
            <el-form-item label="通知范围" prop="range">
              <el-select v-model="formData.range" placeholder="请选择范围" @change="changeRange">
                <el-option
                  v-for="item in range"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            v-if="formData.range==2"
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8, offset: 8}"
            :xl="{span: 8, offset: 8}"
          >
            <el-form-item label="通知部门">
              {{ formData.departmentName }}
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <br>
      <h4>通知内容</h4>
      <hr>
      <br>
      <tinymce :height="300" v-model="formData.content"/>
      <br>
      <h4>相关附件</h4>
      <hr>
      <br>
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
          action
          multiple
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <div slot="tip" class="el-upload__tip">支持任意文件上传，且不超过1GB</div>
        </el-upload>
      </div>
      <br>
      <br>
      <div align="center">
        <el-button type="primary" size="small" @click="handleEdit('draft')">保存为草稿</el-button>
        <el-button plain size="small" @click="handleEdit('publish')">保存并发布</el-button>
      </div>
    </el-card>
    <department-dialog
      :show-checkbox="showCheckbox"
      :visible.sync="visible"
      :width="width"
      :title="title"
      @department="onDepartment"
    />
  </div>
</template>
<script>
/* 当前组件必要引入 */
import range from './range'
import state from './state'
import Tinymce from '@/components/Tinymce/index'
import { noticeAdd, noticeEdit, noticeGet } from '@/api/organizationalManagement'
import { fileUpload } from '@/api/uploadFile'
import DepartmentDialog from '@/components/DepartmentDialog/departmentDialog'
import { noticeRules } from '@/utils/rules'

export default {
  name: 'NoticeInput',
  components: { Tinymce, DepartmentDialog },
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
      noticeRules,
      content: '',
      todoType: '',
      fileList: [],
      visible: false,
      showCheckbox: true,
      width: '',
      title: '',
      formData: {
        'departmentId': '',
        'departmentName': '',
        'title': '',
        'content': '',
        'range': 1,
        'informIds': '1',
        'informName': '全部部门',
        'fileIds': '',
        'state': 'draft'
      },
      fileIdArr: []
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
      const data = this.$route.query
      console.log(this.$route.query)
      // 判断是添加 还是 修改
      if (data && data.addOrEdit) { // 修改
        this.todoType = data.addOrEdit
        this.formData.range = data.range
        this.getNotice()
      } else if (data) { // 选择部门后进入添加
        const newData = this.decodeURI(data)
        this.todoType = 'Add'
        this.formData.range = newData.id === -1 ? 1 : 2
        this.formData.departmentName = newData.id === -1 ? '根部门/网点' : newData.name
        this.formData.departmentId = newData.id
        this.showLoading = false
      } else { // 没选择部门进入添加
        this.todoType = 'Add'
        this.formData.departmentId = 1
        this.showLoading = false
      }
    },
    // 选择部门dialog
    selectDepartment() {
      this.visible = true
      this.width = '600px'
      this.title = '选择部门'
    },
    // dialog获取的指定部门
    onDepartment(data) {
      this.informIds = ''
      if (data.length > 0) { // 判断是单个部门 还是多选部门
        const nameArr = []
        const idsArr = []
        data.map(res => {
          nameArr.push(res.name)
          idsArr.push(res.id)
        })
        this.formData.departmentName = nameArr.join(',')
        this.formData.informIds = idsArr.join(',')
      } else { // 单选
        this.formData.departmentName = data.name
        this.formData.informIds = data.id
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
        this.showLoading = false
      })
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 移除文件
    onRemove(file, fileList) {
      if (fileList.length > 0) {
        this.fileIdArr = []
        fileList.map(item => this.fileIdArr.push(item.raw.fileId))
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
      fd.append('file', content.file)
      fileUpload(fd).then(res => {
        content.file['fileId'] = res.data
        this.fileIdArr.push(res.data)
        console.log(res.data)
      })
    },
    // 提交表单
    handleEdit(state) {
      // this.listLoading = true
      console.log(this.formData)
      this.$refs.refForm.validate(valid => {
        if (!valid) return false
        const data = Object.assign({}, this.formData)
        data.state = state
        data.fileIds = this.fileIdArr.join(',')
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
