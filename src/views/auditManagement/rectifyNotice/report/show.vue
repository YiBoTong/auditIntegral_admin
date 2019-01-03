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
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { getRectify } from '@/api/auditManagement'

export default {
  name: 'ReportShow',
  components: {},
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
      viewData: {
        draft: {
          departmentName: '',
          time: ''
        },
        suggest: ''
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
          this.getBehaviorContent(data.draftContent)
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
    // 获取违规内容
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
