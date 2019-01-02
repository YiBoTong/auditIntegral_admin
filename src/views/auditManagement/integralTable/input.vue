<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 创建修改
-->
<template>
  <div class="integral-input-container">
    <div class="input-top">
      <div class="header-left">
        <el-button @click="backList">返回列表</el-button>
      </div>
    </div>
    <el-card>
      <div slot="header" class="card-header">
        <span>修改分数</span>
      </div>
      <el-row :gutter="10">
        <el-form
          ref="refForm"
          :model="formData"
          label-width="100px">
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 6}"
            :xl="{span: 6}">
            <el-form-item label="认定人姓名">
              {{ formData.cognizanceUserName }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 6}"
            :xl="{span: 6}">
            <el-form-item label="责任人姓名">
              {{ formData.userName }}
            </el-form-item>
          </el-col>

          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 6}"
            :xl="{span: 6}">
            <el-form-item label="生效日期">
              {{ formData.time }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 12}"
            :xl="{span: 12}">
            <el-form-item label="总分">
              {{ formData.sumScore }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 12}"
            :xl="{span: 12}">
            <el-form-item label="分数">
              {{ formData.score }}
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <br>
      <span>违规行为</span>
      <hr>
      <br>
      <div class="card-behavior">
        <el-row>
          <el-form
            v-for="(behavior,index) in formData.behaviorList"
            :key="index"
            :ref="'behaviorForm'+index"
            :model="behavior"
            label-width="50px"
            class="behavior-form">
            <el-col
              :xs="{span: 24}"
              :sm="{span: 18}"
              :md="{span: 19}"
              :lg="{span: 20}"
              :xl="{span: 21}">
              <el-form-item
                :label="(index+1).toString()">
                {{ behavior.content }}
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
      <br>
      <span>填写分数</span>
      <hr>
      <br>
      <div class="card-score">
        <el-form ref="score-form" :model="scoreFormData" label-width="80px">
          <el-form-item
            label="填写意见">
            <el-input
              :autosize="{minRows: 1, maxRows: 6}"
              clearable
              type="textarea"
              placeholder="请输入内容" />
          </el-form-item>
        </el-form>
      </div>
      <div class="bottom-button">
        <div><el-button type="primary" size="small" @click="handleSm('draft')">保存为草稿</el-button></div>
        <div><el-button type="success" size="small" @click="handleSm('publish')">保存并发布</el-button></div>
      </div>
    </el-card>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { getIntegral } from '@/api/auditManagement'

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
      listLoading: false,
      punishNoticeData: {
        userName: '',
        projectName: '',
        planStartTime: '',
        planEndTime: '',
        score: '',
        sumScore: '',
        time: ''
      },
      formData: {},
      scoreFormData: {},
      dictionaries: [],
      editType: ''
    }
  },
  computed: {
  },
  created() {
    this.init()
  },
  mounted() {
  },
  methods: {
    // 初始化
    init() {
      this.getIntegralData()
    },
    // 返回列表
    backList() {
      this.$emit('view', 'list')
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 获取积分通知书
    getIntegralData() {
      const id = this.paramsData.id
      getIntegral({ id }).then(res => {
        if (!res.status.error) {
          this.formData = res.data
        } else {
          this.$message({
            type: 'error',
            message: res.status.msg + '!'
          })
        }
      })
    },
    // 编辑
    handleEdit(type, state) {
      // const api = 'editPunishNotice' + type.slice(0, 1).toUpperCase() + type.slice(1)
      const data = {
        id: this.paramsData.id,
        state
      }
      switch (type) {
        case 'score':
          data[type] = this.punishNoticeData.score * 1000
          break
        case 'number':
          data[type] = this.punishNoticeData.number
          break
      }
      this['editPunishNotice' + this.firstUpperCase(type)](data).then((res) => {
        this.$message({
          type: res.status.error ? 'error' : 'success',
          message: res.status.msg + '!'
        })
        if (!res.status.error) {
          this.getPunishNoticeData()
        }
      })
    }
  }
}

</script>
