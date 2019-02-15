<!--
****--@date     2019-01-04 17:55
****--@author   YC
****--@describe 对比报告
-->
<template>
  <div v-loading="loading" class="show-content contrast-content">
    <el-card>
      <div slot="header" class="card-header" align="center">
        <h1>{{ paramsData.projectName }}的整改对比</h1>
      </div>
      <div class="card-content">
        <el-row>
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
                  :label="numberConvertToUppercase(index+1).toString() + '、'"
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
                    <el-col
                      :xs="{span: 24}"
                      :sm="{span: 24}"
                      :md="{span: 24}"
                      :lg="{span: 24}"
                      :xl="{span: 24}">
                      <el-form-item
                        :label="(sonIndex+1).toString()+'、'"
                        prop="behaviorContent">
                        <p :class="[sonViolation.contrast===null?'no':'had']">{{ sonViolation.behaviorContent }}</p>
                        <div v-if="sonViolation.contrast" class="txt">
                          {{ sonViolation.contrast.content }}
                          <p style="padding: 0;margin: 0;text-indent: 0;">
                            整改人：{{ sonViolation.contrast.userList | getArrText('userName') }}
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            整改时间：{{ sonViolation.contrast.time | fmtDate('yyyy年MM月dd日') }}
                          </p>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-form>
                </el-col>
              </el-col>
            </el-form>
          </el-row>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { getRectify, getRectifyReport } from '@/api/auditManagement'

export default {
  name: 'ContrastShow',
  components: {},
  // props: {},
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
      behaviorContent: [],
      paramsData: null
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
      this.paramsData = this.decodeURI(this.$route.params)
      this.getRectifyReportViewData(this.paramsData.id)
    },
    // 返回列表
    backList() {
      this.$emit('view', 'list')
    },
    getViewData(id, rectifyReportData) {
      this.loading = true
      getRectify({ id }).then(res => {
        if (!res.status.error) {
          const data = res.data
          this.getBehaviorContent(data.confirmationContent, rectifyReportData)
          this.viewData = data
        } else {
          this.$message({
            type: 'error',
            message: res.status.msg + '!'
          })
        }
        this.loading = false
      })
    },
    // 获取检查内容
    getBehaviorContent(arr, rectifyReportData) {
      const temp = []
      const rectifyReportDataObj = {}
      rectifyReportData.contentList.map(item => { rectifyReportDataObj[item.draftContentId] = item })
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
          item['contrast'] = rectifyReportDataObj[obj.id] || null
          temp[temp.length - 1] && temp[temp.length - 1].behaviorContent && temp[temp.length - 1].behaviorContent.push(item)
        }
      })
      console.log(temp)
      this.behaviorContent = temp
    },
    getRectifyReportViewData(rectifyId) {
      getRectifyReport({ rectifyId }).then(res => {
        if (!res.status.error) {
          this.getViewData(rectifyId, res.data)
        } else {
          this.$message({
            type: 'error',
            message: res.status.msg + '!'
          })
          this.loading = false
        }
      })
    }
  }
}

</script>
