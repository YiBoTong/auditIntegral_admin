<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 添加 or 编辑
-->
<template>
  <div class="report-container">
    <div class="report-header">
      <div class="header-left">
        <el-button @click="backList">返回列表</el-button>
      </div>
    </div>
    <el-card>
      <div slot="header" class="card-header">
        <span>报告内容</span>
      </div>
      <div class="text-content">
        <tinymce
          :height="300"
          v-model="formData.content"/>
      </div>
      <br>
      <span>相关文件</span>
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
      <div class="submit-report">
        <el-button :loading="buttonLoading" type="primary" size="small" @click="handleEdit('draft')">保存为草稿</el-button>
        <el-button :loading="buttonLoading" type="success" size="small" @click="handleEdit('publish')">保存并发布</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import Tinymce from '@/components/Tinymce/index'
import { fileUpload } from '@/api/uploadFile'

export default {
  name: 'RectifyNoticeReport',
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
      fileList: [],
      visible: false,
      showCheckbox: true,
      width: '',
      title: '',
      formData: {
        'departmentId': '57',
        'title': '',
        'content': '',
        'depName': '',
        'range': 1,
        'informIds': '',
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
      // const data = this.paramsData
    },
    // 返回列表
    backList() {
      this.$emit('view', 'list')
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
    handleEdit() {
      // fillingBehavior(data).then(res => {
      //   if (!res.status.error) {
      //     this.$message({
      //       type: 'success',
      //       message: res.status.msg + '!'
      //     })
      //     this.backList()
      //   } else {
      //     this.$message({
      //       type: 'error',
      //       message: res.status.msg + '!'
      //     })
      //   }
      // })
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
