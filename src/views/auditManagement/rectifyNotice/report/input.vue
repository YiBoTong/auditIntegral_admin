<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 添加 or 编辑
-->
<!--suppress ALL -->
<template>
  <div class="report-container">
    <div class="report-header">
      <div class="header-left">
        <el-button @click="backList">返回列表</el-button>
      </div>
    </div>
    <el-card>
      <div slot="header" align="center">
        <h1>{{ paramsData.queryDepartmentName }}关于{{ paramsData.projectName }}的整改情况</h1>
      </div>
      <div class="text-content">
        <el-row
          v-for="(violation,index) in behaviorContent"
          :key="index"
          class="paragraph">
          <el-form
            :ref="'violationForm'+index"
            :model="violation"
            label-width="50px"
            class="violation-content">
            <el-col
              :xs="{span: 24}"
              :sm="{span: 24}"
              :md="{span: 24}"
              :lg="{span: 24}"
              :xl="{span: 24}">
              <el-form-item
                :label="numberConvertToUppercase(index+1) + '、'"
                prop="behaviorContent">
                {{ violation.content }}
              </el-form-item>
              <el-col
                v-for="(sonViolation,sonIndex) in violation.behaviorContent"
                :key="sonIndex">
                <el-form
                  :ref="'sonViolationForm'+sonIndex"
                  :model="sonViolation"
                  label-width="50px"
                  class="violation-son-content">
                  <el-col>
                    <el-form-item
                      :label="(sonIndex+1).toString()+'、'"
                      prop="behaviorContent">
                      {{ sonViolation.behaviorContent }}
                      <el-input
                        :autosize="{minRows: 2, maxRows: 6 }"
                        v-model="rectification[sonViolation.id].content"
                        type="textarea"
                        placeholder="请输入整改情况"/>
                    </el-form-item>
                  </el-col>
                </el-form>
              </el-col>
            </el-col>
          </el-form>
        </el-row>
        <!--<tinymce-->
        <!--:height="300"-->
        <!--v-model="formData.content"/>-->
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
import { getRectify } from '@/api/auditManagement'

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
      buttonLoading: false,
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
        'state': 'draft',
        rectification: []
      },
      inputIndex: -1,
      fileIdArr: [],
      behaviorContent: [],
      rectification: {}
    }
  },
  created() {
    this.init()
    console.log(this.paramsData)
  },
  mounted() {
  },
  methods: {
    // 初始化
    init() {
      // const data = this.paramsData
      this.getViewData(this.paramsData.id)
    },
    getViewData(id) {
      this.loading = true
      getRectify({ id }).then(res => {
        if (!res.status.error) {
          const data = res.data
          this.getBehaviorContent(data.draftContent)
        } else {
          this.$message({
            type: 'error',
            message: res.status.msg + '!'
          })
        }
        this.loading = false
      })
    },
    // 获取违规内容
    getBehaviorContent(arr) {
      const temp = []
      const rectification = {}
      arr.map(obj => {
        const { type, behaviorContent } = obj
        const item = { type }
        obj.id && (item['id'] = obj.id)
        if (type === 'title') {
          item['behaviorContent'] = []
          item['content'] = behaviorContent
          temp.push(item)
        } else {
          item['behaviorContent'] = behaviorContent
          temp[temp.length - 1] && temp[temp.length - 1].behaviorContent && temp[temp.length - 1].behaviorContent.push(item)
          rectification[obj.id] = {
            behaviorContentId: obj.id,
            content: ''
          }
        }
      })
      this.behaviorContent = temp
      this.rectification = rectification
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
      const data = Object.assign({}, this.formData)
      data.fileIds = this.fileIdArr.join(',')
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
