<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 查看整改报告
-->
<template>
  <div v-loading="loading" class="rectify-report-show-container">
    <el-card>
      <el-row slot="header">
        <el-col v-if="showTop">
          <el-col :span="12">
            <el-button type="text" disabled>查看整改报告</el-button>
          </el-col>
          <el-col :span="12" align="right">
            <el-button type="text" @click="backList('rectifyReport')">返回列表</el-button>
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
              <h2>{{ viewData.draft.projectName }}整改报告</h2>
            </div>
            <div class="body-time-number" align="center">{{ viewData.year }}年第{{ viewData.number }}号</div>
            <div class="body-header">{{ viewData.draft.departmentName }}：</div>
            <div class="body-content">&emsp;&emsp;依据{{ viewData.year }}年度工作计划，
              {{ viewData.draft.queryStartTime | fmtDate('yyyy年MM月dd日') }}至{{ viewData.draft.queryEndTime | fmtDate('yyyy年MM月dd日') }}，
              {{ viewData.draft.queryDepartmentName }}对我行的{{ viewData.draft.projectName }}风险进行专项审计，针对检查存在的问题，我部门按要求进行如下整改。</div>
          </div>
          <br >
          <el-row
            v-for="(item,index) in viewReportData.contentList"
            :key="index"
            class="paragraph">
            <el-form
              :ref="'violationForm'+index"
              label-width="50px"
              class="violation-content">
              <el-col>
                <el-form-item
                  :label="(index+1) + '、'"
                  prop="behaviorContent">
                  <span>
                    {{ item.content }}
                  </span>
                  <p style="padding: 0;margin: 0;text-indent: 0;">
                    整改人：{{ item.userList | getArrText('userName') }}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    整改时间：{{ item.time | fmtDate('yyyy年MM月dd日') }}
                  </p>
                </el-form-item>
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
      viewData: {
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
      this.getViewData(this.paramsData.id)
    },
    getViewData(id) {
      this.loading = true
      getRectify({ id }).then(res => {
        if (!res.status.error) {
          const data = res.data
          this.viewData = data
          this.getRectifyReportViewData(id)
        } else {
          this.$message({
            type: 'error',
            message: res.status.msg + '!'
          })
        }
        this.loading = false
      })
    },
    getRectifyReportViewData(rectifyId) {
      this.loading = true
      getRectifyReport({ rectifyId }).then(res => {
        if (!res.status.error) {
          const data = res.data
          // 处理文件显示
          const list = res.data.fileList || []
          list.map(v => {
            v.url = v.path + v.fileName + '.' + v.suffix
            v.name = v.name + '.' + v.suffix
          })
          this.viewReportData = data
          this.fileList = list
        } else {
          this.$message({
            type: 'error',
            message: res.status.msg + '!'
          })
        }
        this.loading = false
      })
    },
    // 下载文件
    headleShow(file) {
      console.log(file)
      this.downloadMulti(file.name, file.url)
    }
  }
}
</script>
