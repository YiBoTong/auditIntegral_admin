<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 创建修改
-->
<template>
  <div
    class="punish-edit-container">
    <div class="edit-header">
      <div class="header-left">
        <el-button @click="backList">返回列表</el-button>
      </div>
    </div>
    <!--工作底稿-->
    <el-card>
      <div slot="header" class="card-header">
        <span>工作底稿</span>
      </div>
      <el-row :gutter="10">
        <el-form
          ref="refForm"
          :model="formData"
          label-width="100px">
          <el-col
            :xs="{span: 24}"
            :sm="{span: 24}"
            :md="{span: 24}"
            :lg="{span: 24}"
            :xl="{span: 24}">
            <el-form-item
              label="检查单位"
              prop="title">
              {{ formData.departmentName }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 8}">
            <el-form-item label="日期">
              {{ formData.time }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 8}">
            <el-form-item label="编号">
              {{ formData.number }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 8}">
            <el-form-item
              label="项目名称">
              {{ formData.projectName }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 8}">
            <el-form-item
              label="被检查单位">
              {{ formData.queryDepartmentName }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 8}">
            <el-form-item
              label="检查人">
              {{ formData.checkName }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 8}">
            <el-form-item
              label="复核人">
              {{ formData.reviewName }}
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
    <!--违规内容-->
    <el-card>
      <div slot="header" class="card-header">
        <span>违规内容</span>
      </div>
      <el-row :gutter="10">
        <el-col
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
        </el-col>
      </el-row>
    </el-card>
    <!--积分通知书-->
    <el-card>
      <div slot="header" class="card-header">
        <span>积分通知书</span>
      </div>
      <div class="card-content">
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
              <el-form-item
                label="项目名称">
                {{ punishNoticeData.projectName }}
              </el-form-item>
            </el-col>
            <el-col
              :xs="{span: 24}"
              :sm="{span: 12}"
              :md="{span: 12}"
              :lg="{span: 6}"
              :xl="{span: 6}">
              <el-form-item
                label="被审计人">
                {{ punishNoticeData.userName }}
              </el-form-item>
            </el-col>
            <el-col
              :xs="{span: 24}"
              :sm="{span: 12}"
              :md="{span: 12}"
              :lg="{span: 6}"
              :xl="{span: 6}">
              <el-form-item
                label="审计部门">
                {{ punishNoticeData.queryDepartmentName }}
              </el-form-item>
            </el-col>
            <el-col
              :xs="{span: 24}"
              :sm="{span: 12}"
              :md="{span: 12}"
              :lg="{span: 6}"
              :xl="{span: 6}">
              <el-form-item
                label="审计日期">
                {{ punishNoticeData.time }}
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </el-card>
    <!--违规行为-->
    <el-card>
      <div slot="header" class="card-header">
        <span>违规行为</span>
      </div>
      <div class="card-content">
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
                <el-input
                  v-model="behavior.content"
                  :autosize="{minRows: 1, maxRows: 6}"
                  clearable
                  type="textarea"
                  placeholder="请输入内容" />
              </el-form-item>
            </el-col>
            <el-col
              :xs="{span: 24}"
              :sm="{span: 6}"
              :md="{span: 5}"
              :lg="{span: 4}"
              :xl="{span: 3}">
              <el-form-item>
                <el-button
                  type="text"
                  size="medium"
                  @click="handleAddBehavior"><i class="el-icon-plus" />添加
                </el-button>
                <el-button
                  :disabled="formData.behaviorList.length === 1"
                  type="text"
                  size="medium"
                  @click="handleDelBehavior(index)"><i class="el-icon-delete" />删除
                </el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
      <div class="bottom-button">
        <div><el-button type="primary" size="small" @click="handleSm('draft')">保存为草稿</el-button></div>
        <div><el-button type="primary" size="small" @click="handleSm('publish')">保存并发布</el-button></div>
      </div>
    </el-card>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { programmeGet, getDraft, getPunishNotice, fillingBehavior } from '@/api/auditManagement'
export default {
  name: 'IndexEdit',
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
      programmeData: [],
      fileList: [],
      formData: {
        'projectName': '',
        'departmentName': '',
        'reviewName': '',
        'inspectName': '',
        'checkName': '',
        'programmeId': '',
        'queryDepartmentId': '',
        'departmentId': '',
        'number': '',
        'public': false,
        'type': '',
        'time': '',
        'state': 'draft',
        'queryUsers': '',
        'adminUsers': '',
        'inspectUsers': '',
        'fileIds': '',
        'contentList': [],
        'behaviorList': []
      },
      fillingBehavior: {
        'id': '',
        'state': '',
        'behaviorList': []
      },
      punishNoticeData: {},
      behaviorContent: [],
      todoType: 'Add'
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
      this.getManuscript(this.paramsData.draftId)
      this.getPunishNoticeData()
      this.handleAddBehavior()
    },
    // 返回列表
    backList() {
      this.$emit('view', 'list')
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    //  获取方案
    getAuditPlan(id) {
      console.log(id)
      programmeGet({ id: id }).then(res => {
        this.programmeData = res.data
      })
    },
    // 获取底稿
    getManuscript(id) {
      getDraft({ id: id }).then(res => {
        if (!res.status.error) {
          const data = res.data
          data.behaviorList = []
          console.log(res.data)
          // 获取方案内容
          this.getAuditPlan(data.programmeId)
          // 获取违规内容
          if (!data.contentList.length) {
            return
          } else {
            this.getBehaviorContent(data.contentList)
          }
          this.formData = data
        } else {
          this.$message({
            type: 'error',
            message: res.status.msg + '!'
          })
        }
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
      this.loading = false
    },
    // 获取积分通知书
    getPunishNoticeData() {
      const { id } = this.paramsData
      getPunishNotice({ id }).then(res => {
        if (!res.status.error) {
          this.punishNoticeData = res.data
          console.log(res.data)
          if (!res.data.behaviorList.length) {
            this.handleAddBehavior()
          } else {
            this.formData.behaviorList = res.data.behaviorList
          }
        } else {
          this.$message({
            type: 'error',
            message: res.status.msg + '!'
          })
        }
      })
    },
    // 添加违规行为
    handleAddBehavior() {
      // this.$set(this.formData.behaviorList, this.formData.behaviorList.length, {
      //   'id': '',
      //   'behaviorId': 0,
      //   'content': ''
      // })
      this.formData.behaviorList.push({
        'id': '',
        'behaviorId': 0,
        'content': ''
      })
      console.log('增加')
      console.log(this.formData.behaviorList)
    },
    // 删除违规行为
    handleDelBehavior(index) {
      console.log(index)
      this.formData.behaviorList.splice(index, 1)
    },
    // 提交违规行为
    handleSm(val) {
      const behaviorList = this.formData.behaviorList
      const data = {
        id: this.punishNoticeData.id,
        state: val,
        behaviorList: behaviorList.filter(res => res.content !== '')
      }
      fillingBehavior(data).then(res => {
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
