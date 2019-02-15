<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 创建修改
-->
<template>
  <el-card v-loading="loading" class="rectify-input-container">
    <el-row slot="header" :gutter="10" class="card-header">
      <el-col align="right">
        <el-button type="text" @click="backList('rectifyNotice')">返回列表</el-button>
      </el-col>
      <el-col align="center">
        <h1>审计整改通知书</h1>
      </el-col>
    </el-row>
    <div class="card-content">
      <el-row :gutter="10">
        <div class="card-content">
          <div class="content-header" align="center">
            <h2>{{ this.$store.getters["com"]('name') }}稽核审计通知书</h2>
          </div>
          <div class="body-time-number" align="center">{{ formData.year }}年第{{ formData.number }}号</div>
          <div class="body-header">{{ formData.draft.queryDepartmentName }}：</div>
          <div class="body-content">&emsp;&emsp;依据{{ formData.year }}年度工作计划，
            {{ formData.draft.queryStartTime | fmtDate('yyyy年MM月dd日') }}至{{ formData.draft.queryEndTime | fmtDate('yyyy年MM月dd日') }}，
            {{ formData.draft.departmentName }}对我行的{{ formData.draft.projectName }}风险进行专项审计，针对检查存在的问题，请你部门按以下要求及时进行整改。</div>
        </div>
        <el-row
          v-for="(violation,index) in behaviorContent"
          :key="index">
          <el-form
            :ref="'violationForm'+index"
            :model="violation"
            label-width="40px"
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
        <div>&emsp;&emsp;特此通知</div>
        <br>
        <span>提交报告时间</span>
        <hr>
        <br>
        <el-col>
          <span>提交报告时间</span>：
          <el-date-picker
            v-model="formData.lastTime"
            type="date"
            placeholder="请选择提交报告时间"
            value-format="yyyy-MM-dd"
          />
        </el-col>
        <br>
        <br>
        <br>
        <span>整改意见</span>
        <hr>
        <br>
        <el-col>
          <tinymce :height="300" v-model="formData.suggest"/>
          <br>
        </el-col>
        <span>整改要求</span>
        <hr>
        <br>
        <el-col>
          <tinymce :height="300" v-model="formData.demand"/>
          <br>
        </el-col>
        <br>
      </el-row>
      <div align="center">
        <el-button type="primary" size="small" @click="handleEdit('draft')">保存为草稿</el-button>
        <el-button size="small" @click="handleEdit('publish')">保存并发布</el-button>
      </div>
    </div>
  </el-card>
</template>
<script>
/* 当前组件必要引入 */
import { getRectify, editRectify } from '@/api/auditManagement'
import Tinymce from '@/components/Tinymce/index'

export default {
  name: 'DictionaryManagementInput',
  components: { Tinymce },
  // props: {},
  data() {
    return {
      loading: false,
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
      behaviorContent: []
    }
  },
  created() {
    this.init()
  },
  mounted() {
  },
  methods: {
    // 初始化
    init() {
      if (this.$route.query) {
        const { id } = this.$route.query
        this.getViewData(id)
      }
    },
    // 保存
    handleEdit(state) {
      this.formData.state = state
      const data = this.formData
      editRectify(data).then(res => {
        if (!res.status.error) {
          this.$message({
            type: 'success',
            message: res.status.msg + '!'
          })
          this.backList('rectifyNotice')
        } else {
          this.$message({
            type: 'error',
            message: res.status.msg + '!'
          })
        }
      })
    },
    getViewData(id) {
      this.loading = true
      getRectify({ id }).then(res => {
        if (!res.status.error) {
          const data = res.data
          this.getBehaviorContent(data.confirmationContent)
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
