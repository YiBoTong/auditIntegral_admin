<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 创建修改
-->
<template>
  <div
    class="confirmation-input-container rectify-show-container">
    <div class="input-header">
      <div class="header-left">
        <el-button @click="backList">返回列表</el-button>
      </div>
    </div>
    <br>
    <div v-loading="loading" class="show-content">
      <el-card>
        <div slot="header" class="card-header" align="center">
          <h1 class="header-title">审计整改通知书</h1>
        </div>
        <div class="card-content">
          <el-row :gutter="10">
            <el-col class="paragraph">
              {{ fromData.draft.departmentName }} {{ fromData.draft.time | fmtDate('yyyy年MM月dd日') }}对你单位{{ fromData.programmeBusiness | getArrText('content') }}业务进行了审计，发现以下问题：
            </el-col>

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
            <br>
            <hr>
            <br>
            <el-col>
              <el-form label-width="140px">
                <el-form-item label="整改意见或者建议：">
                  <el-input :autosize="{minRows: 5}" v-model="fromData.suggest" type="textarea" placeholder="请填写"/>
                </el-form-item>
              </el-form>
              <br>
            </el-col>
            <el-col align="center">
              <el-button :loading="buttonLoading" type="primary" size="small" @click="handleEdit('draft')">保存为草稿</el-button>
              <el-button :loading="buttonLoading" type="success" size="small" @click="handleEdit('publish')">保存并发布</el-button>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { getRectify, editRectify } from '@/api/auditManagement'

export default {
  name: 'DictionaryManagementInput',
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
      fromData: {
        draft: {
          departmentName: '',
          time: ''
        },
        suggest: ''
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
      if (this.paramsData) {
        this.getViewData(this.paramsData.id)
      }
    },
    // 返回列表
    backList() {
      this.$emit('view', 'list')
    },
    // 设置依据
    handleEdit(state) {
      this.buttonLoading = true
      const { id, suggest } = this.fromData
      editRectify({ id, suggest, state }).then(res => {
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
          this.buttonLoading = false
        }
      })
      console.log(this.basisIds)
    },
    getViewData(id) {
      this.loading = true
      getRectify({ id }).then(res => {
        if (!res.status.error) {
          const data = res.data
          this.getBehaviorContent(data.draftContent)
          this.fromData = data
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
