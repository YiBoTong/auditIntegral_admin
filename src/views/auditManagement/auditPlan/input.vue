<!--
****--@date     2018-12-10 17:48
****--@author   XXL
****--@describe 稽核方案
-->
<template>
  <div class="audit-input-container">
    <div class="form-header">
      <div class="header-left">
        <el-button @click="backList">返回列表</el-button>
      </div>
      <div class="header-right">
        <div class="header-right">
          <el-button
            type="primary"
            size="small"
            @click="submitForm">完成
          </el-button>
          <!--<el-button-->
          <!--:disabled="!canEdit"-->
          <!--size="small"-->
          <!--@click="resetForm('refForm')">重置</el-button>-->
        </div>
      </div>
    </div>

    <el-card>
      <div
        slot="header"
        class="card-header">
        <div class="header-left">
          <span>{{ todoType | typeText }}审计方案</span>
        </div>
      </div>
      <el-row>
        <el-form
          :model="formData"
          :rules="programmeRules"
          label-width="120px"
          class="audit-form">
          <el-col
            :xs="{span: 24}"
            :sm="{span: 24}"
            :md="{span: 24}"
            :lg="{span: 24}"
            :xl="{span: 24}">
            <el-form-item
              label="方案标题"
              prop="title">
              <el-input
                v-model="formData.title"
                placeholder="方案标题" />
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 24}"
            :md="{span: 24}"
            :lg="{span: 24}"
            :xl="{span: 24}">
            <el-form-item
              label="稽核目的"
            >
              <el-input
                v-model="formData.purpose"
                :autosize="{minRows: 1, maxRows: 6}"
                placeholder="稽核目的"
                type="textarea"/>
            </el-form-item>
          </el-col>

          <el-col
            :xs="{span: 24}"
            :sm="{span: 8}"
            :md="{span: 8}"
            :lg="{span: 8}"
            :xl="{span: 8}">
            <el-form-item
              label="方案类型"
            >
              <el-select
                v-model="formData.key"
                clearable
                placeholder="请选择方案类型">
                <el-option
                  v-for="item in auditKey"
                  :key="item.id"
                  :label="item.value"
                  :value="item.key" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 8}"
            :md="{span: 8}"
            :lg="{span: 8}"
            :xl="{span: 8}">
            <el-form-item
              label="稽核审计方式"
            >
              <el-select
                v-model="formData.type"
                clearable
                placeholder="请选择稽核审计方式">
                <el-option
                  v-for="item in auditType"
                  :key="item.id"
                  :label="item.value"
                  :value="item.key" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 8}"
            :md="{span: 8}"
            :lg="{span: 8}"
            :xl="{span: 8}">
            <el-form-item
              label="状态"
            >
              <el-select
                v-model="formData.state"
                clearable
                placeholder="请选择范围">
                <el-option
                  v-for="item in state"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 12}"
            :xl="{span: 6}">
            <el-form-item label="审计开始时间">
              <el-date-picker
                v-model="formData.startTime"
                type="datetime"
                placeholder="请选择审计开始时间"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 12}"
            :xl="{span: 6}">
            <el-form-item label="审计结束时间">
              <el-date-picker
                v-model="formData.endTime"
                type="datetime"
                placeholder="请选择审计结束时间"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 12}"
            :xl="{span: 6}">
            <el-form-item label="工作开始时间">
              <el-date-picker
                v-model="formData.planStartTime"
                type="datetime"
                placeholder="请选择工作开始时间"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 12}"
            :xl="{span: 6}">
            <el-form-item label="工作结束时间">
              <el-date-picker
                v-model="formData.planEndTime"
                type="datetime"
                placeholder="请选择工作结束时间"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-card>

    <el-card>
      <div
        slot="header"
        class="card-header">
        <div class="header-left">
          <span>{{ todoType | typeText }}方案依据</span>
        </div>
      </div>
      <el-row>
        <el-form
          v-for="(basis,index) in formData.basis"
          :key="index"
          :ref="'basisForm'+index"
          :model="basis"
          label-width="50px"
          class="basis-form">
          <el-col
            :xs="{span: 24}"
            :sm="{span: 18}"
            :md="{span: 19}"
            :lg="{span: 20}"
            :xl="{span: 21}">
            <el-form-item
              :label="(index+1).toString()"
            >
              <el-autocomplete
                v-model="basis.content"
                :trigger-on-focus="false"
                :fetch-suggestions="querySearch"
                class="inline-input"
                placeholder="请输入依据内容"
                clearable
                @select="handleSelectTitle"
              />
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
                @click="handleAddBasis"><i class="el-icon-plus" />添加
              </el-button>
              <el-button
                :disabled="formData.basis.length === 1"
                type="text"
                size="medium"
                @click="handleDelBasis(index)"><i class="el-icon-delete" />删除
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-card>

    <el-card>
      <div
        slot="header"
        class="card-header">
        <div class="header-left">
          <span>{{ todoType | typeText }}方案业务范围</span>
        </div>
      </div>
      <el-row>
        <el-form
          v-for="(business,index) in formData.business"
          :key="index"
          :ref="'businessForm'+index"
          :model="business"
          label-width="50px"
          class="business-form">
          <el-col
            :xs="{span: 24}"
            :sm="{span: 18}"
            :md="{span: 19}"
            :lg="{span: 20}"
            :xl="{span: 21}">
            <el-form-item
              :label="(index+1).toString()"
            >
              <el-input
                v-model="business.content"
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
                @click="handleAddBusiness"><i class="el-icon-plus" />添加
              </el-button>
              <el-button
                :disabled="formData.business.length === 1"
                type="text"
                size="medium"
                @click="handleDelBusiness(index)"><i class="el-icon-delete" />删除
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-card>

    <el-card>
      <div
        slot="header"
        class="card-header">
        <div class="header-left">
          <span>{{ todoType | typeText }}方案主要内容</span>
        </div>
      </div>
      <el-row>
        <el-form
          v-for="(content,index) in formData.content"
          :key="index"
          :ref="'contentForm'+index"
          :model="content"
          label-width="50px"
          class="content-form">
          <el-col
            :xs="{span: 24}"
            :sm="{span: 18}"
            :md="{span: 19}"
            :lg="{span: 20}"
            :xl="{span: 21}">
            <el-form-item
              :label="(index+1).toString()"
            >
              <el-input
                v-model="content.content"
                :autosize="{minRows: 1, maxRows: 6}"
                type="textarea"
                placeholder="请输入主要内容" />
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
                @click="handleAddContent"><i class="el-icon-plus" />添加
              </el-button>
              <el-button
                :disabled="formData.content.length === 1"
                type="text"
                size="medium"
                @click="handleDelContent(index)"><i class="el-icon-delete" />删除
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-card>

    <el-card>
      <div
        slot="header"
        class="card-header">
        <div class="header-left">
          <span>{{ todoType | typeText }}方案重点</span>
        </div>
      </div>
      <el-row>
        <el-form
          v-for="(emphases,index) in formData.emphases"
          :key="index"
          :ref="'emphasesForm'+index"
          :model="emphases"
          label-width="50px"
          class="emphases-form">
          <el-col
            :xs="{span: 24}"
            :sm="{span: 18}"
            :md="{span: 19}"
            :lg="{span: 20}"
            :xl="{span: 21}">
            <el-form-item
              :label="(index+1).toString()"
            >
              <el-input
                v-model="emphases.content"
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
                @click="handleAddEmphases"><i class="el-icon-plus" />添加
              </el-button>
              <el-button
                :disabled="formData.emphases.length === 1"
                type="text"
                size="medium"
                @click="handleDelEmphases(index)"><i class="el-icon-delete" />删除
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
    <!--方案实施步骤-->
    <el-card>
      <div slot="header" class="card-header">
        <div class="left">
          <span>{{ todoType | typeText }}方案实施步骤</span>
        </div>
      </div>
      <el-row :gutter="10">
        <el-col
          v-for="(stepDataAll,index) in stepData"
          :key="index">
          <el-form
            :ref="'stepDataAllForm'+index"
            :model="stepDataAll"
            label-width="30px"
            class="violation-content">
            <el-col
              :xs="{span: 12}"
              :sm="{span: 18}"
              :md="{span: 18}"
              :lg="{span: 18}"
              :xl="{span: 19}"
              class="content-type">
              <el-form-item :label="numberConvertToUppercase(index+1)+'、'">
                <el-input
                  v-model="stepDataAll.content"
                  :autosize="{minRows: 1, maxRows: 6}"
                  placeholder="请输入实施步骤标题"
                  type="textarea"
                />
              </el-form-item>
            </el-col>
            <el-col
              :xs="{span: 12}"
              :sm="{span: 6}"
              :md="{span: 6}"
              :lg="{span: 6}"
              :xl="{span: 5}"
              class="row-col-right">
              <el-form-item>
                <el-button
                  type="text"
                  size="medium"
                  @click="addStep"><i class="el-icon-plus" />添加实施步骤
                </el-button>
                <el-button
                  :disabled="stepData.length === 1"
                  type="text"
                  size="medium"
                  @click="delStep(index)"><i class="el-icon-delete" />删除
                </el-button>
              </el-form-item>
            </el-col>
            <el-col
              v-for="(content,sindex) in stepDataAll.stepContent"
              :key="sindex">
              <el-form
                :ref="'contentForm'+sindex"
                :model="content"
                label-width="50px"
                class="content-behavior-content">
                <el-col
                  :xs="{span: 24}"
                  :sm="{span: 18}"
                  :md="{span: 18}"
                  :lg="{span: 18}"
                  :xl="{span: 19}">
                  <el-form-item :label="(sindex+1)+'、'">
                    <!--<el-autocomplete-->
                    <!--v-model="content.content"-->
                    <!--:trigger-on-focus="false"-->
                    <!--:fetch-suggestions="querySearch"-->
                    <!--:autosize="{minRows: 2, maxRows: 6 }"-->
                    <!--class="inline-input"-->
                    <!--placeholder="请输入步骤内容"-->
                    <!--/>-->
                    <el-input
                      v-model="content.content"
                      :autosize="{minRows: 1, maxRows: 6 }"
                      type="textarea"
                      placeholder="请输入步骤内容"/>
                  </el-form-item>
                </el-col>
                <el-col
                  :xs="{span: 24}"
                  :sm="{span: 6}"
                  :md="{span: 6}"
                  :lg="{span: 6}"
                  :xl="{span: 5}"
                  class="row-col-right">
                  <el-form-item>
                    <el-button
                      type="text"
                      size="medium"
                      @click="addStepContent(index,sindex)"><i class="el-icon-plus" />添加内容
                    </el-button>
                    <el-button
                      v-show="!stepData[index].stepContent[sindex].stepList.length"
                      type="text"
                      size="medium"
                      @click="addStepContentStep(index,sindex)"><i class="el-icon-plus" />添加步骤
                    </el-button>
                    <el-button
                      :disabled="stepData[index].stepContent.length === 1"
                      type="text"
                      size="medium"
                      @click="delStepContent(index,sindex)"><i class="el-icon-delete" />删除
                    </el-button>
                  </el-form-item>
                </el-col>
                <el-col
                  v-for="(step,stepIndex) in content.stepList"
                  :key="stepIndex">
                  <el-form
                    :ref="'stepForm'+stepIndex"
                    :model="step"
                    label-width="70px"
                    class="content-behavior-content">
                    <el-col
                      :xs="{span: 24}"
                      :sm="{span: 18}"
                      :md="{span: 18}"
                      :lg="{span: 18}"
                      :xl="{span: 20}">
                      <el-form-item :label="(stepIndex+1)+'.'">
                        <!--<el-autocomplete-->
                        <!--v-model="content.content"-->
                        <!--:trigger-on-focus="false"-->
                        <!--:fetch-suggestions="querySearch"-->
                        <!--:autosize="{minRows: 2, maxRows: 6 }"-->
                        <!--class="inline-input"-->
                        <!--placeholder="请输入步骤内容"-->
                        <!--/>-->
                        <el-input
                          v-model="step.content"
                          :autosize="{minRows: 1, maxRows: 6 }"
                          type="textarea"
                          placeholder="请输入步骤"/>
                      </el-form-item>
                    </el-col>
                    <el-col
                      :xs="{span: 24}"
                      :sm="{span: 6}"
                      :md="{span: 6}"
                      :lg="{span: 6}"
                      :xl="{span: 4}"
                      class="row-col-right">
                      <el-form-item>
                        <el-button
                          type="text"
                          size="medium"
                          @click="addStepContentStep(index,sindex,stepIndex)"><i class="el-icon-plus" />添加步骤
                        </el-button>
                        <el-button
                          type="text"
                          size="medium"
                          @click="delStepContentStep(index,sindex,stepIndex)"><i class="el-icon-delete" />删除
                        </el-button>
                      </el-form-item>
                    </el-col>
                  </el-form>
                </el-col>
              </el-form>
            </el-col>
          </el-form>
        </el-col>
      </el-row>
    </el-card>

    <el-card>
      <div
        slot="header"
        class="card-header">
        <div class="header-left">
          <span>{{ todoType | typeText }}参与人员</span>
        </div>
      </div>
      <el-row>
        <el-form
          v-for="(user,index) in formData.userList"
          :key="index"
          :ref="'userForm'+index"
          :model="user"
          :rules="userRules"
          label-width="50px"
          class="user-form">
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 7}"
            :xl="{span: 7}">
            <el-form-item
              :label="(index+1).toString()"
            >
              <el-select
                v-model="user.job"
                clearable
                placeholder="请选择员工行政职务">
                <el-option
                  v-for="item in userJob"
                  :key="item.id"
                  :label="item.value"
                  :value="item.key" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 7}"
            :xl="{span: 7}">
            <el-form-item>
              <el-select
                v-model="user.title"
                clearable
                placeholder="请选择员工技术职称">
                <el-option
                  v-for="item in userTitle"
                  :key="item.id"
                  :label="item.value"
                  :value="item.key" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 6}"
            :xl="{span: 7}">
            <el-form-item >
              <el-select
                v-model="user.task"
                clearable
                placeholder="请选择员工分工">
                <el-option
                  v-for="item in userTask"
                  :key="item.id"
                  :label="item.value"
                  :value="item.key" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 4}"
            :xl="{span: 3}">
            <el-form-item>
              <el-button
                type="text"
                size="medium"
                @click="handleAddUser"><i class="el-icon-plus" />添加
              </el-button>
              <el-button
                :disabled="formData.userList.length === 1"
                type="text"
                size="medium"
                @click="handleDelUser(index)"><i class="el-icon-delete" />删除
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-card>

  </div>
