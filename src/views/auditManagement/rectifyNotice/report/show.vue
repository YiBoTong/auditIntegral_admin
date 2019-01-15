<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 创建修改
-->
<template>
  <div v-loading="loading" class="rectify-report-show-container">
    <el-card>
      <el-row slot="header">
        <el-col v-if="showTop">
          <el-col :span="12">
            <el-button type="text">查看整改报告</el-button>
          </el-col>
          <el-col :span="12" align="right">
            <el-button type="text" @click="backList">返回列表</el-button>
          </el-col>
        </el-col>
        <el-col align="center">
          <h1>{{ paramsData.projectName }}的整改报告</h1>
        </el-col>
      </el-row>
      <div class="card-content">
        <el-row>
          <div class="card-content">
            <div class="content-header" align="center">
              <h2>{{ formData.draft.projectName }}整改报告</h2>
            </div>
            <div class="body-time-number" align="center">{{ formData.year }}年第{{ formData.number }}号</div>
            <div class="body-header">{{ formData.draft.departmentName }}：</div>
            <div class="body-content">&emsp;&emsp;依据{{ formData.year }}年度工作计划，
              {{ formData.draft.queryStartTime | fmtDate('yyyy年MM月dd日') }}至{{ formData.draft.queryEndTime | fmtDate('yyyy年MM月dd日') }}，
              {{ formData.draft.queryDepartmentName }}对我行的{{ formData.draft.projectName }}风险进行专项审计，针对检查存在的问题，我部门按要求进行如下整改。</div>
          </div>
          <br >
          <el-row
            v-for="(violation,index) in behaviorContent"
            :key="index+1"
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
                            <el-form-item label="整改人：" label-width="100px">
                              {{ contentList[sonViolation.id].userNames }}
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="整改时间：" label-width="110px">
                              {{ contentList[sonViolation.id].time }}
                            </el-form-item>
                          </el-col>
                        </el-row>
                        {{ contentList[sonViolation.id].content }}
                      </el-form-item>
                    </el-col>
                  </el-form>
                </el-col>
              </el-col>
            </el-form>
          </el-row>

        </el-row>
        <br>
        <span>相关文件</span>
        <hr>
        <div v-if="fileList.length" class="public-upload">
          <el-upload
            ref="upload"
            :limit="10"
            :file-list="fileList"
            :on-preview="headleShow"
            class="upload"
            action=""
            disabled/>
        </div>
        <div v-else><br>暂无相关文件</div>
      </div>
    </el-card>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { getRectifyReport, getRectify } from '@/api/auditManagement'
// import HtmlContent from '@/components/HtmlContent/htmlContent'

export default {
  name: 'ReportShow',
  components: {},
  props: {
    paramsData: {
      type: [Object, String],
      required: false,
      default: () => ({})
    },
    showTop: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      loading: false,
      buttonLoading: false,
      formData: {
        year: '',
        number: '',
        draft: {
          departmentName: '',
          updateTime: '',
          queryDepartmentName: '',
          projectName: ''
        },
        suggest: '',
        lastTime: '',
        demand: ''
      },
      viewReportData: {
        contentList: []
      },
      fileIdArr: [],
      behaviorContent: [],
      fileList: []
    }
  },
  computed: {},
  created() {
    this.init()
  },
  mounted() {
  },
  methods: {
    // 初始化
    init() {
      this.getformData(this.paramsData.id)
    },
    // 返回列表
    backList() {
      this.$emit('backList')
    },

    // getformData(id) {
    //   this.loading = true
    //   getRectify({ id }).then(res => {
    //     if (!res.status.error) {
    //       const data = res.data
    //       this.formData = data
    //       this.getRectifyReportformData(id)
    //     } else {
    //       this.$message({
    //         type: 'error',
    //         message: res.status.msg + '!'
    //       })
    //     }
    //     this.loading = false
    //   })
    // },
    // getRectifyReportformData(rectifyId) {
    //   this.loading = true
    //   getRectifyReport({ rectifyId }).then(res => {
    //     if (!res.status.error) {
    //       const data = res.data
    //       // 处理文件显示
    //       const list = res.data.fileList || []
    //       list.map(v => {
    //         v.url = v.path + v.fileName + '.' + v.suffix
    //         v.name = v.name + '.' + v.suffix
    //       })
    //       this.viewReportData = data
    //       this.fileList = list
    //     } else {
    //       this.$message({
    //         type: 'error',
    //         message: res.status.msg + '!'
    //       })
    //     }
    //     this.loading = false
    //   })
    // },

    // 获取整改通知
    getformData(id) {
      this.loading = true
      getRectify({ id }).then(res => {
        if (!res.status.error) {
          const data = res.data
          // this.formData.rectifyId = data.id
          this.formData = data
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
          this.viewReportData = data
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

    // 下载文件
    headleShow(file) {
      console.log(file)
      this.downloadMulti(file.name, file.url)
    }
  }
}
</script>
