<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 创建修改
-->
<template>
  <div class="punish-show-container">
    <el-card v-loading="dataLoading">
      <div slot="header" class="card-header">
        <el-row slot="header" :gutter="10" class="card-header">
          <el-col :span="12">
            <el-button type="text">查看违规积分通知书</el-button>
          </el-col>
          <el-col :span="12" align="right">
            <el-button type="text" @click="backList">返回列表</el-button>
          </el-col>
        </el-row>
      </div>
      <el-row :gutter="10">
        <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16" class="col-left">
          <div class="card-body">
            <div class="body-top">
              <div class="top-number">编号：{{ punishNoticeData.number }}</div>
              <div class="top-title"><h3>{{ this.$store.getters["com"]('name') }}违规积分通知书</h3></div>
            </div>
            <div class="body-body">
              <!--<div class="body-container">-->
              <!--<div class="body-header">-->
              <!--<div class="underline">{{ punishNoticeData.userName }}</div><div>同志:</div>-->
              <!--</div>-->
              <!--<div class="body-content">-->
              <!--<div class="content-row one">-->
              <!--&emsp;&emsp;<div class="underline">{{ punishNoticeData.planStartTime | fmtDate('yyyy') }}</div>年<div class="underline">{{ punishNoticeData.planStartTime | fmtDate('MM') }}</div>月<div class="underline">{{ punishNoticeData.planStartTime | fmtDate('dd') }}</div>日至<div class="underline">{{ punishNoticeData.planEndTime | fmtDate('yyyy') }}</div>年<div class="underline">{{ punishNoticeData.planEndTime | fmtDate('MM') }}</div>月<div class="underline">{{ punishNoticeData.planEndTime | fmtDate('dd') }}</div>，-->
              <!--</div>-->
              <!--<div class="content-row two">-->
              <!--在<div class="underline">{{ punishNoticeData.projectName }}</div>检查中，发现你存在违规-->
              <!--</div>-->
              <!--<div class="content-row three">-->
              <!--行为，根据{{ basis }}，决定对你进行违规积分-->
              <!--</div>-->
              <!--<div class="content-row four">-->
              <!--<div class="underline">{{ punishNoticeData.score / 1000 }}</div>分。本年度你已累计积<div class="underline">{{ Number(((punishNoticeData.score + punishNoticeData.sumScore) / 1000).toFixed(2)) }}</div>分(含本次积分)。-->
              <!--</div>-->
              <!--<div class="content-row six">-->
              <!--&emsp;&emsp;如对本次积分决定有异议，可接到本通知起5个工作日内向联社积分管理领导小组办公室-->
              <!--</div>-->
              <!--<div class="content-row seven">提出书面复议申请。</div>-->
              <!--</div>-->
              <!--<div class="body-footer">-->
              <!--<div class="footer-left">-->
              <!--签发人（签字）:-->
              <!--</div>-->
              <!--<div class="footer-right">-->
              <!--<div class="right-top">-->
              <!--认定部门（盖章）-->
              <!--</div>-->
              <!--<div class="right-bottom">-->
              <!--<div class="underline">{{ punishNoticeData.time | fmtDate('yyyy') }}</div>年<div class="underline">{{ punishNoticeData.time | fmtDate('MM') }}</div>月<div class="underline">{{ punishNoticeData.time | fmtDate('dd') }}</div>日-->
              <!--</div>-->
              <!--</div>-->
              <!--</div>-->
              <!--</div>-->
              <div class="body-container">
                <div class="body-header">
                  <div class="underline">{{ punishNoticeData.userName }}</div><div>同志：</div>
                </div>
                <div class="body-content">
                  <div class="content-main">
                    &emsp;&emsp;<span class="underline">{{ punishNoticeData.planStartTime | fmtDate('yyyy') }}</span>年<span class="underline">{{ punishNoticeData.planStartTime | fmtDate('MM') }}</span>月<span class="underline">{{ punishNoticeData.planStartTime | fmtDate('dd') }}</span>日至<span class="underline">{{ punishNoticeData.planEndTime | fmtDate('yyyy') }}</span>年<span class="underline">{{ punishNoticeData.planEndTime | fmtDate('MM') }}</span>月<span class="underline">{{ punishNoticeData.planEndTime | fmtDate('dd') }}</span>，
                    在<span class="underline">{{ punishNoticeData.projectName }}</span>检查中，发现你存在违规
                    行为，根据《普定县农村信用社员工违规积分管理办法（试行）》，决定对你进行违规积分
                    <input v-model="punishNoticeData.score" :disabled="editType !== 'score' " max="100" type="number" class="underline" >
                    分。本年度你已累计积&emsp;<span class="underline">{{ punishNoticeData.sumScore }}</span>&emsp;分(含本次积分)。
                    罚款<input v-model="punishNoticeData.money" :disabled="editType !== 'score' " type="number" class="underline" >元。
                  </div>
                  <div class="content-row six">
                    &emsp;&emsp;如对本次积分决定有异议，可接到本通知起5个工作日内向联社积分管理领导小组办公室
                  </div>
                  <div class="content-row seven">提出书面复议申请。</div>
                </div>
                <div class="body-footer">
                  <div class="footer-left">
                    签发人（签字）:
                  </div>
                  <div class="footer-right">
                    <div class="right-top">
                      认定部门（盖章）
                    </div>
                    <div class="right-bottom">
                      <div class="underline">{{ punishNoticeData.time | fmtDate('yyyy') }}</div>年<div class="underline">{{ punishNoticeData.time | fmtDate('MM') }}</div>月<div class="underline">{{ punishNoticeData.time | fmtDate('dd') }}</div>日
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="body-bottom">
              <div class="bottom-content">
                本通知一式两份，一份送违规责任人，一份由违规积分管理办公室留存。违规责任人收到通知后应在积分管理办公室留存联签字确认。
              </div>
            </div>
          </div>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="6" class="col-right">
          <div class="card-body-right">
            <br>
            <span>违规依据</span>
            <hr>
            <el-form label-width="80px">
              <el-form-item label="违规依据:">
                {{ basis }}
              </el-form-item>
            </el-form>
            <span>违规行为</span>
            <hr>
            <el-form
              v-for="(behavior,index) in behaviorList"
              :key="index"
              :ref="'behaviorForm'+index"
              :model="behavior"
              label-width="80px"
              class="behavior-form"
            >
              <el-col
                :xs="{span: 24}"
                :sm="{span: 18}"
                :md="{span: 19}"
                :lg="{span: 20}"
                :xl="{span: 21}"
              >
                <el-form-item :label="(index+1).toString()+'、'">
                  {{ behavior.content }}
                </el-form-item>
              </el-col>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { getDraft, getPunishNotice } from '@/api/auditManagement'

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
      dataLoading: false,
      punishNoticeData: {
        userName: '',
        projectName: '',
        planStartTime: '',
        planEndTime: '',
        score: '',
        money: '',
        sumScore: '',
        time: ''
      },
      basis: '',
      behaviorContent: [],
      // punishNoticeData: {},
      formData: {},
      dictionaries: [],
      editType: '',
      basisStr: '',
      behaviorList: ''
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
      this.getPunishNoticeData()
      this.getManuscript(this.paramsData.draftId)
      // if (this.paramsData.editType === 'score') {
      //   this.editType = 'score'
      // } else if (this.paramsData.editType === 'number') {
      //   this.editType = 'number'
      // } else {
      //   this.editType = 'author'
      // }
    },
    // 返回列表
    backList() {
      this.$emit('view', 'list')
    },
    // 获取积分通知书
    getPunishNoticeData() {
      const { id } = this.paramsData
      getPunishNotice({ id }).then(res => {
        if (!res.status.error) {
          const data = res.data
          if (data.basisClauseTitle || data.basisClauseNumber) {
            this.basis = `《${data.basisClauseTitle}》` + (data.basisClauseNumber ? `（${data.basisClauseNumber}）` : '')
          } else {
            this.basis = ''
          }
          ['score', 'sumScore', 'money'].map((key) => {
            data[key] = data[key] / 1000
          })
          this.behaviorList = data.behaviorList
          const basis = []
          data.basisList.map(res => {
            basis.push(res.content)
          })
          this.basisStr = basis.join('、')
          // console.log('测试' + this.basis)
          this.punishNoticeData = data
        } else {
          this.$message({
            type: 'error',
            message: res.status.msg + '!'
          })
        }
      })
    },
    // 获取底稿
    getManuscript(id) {
      this.dataLoading = true
      getDraft({ id: id }).then(res => {
        if (!res.status.error) {
          const data = res.data
          // 获取检查内容
          if (data.contentList.length) {
            this.getBehaviorContent(data.contentList)
          }
          // data.behaviorList = []
          console.log(res.data)
          this.formData = data
        } else {
          this.$message({
            type: 'error',
            message: res.status.msg + '!'
          })
        }
        this.dataLoading = false
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
      this.loading = false
    }
  }
}
</script>
