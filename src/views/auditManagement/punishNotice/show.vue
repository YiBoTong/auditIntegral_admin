<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 创建修改
-->
<template>
  <div
    v-loading="listLoading"
    class="punish-input-container">
    <div class="punish-top">
      <div class="header-left">
        <el-button @click="backList">返回列表</el-button>
      </div>
    </div>
    <el-card>
      <div slot="header" class="card-header">
        <span>查看</span>
      </div>
      <div class="card-body">
        <div class="body-top">
          <div class="top-number">编号:{{ punishNoticeData.number }}</div>
          <div class="top-title"><h3>普定县农村信用社员工违规积分通知书</h3></div>
        </div>
        <div class="body-body">
          <div class="body-container">
            <div class="body-header">
              <div class="underline">{{ punishNoticeData.userName }}</div><div>同志:</div>
            </div>
            <div class="body-content">
              <div class="content-row one">
                &emsp;&emsp;<div class="underline">{{ punishNoticeData.planStartTime | fmtDate('yyyy') }}</div>年<div class="underline">{{ punishNoticeData.planStartTime | fmtDate('MM') }}</div>月<div class="underline">{{ punishNoticeData.planStartTime | fmtDate('dd') }}</div>日至<div class="underline">{{ punishNoticeData.planEndTime | fmtDate('yyyy') }}</div>年<div class="underline">{{ punishNoticeData.planEndTime | fmtDate('MM') }}</div>月<div class="underline">{{ punishNoticeData.planEndTime | fmtDate('dd') }}</div>，
              </div>
              <div class="content-row two">
                在<div class="underline">{{ punishNoticeData.projectName }}</div>检查中，发现你存在违规
              </div>
              <div class="content-row three">
                行为，根据《普定县农村信用社员工违规积分管理办法（试行）》，决定对你进行违规积分
              </div>
              <div class="content-row four">
                <div class="underline">{{ punishNoticeData.score / 1000 }}</div>分。本年度你已累计积<div class="underline">{{ (+ punishNoticeData.score + punishNoticeData.sumScore) / 1000 }}</div>分(含本次积分)。
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
    </el-card>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { getPunishNotice } from '@/api/auditManagement'

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
      this.getPunishNoticeData()
      if (this.paramsData.editType === 'score') {
        this.editType = 'score'
      } else if (this.paramsData.editType === 'number') {
        this.editType = 'number'
      } else {
        this.editType = 'author'
      }
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
          this.punishNoticeData = res.data
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
