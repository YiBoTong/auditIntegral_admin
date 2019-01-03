<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 创建修改
-->
<template>
  <div v-loading="loading" class="show-content">
    <el-card>
      <div slot="header" class="card-header" align="center">
        <h1>{{ paramsData.queryDepartmentName }}关于{{ paramsData.projectName }}的整改报告</h1>
      </div>
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
        <span>相关文件</span>
        <hr>
        <div class="public-upload">
          <el-upload
            ref="upload"
            :limit="10"
            :file-list="fileList"
            :on-preview="headleShow"
            class="upload"
            action=""
            disabled/>
        </div>
        <div v-if="!fileList.length">暂无相关文件</div>
      </div>
    </el-card>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { getRectifyReport, getRectify } from '@/api/auditManagement'

export default {
  name: 'ReportShow',
  components: {},
  props: {
    paramsData: {
      type: [Object, String],
      required: false,
      default: () => ({})
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
        suggest: ''
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
      this.$emit('view', 'list')
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
