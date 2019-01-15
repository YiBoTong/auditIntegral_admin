<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 创建修改
-->
<template>
  <div v-loading="loading" class="show-content">
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
          <h1>{{ paramsData.projectName }}的整改通知书</h1>
        </el-col>
      </el-row>
      <div class="card-content">
        <el-row>
          <div class="paragraph">
            {{ viewData.draft.departmentName }} {{ viewData.draft.time | fmtDate('yyyy年MM月dd日') }}对我单位{{ viewData.programmeBusiness | getArrText('content') }}业务进行了审计，对发现的问题进行问责及整改情况如下：
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
                  {{ item.content }}
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </el-row>
        <br>
        <span>提交报告时间</span>
        <hr>
        <br>
        <el-col>
          <div v-if="viewData.lastTime">提交报告时间：{{ viewData.lastTime | fmtDate('yyyy年MM月dd日') }}</div>
          <div v-else>暂无数据</div>
        </el-col>
        <br>
        <br>
        <span>整改意见</span>
        <hr>
        <br>
        <el-col>
          <html-content v-if="viewData.suggest" :content="viewData.suggest"/>
          <div v-else>暂无数据</div>
          <br>
        </el-col>
        <span>整改要求</span>
        <hr>
        <br>
        <el-col>
          <html-content v-if="viewData.demand" :content="viewData.demand"/>
          <div v-else>暂无数据</div>
          <br>
        </el-col>
        <br>
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
import HtmlContent from '@/components/HtmlContent/htmlContent'

export default {
  name: 'ReportShow',
  components: { HtmlContent },
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
        draft: {
          departmentName: '',
          time: ''
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
    // 返回列表
    backList() {
      this.$emit('backList')
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
