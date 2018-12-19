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
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" />
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
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" />
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
              v-model="basis.order"
            >
              <div v-show="false">
                {{ basis.order = (index+1) }}
              </div>
              <el-input
                v-model="basis.content"
                :autosize="{minRows: 1, maxRows: 6}"
                clearable
                type="textarea"
                placeholder="请输入依据内容" />
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
              <div v-show="false">
                {{ business.order = (index+1) }}
              </div>
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
              <div v-show="false">
                {{ content.order = (index+1) }}
              </div>
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
              <div v-show="false">
                {{ emphases.order = (index+1) }}
              </div>
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

    <el-card>
      <div
        slot="header"
        class="card-header">
        <div class="header-left">
          <span>{{ todoType | typeText }}方案实施步骤</span>
        </div>
      </div>
      <el-row>
        <el-form
          v-for="(step,index) in formData.step"
          :key="index"
          :ref="'stepForm'+index"
          :model="step"
          label-width="50px"
          class="step-form">
          <el-col
            :xs="{span: 12}"
            :sm="{span: 12}"
            :md="{span: 5}"
            :lg="{span: 4}"
            :xl="{span: 4}">
            <el-form-item
              :label="(index+1).toString()"
            >
              <div v-show="false">
                {{ step.order = (index+1) }}
              </div>
              <el-select
                v-model="step.type"
                clearable
                placeholder="请选择类型">
                <el-option
                  v-for="item in type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 24}"
            :md="{span: 14}"
            :lg="{span: 16}"
            :xl="{span: 17}">
            <el-form-item
            >
              <el-input
                v-model="step.content"
                :autosize="{minRows: 1, maxRows: 6}"
                type="textarea"
                placeholder="请输入内容" />
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 12}"
            :sm="{span: 12}"
            :md="{span: 5}"
            :lg="{span: 4}"
            :xl="{span: 3}">
            <el-form-item>
              <el-button
                type="text"
                size="medium"
                @click="handleAddStep"><i class="el-icon-plus" />添加
              </el-button>
              <el-button
                :disabled="formData.step.length === 1"
                type="text"
                size="medium"
                @click="handleDelStep(index)"><i class="el-icon-delete" />删除
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
              <div v-show="false">
                {{ user.order = (index+1) }}
              </div>
              <el-select
                v-model="user.job"
                clearable
                placeholder="请选择员工行政职务">
                <el-option
                  v-for="item in userJob"
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
            :lg="{span: 7}"
            :xl="{span: 7}">
            <el-form-item>
              <el-select
                v-model="user.title"
                clearable
                placeholder="请选择员工技术职称">
                <el-option
                  v-for="item in userTitle"
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
            :lg="{span: 6}"
            :xl="{span: 7}">
            <el-form-item >
              <el-select
                v-model="user.task"
                clearable
                placeholder="请选择员工分工">
                <el-option
                  v-for="item in userTask"
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
      if (!this.paramsData) {
        this.getAuditDict()
        this.handleAddBasis()
        this.handleAddBusiness()
        this.handleAddContent()
        this.handleAddEmphases()
        this.handleAddStep()
        this.handleAddUser()
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
      dictGet({ id: 122 }).then(res => {
        this.auditKey = res.data.dictionaries
      })
      dictGet({ id: 123 }).then(res => {
        this.auditType = res.data.dictionaries
      })
      dictGet({ id: 124 }).then(res => {
        this.userJob = res.data.dictionaries
      })
      dictGet({ id: 125 }).then(res => {
        this.userTitle = res.data.dictionaries
      })
      dictGet({ id: 126 }).then(res => {
        this.userTask = res.data.dictionaries
      })
    },
    // 返回列表
    backList() {
      this.$emit('view', 'list')
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
      })
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
    // 添加方案实施步骤
    handleAddStep() {
      this.formData.step.push({
        type: '',
        content: ''
      })
    },
    // 删除方案实施步骤
    handleDelStep(index) {
      this.formData.step.splice(index, 1)
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
