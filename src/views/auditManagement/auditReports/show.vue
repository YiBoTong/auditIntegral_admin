<!--
****--@date     2019-01-03 19:21
****--@author   XXL
****--@describe 查看审计报告
-->
<template>
  <el-card v-loading="showLoading" class="audit-report-input-container">
    <el-row slot="header">
      <el-col :span="12">
        <el-button type="text" disabled>查看审计报告</el-button>
      </el-col>
      <el-col :span="12" align="right">
        <el-button type="text" @click="backList">返回列表</el-button>
      </el-col>
      <el-col align="center">
        <h1>{{ draft.departmentName }}关于{{ draft.projectName }}的报告</h1>
        <br>
        <p v-if="draft.year">{{ draft.year | numbers(draft.number) }}</p>
      </el-col>
    </el-row>
    <div class="card-content">
      <div class="content-header">
        <p>尊敬的联社领导:</p>
        <p class="header-content indent">
          根据《 {{ draft.programmeTitle }} 》<span v-if="draft.year">( {{ draft.year | numbers(draft.number) }} )</span>文件精神，{{ headerData.departmentName }}领导高度重视，
          及时组织相关人员对我行{{ programme.business | getArrText('content') }}开展了全面检查，现将我行的检查情况报告如下：
        </p>
      </div>

      <br>
      <div>
        <h3>一、组织实施情况</h3>
        <br>
        <div class="indent">
          <b>(一) 成立领导小组：</b>
          {{ draft.queryUserList | getArrText('userName') }}
        </div>
        <br>
        <div class="indent">
          <b>(二) 制定专项检查方案：</b>
          {{ draft.projectName }}
        </div>
        <br>
        <div>
          <p>
            <b>&emsp;&emsp;(三) 开展检查工作：</b>
          </p>
          <br>
          <div class="checkContent">
            <!--实施稽核的依据-->
            <span>稽核的依据</span>
            <hr>
            <div class="audit-show-table">
              <el-form
                v-for="(basis,index) in programme.basis"
                :key="index"
                label-width="50px"
                class="basis-form"
              >
                <el-form-item :label="(index+1).toString()">
                  {{ basis.content }}
                </el-form-item>
              </el-form>
            </div>
            <br>
            <!--工作方案业务范围-->
            <span>业务范围</span>
            <hr>
            <div class="audit-show-table">
              <el-form
                v-for="(business,index) in programme.business"
                :key="index"
                :ref="'businessForm'+index"
                :model="business"
                label-width="50px"
                class="business-form"
              >
                <el-form-item :label="(index+1).toString()">
                  <div v-show="false">{{ business.order = (index+1) }}</div>
                  {{ business.content }}
                </el-form-item>
              </el-form>
            </div>
            <br>
            <!--工作方案主要内容-->
            <span>主要内容</span>
            <hr>
            <div class="audit-show-table">
              <el-form
                v-for="(content,index) in programme.content"
                :key="index"
                :ref="'contentForm'+index"
                :model="content"
                label-width="50px"
                class="content-form"
              >
                <el-form-item :label="(index+1).toString()">
                  <div v-show="false">{{ content.order = (index+1) }}</div>
                  {{ content.content }}
                </el-form-item>
              </el-form>
            </div>
            <br>
            <!--工作方案重点-->
            <span>方案重点</span>
            <hr>
            <div class="audit-show-table">
              <el-form
                v-for="(emphases,index) in programme.emphases"
                :key="index"
                :ref="'emphasesForm'+index"
                :model="emphases"
                label-width="50px"
                class="emphases-form"
              >
                <el-form-item :label="(index+1).toString()">
                  <div v-show="false">{{ emphases.order = (index+1) }}</div>
                  {{ emphases.content }}
                </el-form-item>
              </el-form>
            </div>
            <br>
            <!--审查方案实施步骤-->
            <span>实施步骤</span>
            <hr>
            <el-row :gutter="10">
              <el-col v-for="(stepDataAll,index) in stepData" :key="index">
                <el-form
                  :ref="'stepDataAllForm'+index"
                  :model="stepDataAll"
                  label-width="30px"
                  class="violation-content"
                >
                  <el-col
                    :xs="{span: 24}"
                    :sm="{span: 24}"
                    :md="{span: 24}"
                    :lg="{span: 24}"
                    :xl="{span: 24}"
                    class="content-type"
                  >
                    <el-form-item
                      :label="numberConvertToUppercase(index+1)+'、'"
                    >{{ stepDataAll.content }}</el-form-item>
                  </el-col>
                  <el-col v-for="(content,sindex) in stepDataAll.stepContent" :key="sindex">
                    <el-form
                      :ref="'contentForm'+sindex"
                      :model="content"
                      label-width="50px"
                      class="content-behavior-content"
                    >
                      <el-col
                        :xs="{span: 24}"
                        :sm="{span: 24}"
                        :md="{span: 24}"
                        :lg="{span: 24}"
                        :xl="{span: 24}"
                      >
                        <el-form-item :label="(sindex+1)+'、'">{{ content.content }}</el-form-item>
                      </el-col>
                      <el-col v-for="(step,stepIndex) in content.stepList" :key="stepIndex">
                        <el-form
                          :ref="'stepForm'+stepIndex"
                          :model="step"
                          label-width="70px"
                          class="content-behavior-content"
                        >
                          <el-col
                            :xs="{span: 24}"
                            :sm="{span: 24}"
                            :md="{span: 24}"
                            :lg="{span: 24}"
                            :xl="{span: 24}"
                          >
                            <el-form-item :label="(stepIndex+1)+'.'">{{ step.content }}</el-form-item>
                          </el-col>
                        </el-form>
                      </el-col>
                    </el-form>
                  </el-col>
                </el-form>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>

      <br>
      <div>
        <h3>二、基本情况</h3>
        <br>
        <html-content :content="auditReportData.basicInfo || '未填写'"/>
      </div>

      <br>
      <div>
        <h3>三、检查发现的主要问题</h3>
        <div>
          <el-row :gutter="10">
            <el-col v-for="(violation,index) in behaviorContent" :key="index">
              <el-form
                :ref="'violationForm'+index"
                :model="violation"
                label-width="40px"
                class="violation-content"
              >
                <el-col
                  :xs="{span: 24}"
                  :sm="{span: 24}"
                  :md="{span: 24}"
                  :lg="{span: 24}"
                  :xl="{span: 24}"
                >
                  <el-form-item
                    :label="numberConvertToUppercase(index+1).toString() + '、'"
                    prop="behaviorContent"
                  >{{ violation.content }}</el-form-item>
                  <el-col
                    v-for="(sonViolation,sonIndex) in violation.behaviorContent"
                    :key="sonIndex"
                  >
                    <el-form
                      :ref="'sonViolationForm'+sonIndex"
                      :model="sonViolation"
                      label-width="50px"
                      class="violation-son-content"
                    >
                      <el-col
                        :xs="{span: 24}"
                        :sm="{span: 24}"
                        :md="{span: 24}"
                        :lg="{span: 24}"
                        :xl="{span: 24}"
                      >
                        <el-form-item
                          :label="(sonIndex+1).toString()+'、'"
                          prop="behaviorContent"
                        >{{ sonViolation.behaviorContent }}</el-form-item>
                      </el-col>
                    </el-form>
                  </el-col>
                </el-col>
              </el-form>
            </el-col>
          </el-row>
        </div>
      </div>

      <br>
      <div>
        <h3>四、问题形成的原因</h3>
        <br>
        <html-content :content="auditReportData.reason || '未填写'"/>
      </div>

      <br>
      <div>
        <h3>五、问责及整改情况</h3>
        <br>
        <h4>问责:</h4>
        <template v-for="(item,index) in accountability">
          <el-row :gutter="10" :key="index">
            <hr>
            <br>
            <el-form ref="form" :model="item">
              <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="姓名">{{ item.userName }}</el-form-item>
              </el-col>
              <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="扣分">{{ item.score | numberConvert }}</el-form-item>
              </el-col>
              <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="罚款">{{ item.money | numberConvert }}</el-form-item>
              </el-col>
              <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                <el-form-item label="生效日期">{{ item.time }}</el-form-item>
              </el-col>
              <div>
                {{ item.userName }}违规行为：
                <div v-if="item.behaviorList.length">
                  <el-form
                    v-for="(violation,index) in item.behaviorList"
                    :key="index"
                    :ref="'violationForm'+index"
                    :model="violation"
                    label-width="40px"
                    class="violation-content"
                  >
                    <el-form-item
                      :label="(index+1).toString() + '、'"
                      prop="behaviorContent"
                    >{{ violation.content }}</el-form-item>
                  </el-form>
                </div>
                <p v-else>无违规行为</p>
              </div>
            </el-form>
          </el-row>
        </template>
        <br>
        <h4>整改情况:</h4>
        <br>
        <el-row>
          <el-row v-for="(item,index) in rectification" :key="index" class="paragraph">
            <el-form
              :ref="'rectificationForm'+index"
              label-width="50px"
              class="rectification-content"
            >
              <el-col>
                <el-form-item :label="(index+1) + '、'" prop="behaviorContent">
                  {{ item.content }}
                  <p style="padding: 0;margin: 0;text-indent: 0;">
                    整改人：{{ item.userList | getArrText('userName') }}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    整改时间：{{ item.time | fmtDate('yyyy年MM月dd日') }}
                  </p>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </el-row>
      </div>

      <br>
      <div>
        <h3>六、下一步工作措施</h3>
        <br>
        <html-content :content="auditReportData.plan || '未填写'"/>
      </div>
      <br>
    </div>
  </el-card>
