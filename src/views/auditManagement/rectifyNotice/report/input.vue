<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 添加 or 编辑
-->
<!--suppress ALL -->
<template>
  <el-card class="rectify-report-input-container">
    <el-row slot="header" :gutter="10" class="card-header">
      <el-col align="right">
        <el-button type="text" @click="backList">返回列表</el-button>
      </el-col>
      <el-col align="center">
        <h1>{{ paramsData.queryDepartmentName }}关于{{ paramsData.projectName }}的整改情况</h1>
      </el-col>
    </el-row>
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
                    <el-row class="user-and-time">
                      <el-col :span="12">
                        <el-form-item label="整改人" label-width="100px">
                          <el-input
                            v-model="contentList[sonViolation.id].userNames"
                            placeholder="请选择整改人"
                            clearable
                            @focus="selectCheckPersonnel(sonViolation.id)"
                          />
                      </el-form-item></el-col>
                      <el-col :span="12">
                        <el-form-item label="整改时间" label-width="100px">
                          <el-date-picker
                            v-model="contentList[sonViolation.id].time"
                            type="date"
                            placeholder="请选择整改时间"
                            value-format="yyyy-MM-dd"
                            class="picker-width"
                          />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-input
                      :autosize="{minRows: 2, maxRows: 6 }"
                      v-model="contentList[sonViolation.id].content"
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
    <br>
    <div align="center">
      <el-button :loading="buttonLoading" type="primary" size="small" @click="handleEdit('draft')">保存为草稿</el-button>
      <el-button :loading="buttonLoading" size="small" @click="handleEdit('publish')">保存并发布</el-button>
    </div>
    <personnel-dialog
      v-if="CheckVisible"
      :visible.sync="CheckVisible"
      :width="width"
      :title="title"
      @personnel="onCheckPersonnel"
    />
  </el-card>
</template>
<script>
/* 当前组件必要引入 */
import Tinymce from '@/components/Tinymce/index'
import { fileUpload } from '@/api/uploadFile'
import { getRectify, getRectifyReport, editRectifyReport } from '@/api/auditManagement'
import PersonnelDialog from '@/components/PersonnelDialog/personnelDialog'

export default {
  name: 'RectifyNoticeReport',
  components: { Tinymce, PersonnelDialog },
  props: {
    paramsData: {
      type: [Object, String, Array],
      required: false,
      default: ''
    }
  },
  data() {
    return {
      CheckVisible: false,
      width: '',
      title: '',
      buttonLoading: false,
      content: '',
      todoType: '',
      fileList: [],
      visible: false,
      showCheckbox: true,
      formData: {
        'rectifyId': 0,
        'state': 'draft',
        fileIds: '',
        contentList: []
      },
      inputIndex: -1,
      fileIdArr: [],
      behaviorContent: [],
      contentList: {},
      selectDraftContentId: ''
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
    // 获取整改通知
    getViewData(id) {
      this.loading = true
      getRectify({ id }).then(res => {
        if (!res.status.error) {
          const data = res.data
          this.formData.rectifyId = data.id
          if (data.confirmationContent) {
            this.getBehaviorContent(data.confirmationContent)
          }
          this.getRectifyReportData(id)
        } else {
          this.$message({
            type: 'error',
            message: res.status.msg + '!'
          })
        }
        this.loading = false
      })
    },
    // 获取整改报告
    getRectifyReportData(rectifyId) {
      console.log(rectifyId)
      const temp = Object.assign({}, this.contentList)
      getRectifyReport({ rectifyId }).then(res => {
        if (!res.status.error) {
          const data = res.data
          // 处理文件显示
          const list = res.data.fileList || []
          list.map(item => this.fileIdArr.push(item.id))
          data.fileIds = this.fileIdArr.join(',')
          list.map(v => {
            v.url = v.path + v.fileName + '.' + v.suffix
            v.name = v.name + '.' + v.suffix
          })
          this.fileList = list
          data.contentList.map(item => {
            const userIds = []
            const userNames = [];
            (item.userList || []).map(uItem => {
              userIds.push(uItem.userId)
              userNames.push(uItem.userName)
            })
            item['userIds'] = userIds.join(',') || ''
            item['userNames'] = userNames.join('、') || ''
            temp[item.draftContentId] = item
          })
          this.contentList = temp
        } else {
          this.$message({
            type: 'error',
            message: res.status.msg + '!'
          })
        }
      })
    },
    // 获取检查内容
    getBehaviorContent(arr) {
      const temp = []
      const contentList = {}
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
          contentList[obj.id] = {
            draftContentId: obj.id,
            content: '',
            userIds: '',
            userNames: '',
            time: ''
          }
        }
      })
      this.behaviorContent = temp
      this.contentList = contentList
      console.log(this.behaviorContent)
    },
    // 选择检查人员
    selectCheckPersonnel(id) {
      this.selectDraftContentId = id
      this.CheckVisible = true
      this.width = '900px'
      this.title = '选择检查人员'
    },
    // 获取检查人员
    onCheckPersonnel(data) {
      if (data.length > 0) { // 判断是单人 还是多人
        const nameArr = []
        const idsArr = []
        data.map(res => {
          nameArr.push(res.userName)
          idsArr.push(res.userId)
        })
        this.contentList[this.selectDraftContentId].userNames = nameArr.join('、')
        this.contentList[this.selectDraftContentId].userIds = idsArr.join(',')
        // this.formData.queryUsers = idsArr.join(',')
      } else { // 单选
        this.formData.checkName = data.userName
        this.formData.queryUsers = data.userId
      }
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
    handleEdit(state) {
      const data = this.getSaveData()
      data.state = state
      editRectifyReport(data).then(res => {
        if (!res.status.error) {
          this.$message({
            type: 'success',
            message: res.status.msg + '!'
          })
          this.backList()
        } else {
          this.$message({
            type: 'error',
            message: res.status.msg + '!'
          })
        }
      })
    },
    getSaveData() {
      const data = Object.assign({}, this.formData)
      data.fileIds = this.fileIdArr.join(',')
      Object.keys(this.contentList).map(id => {
        if (this.contentList[id].content) {
          data.contentList.push(this.contentList[id])
        }
      })
      return data
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
