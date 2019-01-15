<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 创建修改
-->
<template>
  <div v-loading="loading" class="show-content">
    <el-card>
      <div slot="header" class="card-header" align="center">
        <h1>{{ paramsData.projectName }}的整改通知书</h1>
      </div>
      <div class="card-content">
        <el-row>
          <div class="paragraph">
            {{ formData.draft.departmentName }} {{ formData.draft.time | fmtDate('yyyy年MM月dd日') }}对你单位{{ formData.programmeBusiness | getArrText('content') }}业务进行了审计，发现以下问题：
          </div>
          <br>
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
                        {{ sonViolation.behaviorContent }}
                      </el-form-item>
                    </el-col>
                  </el-form>
                </el-col>
              </el-col>
            </el-form>
          </el-row>
          <br>
          <span>提交报告时间</span>
          <hr>
          <br>
          <el-col>
            <div v-if="formData.lastTime">提交报告时间：{{ formData.lastTime | fmtDate('yyyy年MM月dd日') }}</div>
            <div v-else>暂无数据</div>
          </el-col>
          <br>
          <br>
          <span>整改意见</span>
          <hr>
          <br>
          <el-col>
            <html-content v-if="formData.suggest" :content="formData.suggest"/>
            <div v-else>暂无数据</div>
            <br>
          </el-col>
          <span>整改要求</span>
          <hr>
          <br>
          <el-col>
            <html-content v-if="formData.demand" :content="formData.demand"/>
            <div v-else>暂无数据</div>
            <br>
          </el-col>
          <br>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { getRectify } from '@/api/auditManagement'
import HtmlContent from '@/components/HtmlContent/htmlContent'

export default {
  name: 'RectifyNoticeShow',
  components: { HtmlContent },
  props: {
    paramsData: {
      type: [Object, String],
      required: false,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      buttonLoading: false,
      formData: {
        draft: {
          departmentName: '',
          time: ''
        },
        suggest: '',
        lastTime: '',
        demand: ''
      },
      behaviorContent: []
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
      this.$emit('view', 'list')
    },
    getformData(id) {
      this.loading = true
      getRectify({ id }).then(res => {
        if (!res.status.error) {
          const data = res.data
          this.getBehaviorContent(data.draftContent)
          this.formData = data
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
    getBehaviorContent(arr) {
      const temp = []
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
        }
      })
      this.behaviorContent = temp
    }
  }
}
</script>