</template>
<script>
/* 当前组件必要引入 */
import Tinymce from '@/components/Tinymce/index'
import HtmlContent from '@/components/HtmlContent/htmlContent'
import { getAuditReport, programmeGet, getDraft, getConfirmation, getRectifyReport, getAccountability } from '@/api/auditManagement'

export default {
  name: 'AuditReportShow',
  components: { Tinymce, HtmlContent },
  // props: {},
  data() {
    return {
      buttonLoading: false,
      showData: false,
      auditReportData: {
        'id': '',
        'state': '',
        'basicInfo': '',
        'reason': '',
        'plan': ''
      },
      programme: {
        'title': '',
        'key': '',
        'queryDepartmentId': 0,
        'queryDepartmentName': '',
        'userId': 0,
        'queryPointId': 0,
        'queryPointName': '',
        'purpose': '',
        'type': '',
        'startTime': '',
        'endTime': '',
        'planStartTime': '',
        'planEndTime': '',
        'year': 0,
        'number': 0,
        'authorId': 0,
        'state': '',
        'basis': [],
        'content': [],
        'step': [],
        'business': [],
        'emphases': [],
        'userList': [],
        'depExamines': [],
        'adminExamine': []
      },
      draft: {
        'programmeId': 0,
        'programmeTitle': '',
        'queryDepartmentId': 0,
        'queryDepartmentName': '',
        'departmentId': 0,
        'departmentName': '',
        'introductionId': 0,
        'year': 0,
        'number': 0,
        'projectName': '',
        'public': 0,
        'queryStartTime': '',
        'queryEndTime': '',
        'updateTime': '',
        'authorId': 0,
        'state': '',
        'contentList': [],
        'adminUserList': [],
        'queryUserList': [],
        'reviewUserList': []
      },
      confirmation: {
        'draftId': 0,
        'confirmationReceiptId': 0,
        'hasRead': 0,
        'hasReadTime': '',
        'state': '',
        'year': 0,
        'number': 0,
        'draft': {
          'id': 0,
          'programmeId': 0,
          'programmeTitle': '',
          'queryDepartmentId': 0,
          'queryDepartmentName': '',
          'departmentId': 0,
          'departmentName': '',
          'introductionId': 0,
          'year': 0,
          'number': 0,
          'projectName': '',
          'public': 0,
          'queryStartTime': '',
          'queryEndTime': '',
          'updateTime': '',
          'authorId': 0,
          'state': ''
        },
        'programme': {
          'id': 0,
          'title': '',
          'key': '',
          'queryDepartmentId': 0,
          'queryDepartmentName': '',
          'userId': 0,
          'queryPointId': 0,
          'queryPointName': '',
          'purpose': '',
          'type': '',
          'startTime': '',
          'endTime': '',
          'planStartTime': '',
          'planEndTime': '',
          'year': 0,
          'number': 0,
          'authorId': 0,
          'state': ''
        },
        'basisList': [],
        'numQuot': [],
        'userList': [],
        'fileList': []
      },
      stepData: [],
      behaviorContent: [],
      headerData: {
        programme: '',
        number: '',
        business: '',
        departmentName: '',
        projectName: ''
      },
      // 组织实施情况
      implement: {
        user: '',
        programme: '',
        work: {}
      },
      // 检查发现的主要问题
      problems: {},
      // 问责
      accountability: {},
      // 整改
      rectification: {},
      fileList: [],
      allReqNum: 0
    }
  },
  watch: {
    allReqNum(val) {
      if (val === 4) {
        this.showLoading = false
      }
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
      if (this.$route.params) {
        const { id } = this.$route.params
        this.getAuditReport(id)
      }
    },
    // 获取审计报告
    getAuditReport(id) {
      getAuditReport({ id }).then(res => {
        if (!res.status.error) {
          const data = res.data
          this.auditReportData = data
          //  获取方案
          this.getProgrammeData(data.programmeId)
          //  获取工作底稿
          this.getDraftData(data.draftId)
          //  获取确认书
          this.getConfirmationData(data.confirmationId)
          //  获取整改报告
          this.getRectifyReportData(data.rectifyReportId)
        } else {
          this.$message({ type: 'error', message: res.status.msg })
        }
      })
    },
    //  获取方案
    getProgrammeData(id) {
      programmeGet({ id }).then(res => {
        if (!res.status.error) {
          const data = res.data
          // this.headerData.programme = data.title
          // const business = []
          // data.business.map(res => {
          //   business.push(res.content)
          // })
          // this.headerData.business = business.join('，')
          this.changeGetStepDataType(data.step)
          this.programme = res.data
          // this.implement.work = data
        } else {
          this.$message({ type: 'error', message: res.status.msg })
        }
        this.allReqNum++
      })
    },
    // 组装实施步骤数据
    changeGetStepDataType(arr) {
      const temp = []
      arr.map(obj => {
        const { type, content } = obj
        const item = { type, content }
        const last = temp[temp.length > 0 ? temp.length - 1 : 0]
        let lastContent = null
        obj.id && (item['id'] = obj.id)
        switch (type) {
          case 'title':
            item['stepContent'] = []
            temp.push(item)
            break
          case 'content':
            item['stepList'] = []
            if (last['stepContent']) {
              last['stepContent'].push(item)
            }
            break
          case 'step':
            lastContent = last.stepContent[last.stepContent.length > 0 ? last.stepContent.length - 1 : 0]
            if (lastContent['stepList']) {
              lastContent['stepList'].push(item)
            }
            break
        }
      })
      console.log(temp)
      this.stepData = temp
    },
    //  获取工作底稿
    getDraftData(id) {
      getDraft({ id }).then(res => {
        if (!res.status.error) {
          const data = res.data
          if (data.contentList.length) {
            this.getBehaviorContent(data.contentList)
          }
          this.draft = data
        } else {
          this.$message({ type: 'error', message: res.status.msg })
        }
        this.allReqNum++
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
    },
    //  获取整改报告
    getRectifyReportData(id) {
      getRectifyReport({ id }).then(res => {
        if (!res.status.error) {
          const data = res.data
          this.rectification = data.contentList
        } else {
          this.$message({ type: 'error', message: res.status.msg })
        }
        this.allReqNum++
      })
    },
    //  获取确认书
    getConfirmationData(id) {
      getConfirmation({ id }).then(res => {
        if (!res.status.error) {
          const data = res.data
          this.confirmation = data
          this.getAccountabilityData(data.id)
        } else {
          this.$message({ type: 'error', message: res.status.msg })
        }
        this.allReqNum++
      })
    },
    // 获取问责
    getAccountabilityData(id) {
      getAccountability({ confirmationId: id }).then(res => {
        if (!res.status.error) {
          const data = res.data
          this.accountability = data
        } else {
          this.$message({ type: 'error', message: res.status.msg })
        }
      })
    }
  }
}
</script>