</template>
<script>
/* 当前组件必要引入 */
import { state, type } from './state'
import { programmeAdd, programmeGet, programmeEdit } from '@/api/auditManagement'
import { dictGet } from '@/api/systemManagement'
import { userRules, programmeRules } from './rules'
import { clausesTitleSearch } from '@/api/organizationalManagement'

export default {
  name: 'LoginManagementInput',
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
      state,
      type,
      userRules,
      programmeRules,
      listLoading: false,
      todoType: 'Add',
      canEdit: true,
      auditKey: '',
      auditType: '',
      userJob: '',
      userTitle: '',
      userTask: '',
      formData: {
        id: '',
        key: '',
        purpose: '',
        type: '',
        startTime: '',
        endTime: '',
        planStartTime: '',
        planEndTime: '',
        state: '',
        basis: [],
        business: [],
        content: [],
        emphases: [],
        step: [],
        userList: []
      },
      stepData: []
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
      if (!this.paramsData) {
        this.getAuditDict()
        this.handleAddBasis()
        this.handleAddBusiness()
        this.handleAddContent()
        this.handleAddEmphases()
        this.handleAddUser()
        this.addStep()
      } else {
        this.todoType = 'Edit'
        const id = this.paramsData.id
        this.getAuditDict()
        this.getAuditPlan(id)
      }
    },
    // 获取编辑的方案
    getAuditPlan(id) {
      programmeGet({ id: id }).then(res => {
        this.formData = res.data
      })
    },
    // 获取字典
    getAuditDict() {
      dictGet({ id: -5 }).then(res => {
        this.auditKey = res.data.dictionaries
      })
      dictGet({ id: -6 }).then(res => {
        this.auditType = res.data.dictionaries
      })
      dictGet({ id: -8 }).then(res => {
        this.userJob = res.data.dictionaries
      })
      dictGet({ id: -7 }).then(res => {
        this.userTitle = res.data.dictionaries
      })
      dictGet({ id: -9 }).then(res => {
        this.userTask = res.data.dictionaries
      })
    },
    // 返回列表
    backList() {
      this.$emit('view', 'list')
    },
    // 搜索方案依据
    querySearch(queryString, cb) {
      // 获取管理标题
      if (queryString.length > 1) {
        clausesTitleSearch({ title: queryString }).then(res => {
          var data = res.data
          var restaurants = []
          data.map(res => {
            var obj = { value: res.title }
            restaurants.push(obj)
          })
          // console.log(restaurants)
          var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
          // 调用 callback 返回建议列表的数据
          cb(results)
        })
      }
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelectTitle(value) {
      console.log(value)
    },
    // 添加实施步骤
    addStep() {
      this.stepData.push({
        'type': 'title',
        'content': '',
        'stepContent': []
      })
      const len = this.stepData.length
      this.addStepContent(len > 0 ? len - 1 : 0)
    },
    // 删除实施步骤
    delStep(index) {
      this.stepData.splice(index, 1)
    },
    // 添加实施步骤内容
    addStepContent(index) {
      const contentItem = { type: 'content', content: '', stepList: [] }
      this.stepData[index].stepContent.push(contentItem)
    },
    // 删除添加实施步骤内容
    delStepContent(index, sindex) {
      this.stepData[index].stepContent.splice(sindex, 1)
    },
    // 添加实施步骤步骤
    addStepContentStep(index, sindex) {
      const stepList = { type: 'step', content: '' }
      this.stepData[index].stepContent[sindex].stepList.push(stepList)
    },
    // 删除实施步骤步骤
    delStepContentStep(index, sindex, stepIndex) {
      this.stepData[index].stepContent[sindex].stepList.splice(stepIndex, 1)
    },
    // 获取到实施步骤数据时调用此函数将数据重新组装成前端需要显示的数据格式
    changeGetStepDataType(arr) {
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
      console.log(temp)
      this.behaviorContent = temp
    },
    // 提交实施步骤数据时调用此函数将数据重新组装成后端需要的数据格式
    changeSubmitStepDataType() {
      // let order = 0
      // const temp = []
      // this.behaviorContent.map(item => {
      //   const { type, content } = item
      //   // 排除违规分类下的空违规内容
      //   const behaviorContent = item.behaviorContent.filter(cItem => cItem.behaviorContent !== '')
      //   // 如果当前违规分类下没有违规内容，则不添加
      //   if (behaviorContent.length) {
      //     order++
      //     // 添加违规分类
      //     temp.push({ type, behaviorContent: content, behaviorId: 0, order })
      //     // 添加违规分类项
      //     behaviorContent.map(cItem => {
      //       order++
      //       cItem['order'] = order
      //       temp.push(cItem)
      //     })
      //   }
      // })
      // return temp
      let order = 0
      const newStepData = []
      const stepData = this.stepData
      stepData.map(res => {
        const { type, content } = res
        // 过滤实施步骤下空的实施内容
        const stepContent = res.stepContent.filter(item => item.contnet !== '')
        // 判断过滤后实施步骤下是否有实施内容，有则重组数据
        if (stepContent.length) {
          order++
          // 添加实施步骤标题
          newStepData.push({ type, content: content, order })
          // 添加实施步骤内容
          stepContent.map(res => {
            const { type, content } = res
            const stepList = res.stepList.filter(item => item.content !== '')
            if (stepList.length) {
              order++
              newStepData.push({ type, content: content, order })
              stepList.map(item => {
                order++
                item['order'] = order
                newStepData.push(item)
              })
            } else {
              order++
              newStepData.push({ type, content: content, order })
            }
          })
        }
      })
      return newStepData
    },
    // 提交表单
    submitForm() {
      // this.listLoading = true
      const data = Object.assign({}, this.formData)
      // 较为耗费性能
      // for (var v in data) {
      //   if (data[v].length > 0) {
      //     data[v] = data[v].filter(item => item.content !== '')
      //   }
      // }
      // 较优
      const v = ['basis', 'business', 'content', 'emphases', 'step', 'userList']
      v.map(key => {
        data[key] = data[key].filter(item => item.content !== '')
        for (var index in data[key]) {
          data[key][index].order = ++index
        }
      })
      data.step = this.changeSubmitStepDataType()
      console.log(data.step)
      this[this.todoType.toLocaleLowerCase() + 'AuditPlan'](data)
    },
    // 创建
    addAuditPlan(data) {
      programmeAdd(data).then((res) => {
        this.$message({
          type: res.status.error ? 'error' : 'success',
          message: res.status.msg + '!'
        })
        if (!res.status.error) {
          this.backList()
        }
      })
    },
    // 编辑
    editAuditPlan(data) {
      programmeEdit(data).then((res) => {
        this.$message({
          type: res.status.error ? 'error' : 'success',
          message: res.status.msg + '!'
        })
        if (!res.status.error) {
          this.backList()
        }
      })
    },
    // 添加方案依据
    handleAddBasis() {
      this.formData.basis.push({
        clauseId: '',
        content: '',
        order: ''
      })
    },
    // 删除方案依据
    handleDelBasis(index) {
      this.formData.basis.splice(index, 1)
    },
    // 添加方案业务范围
    handleAddBusiness() {
      this.formData.business.push({
        content: ''
      })
    },
    // 删除方案业务范围
    handleDelBusiness(index) {
      this.formData.business.splice(index, 1)
    },
    // 添加方案主要内容
    handleAddContent() {
      this.formData.content.push({
        content: ''
      })
    },
    // 删除方案主要内容
    handleDelContent(index) {
      this.formData.content.splice(index, 1)
    },
    // 添加方案重点
    handleAddEmphases() {
      this.formData.emphases.push({
        content: ''
      })
    },
    // 删除方案重点
    handleDelEmphases(index) {
      this.formData.emphases.splice(index, 1)
    },
    // 添加参与人员
    handleAddUser() {
      this.formData.userList.push({
        userId: '',
        job: '',
        title: '',
        task: '',
        order: ''
      })
    },
    // 删除参与人员
    handleDelUser(index) {
      this.formData.userList.splice(index, 1)
    }
  }
}
</script>
