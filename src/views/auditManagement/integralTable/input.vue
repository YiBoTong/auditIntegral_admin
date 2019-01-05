<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 创建修改
-->
<template>
  <el-card>
    <el-row slot="header" :gutter="10" class="card-header">
      <el-col :span="12">
        <el-button type="text">修改分数</el-button>
      </el-col>
      <el-col :span="12" align="right">
        <el-button type="text" @click="backList">返回列表</el-button>
      </el-col>
    </el-row>
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
            {{ Number(((formData.sumScore + formData.score) / 1000).toFixed(2)) }}
          </el-form-item>
        </el-col>
        <el-col
          :xs="{span: 24}"
          :sm="{span: 12}"
          :md="{span: 12}"
          :lg="{span: 12}"
          :xl="{span: 12}">
          <el-form-item label="分数">
            {{ Number((formData.score / 1000).toFixed(2)) }}
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
        <template v-if="formData.behaviorList.length">
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
        </template>
        <p v-else>暂无违规行为</p>
        <br>
      </el-row>
    </div>
    <br>
    <span>修改分数</span>
    <hr>
    <br>
    <div class="card-score">
      <el-form ref="score-form" :model="scoreFormData" label-width="80px">
        <el-form-item
          label="分数">
          <el-input-number v-model="scoreFormData.score" :min="1" :max="100" controls-position="right"/>
        </el-form-item>
        <el-form-item
          label="原因">
          <el-input
            :autosize="{minRows: 4, maxRows: 10}"
            v-model="scoreFormData.describe"
            clearable
            type="textarea"
            placeholder="请输入内容"/>
        </el-form-item>
      </el-form>
    </div>
    <div align="center">
      <el-button type="primary" size="small" @click="handleEdit('draft')">保存为草稿</el-button>
      <el-button size="small" @click="handleEdit('report')">保存并上报</el-button>
    </div>
  </el-card>
</template>
<script>
/* 当前组件必要引入 */
import { getIntegral, editIntegral } from '@/api/auditManagement'

export default {
  name: 'IntegralInput',
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
      formData: {
        behaviorList: []
      },
      scoreFormData: {
        id: this.paramsData.id,
        score: '',
        state: '',
        describe: ''
      },
      dictionaries: [],
      editType: ''
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
          const scoreFormData = res.data.changeScore
          scoreFormData.score = Number((scoreFormData.score / 1000).toFixed(2))
          scoreFormData.id = res.data.id
          this.formData = res.data
          this.scoreFormData = scoreFormData
        } else {
          this.$message({
            type: 'error',
            message: res.status.msg + '!'
          })
        }
      })
    },
    // 编辑
    handleEdit(state) {
      // const api = 'editPunishNotice' + type.slice(0, 1).toUpperCase() + type.slice(1)
      const data = Object.assign({}, this.scoreFormData)
      data.score = data.score * 1000
      data.state = state
      editIntegral(data).then(res => {
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
        }
      })
    }
  }
}

</script>
