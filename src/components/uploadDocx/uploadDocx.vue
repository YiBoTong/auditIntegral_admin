<!--
****--@date     2019-01-07 18:34
****--@author   YC
****--@describe 上传文档
-->
<template>
  <el-row class="uploadDocx">
    <el-col>
      <b>导入要求：</b>
      <ul class="tips">
        <li>1、第一行为文件标题</li>
        <li>1、第二行为文件来源</li>
        <li>2、第三行为文件号</li>
        <li>3、“第X章” 识别为内容标题</li>
        <li>4、“第X节” 识别为内容副标题</li>
        <li>5、只能上传有效的docx文件，否则可能导入失败</li>
      </ul>
    </el-col>
    <el-col>
      <br>
      <span>上传文件</span>
      <hr>
      <br>
      <div class="public-upload">
        <el-upload
          ref="upload"
          :before-remove="beforeRemove"
          :http-request="doUpload"
          :before-upload="beforeUpload"
          :limit="1"
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
            class="el-upload__tip">请上传有效的docx文件
          </div>
        </el-upload>
      </div>
    </el-col>
    <el-col align="center">
      <br>
      <el-button :disabled="!fileId" :loading="btnLoading" type="primary" @click="importDocx">{{ btnLoading ? '请稍等，正在写入文件' : '导入' }}</el-button>
      <el-button v-if="!btnLoading" type="cancel" @click="cancel">取消</el-button>
    </el-col>
  </el-row>
</template>
<script>
/* 当前组件必要引入 */
import { fileUpload } from '@/api/uploadFile'
import { clausesImport } from '@/api/organizationalManagement'

export default {
  name: 'UploadDocx',
  components: {},
  props: {
    paramsData: {
      type: [Object],
      default: null
    }
  },
  data() {
    return {
      fileId: 0,
      departmentId: -1,
      fileList: [],
      btnLoading: false,
      time: null
    }
  },
  created() {
    this.init()
  },
  mounted() {
  },
  beforeDestroy() {
    if (this.time) {
      clearTimeout(this.time)
      this.time = null
    }
  },
  methods: {
    // 初始化
    init() {
      if (this.paramsData) {
        this.departmentId = this.paramsData.id
      }
    },
    beforeUpload(file) {
      if (!/\.docx$/.test(file.name)) {
        this.$message.warning(`只允许上传docx文件！`)
        return false
      }
      return true
    },
    // 移除文件
    onRemove(file, fileList) {
      console.log(fileList)
      if (fileList.length > 0) {
        this.fileId = fileList[0].raw.fileId
      } else {
        this.fileId = 0
      }
    },
    // 文件上传
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    // 下载文件
    headleShow(file) {
      this.downloadMulti(file.name, file.url)
    },
    // 上传文件
    doUpload(content) {
      const fd = new FormData()
      fd.append('file', content.file)
      fileUpload(fd).then(res => {
        content.file['fileId'] = res.data
        this.fileId = res.data
        this.wite()
      })
    },
    wite() {
      this.btnLoading = true
      if (this.time) {
        clearTimeout(this.time)
        this.time = null
      }
      this.time = setTimeout(() => { this.btnLoading = false }, 3000)
    },
    cancel(update) {
      this.$emit('upload', update)
    },
    // 导入文件
    importDocx() {
      const { fileId, departmentId } = this
      clausesImport({ fileId, departmentId }).then(res => {
        this.$message({
          type: res.status.error ? 'error' : 'success',
          message: res.status.msg + '!'
        })
        if (!res.status.error) {
          this.cancel(true)
        }
      })
    }
  }
}

</script>
