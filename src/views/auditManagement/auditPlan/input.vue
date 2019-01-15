<!--
****--@date     2018-12-10 17:48
****--@author   XXL
****--@describe 稽核方案
-->
<template>
  <!--审计方案-->
  <el-card v-loading="showLoading" class="editMainBox">
    <el-row slot="header" class="card-header">
      <el-col :span="12">
        <el-button type="text">{{ editType | typeText }}审计方案</el-button>
      </el-col>
      <el-col :span="12" align="right">
        <el-button type="text" @click="backList">返回列表</el-button>
      </el-col>
    </el-row>
    <!--审计方案-->
    <el-row>
      <el-form :model="formData" :rules="programmeRules" label-width="120px" class="audit-form">
        <el-col
          :xs="{span: 24}"
          :sm="{span: 24}"
          :md="{span: 24}"
          :lg="{span: 24}"
          :xl="{span: 24}"
        >
          <el-form-item label="方案标题" prop="title">
            <el-input v-model="formData.title" placeholder="方案标题"/>
          </el-form-item>
        </el-col>
        <el-col
          :xs="{span: 24}"
          :sm="{span: 24}"
          :md="{span: 24}"
          :lg="{span: 24}"
          :xl="{span: 24}"
        >
          <el-form-item label="稽核目的">
            <el-input
              v-model="formData.purpose"
              :autosize="{minRows: 4, maxRows: 6}"
              placeholder="稽核目的"
              type="textarea"
            />
          </el-form-item>
        </el-col>

        <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 12}" :xl="{span: 12}">
          <el-form-item label="方案类型">
            <el-select v-model="formData.key" clearable placeholder="请选择方案类型">
              <el-option
                v-for="item in auditKey"
                :key="item.id"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 12}" :xl="{span: 12}">
          <el-form-item label="稽核审计方式">
            <el-select v-model="formData.type" clearable placeholder="请选择稽核审计方式">
              <el-option
                v-for="item in auditType"
                :key="item.id"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 12}" :xl="{span: 6}">
          <el-form-item label="审计开始时间">
            <el-date-picker
              v-model="formData.startTime"
              type="date"
              placeholder="请选择审计开始时间"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 12}" :xl="{span: 6}">
          <el-form-item label="审计结束时间">
            <el-date-picker
              v-model="formData.endTime"
              type="date"
              placeholder="请选择审计结束时间"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 12}" :xl="{span: 6}">
          <el-form-item label="业务开始时间">
            <el-date-picker
              v-model="formData.planStartTime"
              type="date"
              placeholder="请选择业务开始时间"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 12}" :xl="{span: 6}">
          <el-form-item label="业务结束时间">
            <el-date-picker
              v-model="formData.planEndTime"
              type="date"
              placeholder="请选择业务结束时间"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <!--方案依据-->
    <br>
    <span>方案依据</span>
    <hr>
    <br>
    <el-row>
      <el-form
        v-for="(basis,index) in formData.basis"
        :key="index"
        :ref="'basisForm'+index"
        :model="basis"
        label-width="50px"
        class="basis-form"
      >
        <el-col
          :xs="{span: 24}"
          :sm="{span: 18}"
          :md="{span: 19}"
          :lg="{span: 20}"
          :xl="{span: 21}"
        >
          <el-form-item :label="(index+1).toString()">
            <el-autocomplete
              v-model="basis.content"
              :trigger-on-focus="false"
              :fetch-suggestions="querySearch"
              class="autocomplete-input"
              placeholder="请输入依据内容"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 6}" :md="{span: 5}" :lg="{span: 4}" :xl="{span: 3}">
          <el-form-item>
            <el-button type="text" size="medium" @click="handleAddBasis">
              <i class="el-icon-plus"/>添加
            </el-button>
            <el-button
              :disabled="formData.basis.length === 1"
              type="text"
              size="medium"
              @click="handleDelBasis(index)"
            >
              <i class="el-icon-delete"/>删除
            </el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <!--方案业务范围-->
    <br>
    <span>方案业务范围</span>
    <hr>
    <br>
    <el-row>
      <el-form
        v-for="(business,index) in formData.business"
        :key="index"
        :ref="'businessForm'+index"
        :model="business"
        label-width="50px"
        class="business-form"
      >
        <el-col
          :xs="{span: 24}"
          :sm="{span: 18}"
          :md="{span: 19}"
          :lg="{span: 20}"
          :xl="{span: 21}"
        >
          <el-form-item :label="(index+1).toString()">
            <el-input
              v-model="business.content"
              :autosize="{minRows: 4, maxRows: 6}"
              clearable
              type="textarea"
              placeholder="请输入内容"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 6}" :md="{span: 5}" :lg="{span: 4}" :xl="{span: 3}">
          <el-form-item>
            <el-button type="text" size="medium" @click="handleAddBusiness">
              <i class="el-icon-plus"/>添加
            </el-button>
            <el-button
              :disabled="formData.business.length === 1"
              type="text"
              size="medium"
              @click="handleDelBusiness(index)"
            >
              <i class="el-icon-delete"/>删除
            </el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <!--方案主要内容-->
    <br>
    <span>方案主要内容</span>
    <hr>
    <br>
    <el-row>
      <el-form
        v-for="(content,index) in formData.content"
        :key="index"
        :ref="'contentForm'+index"
        :model="content"
        label-width="50px"
        class="content-form"
      >
        <el-col
          :xs="{span: 24}"
          :sm="{span: 18}"
          :md="{span: 19}"
          :lg="{span: 20}"
          :xl="{span: 21}"
        >
          <el-form-item :label="(index+1).toString()">
            <el-input
              v-model="content.content"
              :autosize="{minRows: 4, maxRows: 6}"
              type="textarea"
              placeholder="请输入主要内容"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 6}" :md="{span: 5}" :lg="{span: 4}" :xl="{span: 3}">
          <el-form-item>
            <el-button type="text" size="medium" @click="handleAddContent">
              <i class="el-icon-plus"/>添加
            </el-button>
            <el-button
              :disabled="formData.content.length === 1"
              type="text"
              size="medium"
              @click="handleDelContent(index)"
            >
              <i class="el-icon-delete"/>删除
            </el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <!--方案重点-->
    <br>
    <span>方案重点</span>
    <hr>
    <br>
    <el-row>
      <el-form
        v-for="(emphases,index) in formData.emphases"
        :key="index"
        :ref="'emphasesForm'+index"
        :model="emphases"
        label-width="50px"
        class="emphases-form"
      >
        <el-col
          :xs="{span: 24}"
          :sm="{span: 18}"
          :md="{span: 19}"
          :lg="{span: 20}"
          :xl="{span: 21}"
        >
          <el-form-item :label="(index+1).toString()">
            <el-input
              v-model="emphases.content"
              :autosize="{minRows: 4, maxRows: 6}"
              clearable
              type="textarea"
              placeholder="请输入内容"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 6}" :md="{span: 5}" :lg="{span: 4}" :xl="{span: 3}">
          <el-form-item>
            <el-button type="text" size="medium" @click="handleAddEmphases">
              <i class="el-icon-plus"/>添加
            </el-button>
            <el-button
              :disabled="formData.emphases.length === 1"
              type="text"
              size="medium"
              @click="handleDelEmphases(index)"
            >
              <i class="el-icon-delete"/>删除
            </el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <!--方案实施步骤-->
    <br>
    <span>方案实施步骤</span>
    <hr>
    <br>
    <el-row :gutter="10">
      <el-col v-for="(stepDataAll,index) in stepData" :key="index">
        <el-form
          :ref="'stepDataAllForm'+index"
          :model="stepDataAll"
          label-width="30px"
          class="violation-content"
        >
          <el-col
            :xs="{span: 12}"
            :sm="{span: 18}"
            :md="{span: 18}"
            :lg="{span: 18}"
            :xl="{span: 19}"
            class="content-type"
          >
            <el-form-item :label="numberConvertToUppercase(index+1)+'、'">
              <el-input
                v-model="stepDataAll.content"
                :autosize="{minRows: 4, maxRows: 6}"
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
            class="row-col-right"
          >
            <el-form-item>
              <el-button type="text" size="medium" @click="addStep">
                <i class="el-icon-plus"/>添加实施步骤
              </el-button>
              <el-button
                :disabled="stepData.length === 1"
                type="text"
                size="medium"
                @click="delStep(index)"
              >
                <i class="el-icon-delete"/>删除
              </el-button>
            </el-form-item>
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
                :sm="{span: 18}"
                :md="{span: 18}"
                :lg="{span: 18}"
                :xl="{span: 19}"
              >
                <el-form-item :label="(sindex+1)+'、'">
                  <el-input
                    v-model="content.content"
                    :autosize="{minRows: 4, maxRows: 6 }"
                    type="textarea"
                    placeholder="请输入步骤内容"
                  />
                </el-form-item>
              </el-col>
              <el-col
                :xs="{span: 24}"
                :sm="{span: 6}"
                :md="{span: 6}"
                :lg="{span: 6}"
                :xl="{span: 5}"
                class="row-col-right"
              >
                <el-form-item>
                  <el-button type="text" size="medium" @click="addStepContent(index,sindex)">
                    <i class="el-icon-plus"/>添加内容
                  </el-button>
                  <el-button
                    v-show="!stepData[index].stepContent[sindex].stepList.length"
                    type="text"
                    size="medium"
                    @click="addStepContentStep(index,sindex)"
                  >
                    <i class="el-icon-plus"/>添加步骤
                  </el-button>
                  <el-button
                    :disabled="stepData[index].stepContent.length === 1"
                    type="text"
                    size="medium"
                    @click="delStepContent(index,sindex)"
                  >
                    <i class="el-icon-delete"/>删除
                  </el-button>
                </el-form-item>
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
                    :sm="{span: 18}"
                    :md="{span: 18}"
                    :lg="{span: 18}"
                    :xl="{span: 20}"
                  >
                    <el-form-item :label="(stepIndex+1)+'.'">
                      <el-input
                        v-model="step.content"
                        :autosize="{minRows: 4, maxRows: 6 }"
                        type="textarea"
                        placeholder="请输入步骤"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col
                    :xs="{span: 24}"
                    :sm="{span: 6}"
                    :md="{span: 6}"
                    :lg="{span: 6}"
                    :xl="{span: 4}"
                    class="row-col-right"
                  >
                    <el-form-item>
                      <el-button
                        type="text"
                        size="medium"
                        @click="addStepContentStep(index,sindex,stepIndex)"
                      >
                        <i class="el-icon-plus"/>添加步骤
                      </el-button>
                      <el-button
                        type="text"
                        size="medium"
                        @click="delStepContentStep(index,sindex,stepIndex)"
                      >
                        <i class="el-icon-delete"/>删除
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

    <!--参与人员-->
    <br>
    <span>参与人员</span>
    <hr>
    <br>
    <el-row>
      <el-form
        v-for="(user,index) in formData.userList"
        :key="index"
        :ref="'userForm'+index"
        :model="user"
        :rules="userRules"
        label-width="50px"
        class="user-form"
      >
        <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 5}" :xl="{span: 5}">
          <el-form-item :label="(index+1).toString()">
            <el-input
              v-model="user.userName"
              clearable
              placeholder="点击选择人员"
              @focus="selectPersonnel(index)"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 5}" :xl="{span: 5}">
          <el-form-item>
            <el-select v-model="user.job" clearable placeholder="请选择员工行政职务">
              <el-option
                v-for="item in userJob"
                :key="item.id"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 5}" :xl="{span: 5}">
          <el-form-item>
            <el-input v-model="user.title" placeholder="请输入员工技术职称" clearable/>
          </el-form-item>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 5}" :xl="{span: 5}">
          <el-form-item>
            <el-input v-model="user.task" type="textarea" placeholder="请输入选择员工分工" clearable/>
          </el-form-item>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 4}" :xl="{span: 4}">
          <el-form-item>
            <el-button type="text" size="medium" @click="handleAddUser">
              <i class="el-icon-plus"/>添加
            </el-button>
            <el-button
              :disabled="formData.userList.length === 1"
              type="text"
              size="medium"
              @click="handleDelUser(index)"
            >
              <i class="el-icon-delete"/>删除
            </el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <!--部门负责人审核记录-->
    <template v-if="formData.depExamines != '' ">
      <br>
      <span>部门负责人审核记录</span>
      <hr>
      <br>
      <div class="audit-show-table">
        <el-table :data="formData.depExamines" border style="width: 100%">
          <el-table-column type="index" label="序号" align="center" width="100"/>
          <el-table-column prop="userName" label="审核人"/>
          <el-table-column prop="content" label="审核意见"/>
          <el-table-column prop="time" label="审核时间"/>
          <el-table-column prop="state" label="审核结果">
            <template slot-scope="scope">{{ scope.row.state | auditStateChange }}</template>
          </el-table-column>
        </el-table>
      </div>
      <br>
    </template>

    <!--分管领导审核记录-->
    <template v-if="formData.adminExamine != '' ">
      <span>分管领导审核记录</span>
      <hr>
      <br>
      <div class="audit-show-table">
        <el-table :data="formData.adminExamine" border style="width: 100%">
          <el-table-column type="index" label="序号" align="center" width="100"/>
          <el-table-column prop="userName" label="审核人"/>
          <el-table-column prop="content" label="审核意见"/>
          <el-table-column prop="time" label="审核时间"/>
          <el-table-column prop="state" label="审核结果">
            <template slot-scope="scope">{{ scope.row.state | auditStateChange }}</template>
          </el-table-column>
        </el-table>
      </div>
      <br>
    </template>

    <div align="center">
      <el-button type="primary" size="small" @click="handleEdit('draft')">保存为草稿</el-button>
      <el-button plain size="small" @click="handleEdit('report')">保存并上报</el-button>
    </div>
    <personnel-dialog
      :select-one="true"
      :visible.sync="PerVisible"
      :width="width"
      :title="title"
      :form-index="formIndex"
      @personnel="onPersonnel"
    />
  </el-card>
</template>
<script>
/* 当前组件必要引入 */
import { state, type } from './state'
import { programmeAdd, programmeGet, programmeEdit } from '@/api/auditManagement'
import { dictGet } from '@/api/systemManagement'
import { userRules, programmeRules } from '@/utils/rules'
import { clausesTitleSearch } from '@/api/organizationalManagement'
import PersonnelDialog from '@/components/PersonnelDialog/personnelDialog'

export default {
  name: 'LoginManagementInput',
  components: { PersonnelDialog },
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
      editType: 'Add',
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
      stepData: [],
      PerVisible: false,
      width: '',
      title: '',
      formIndex: ''
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
      this.showLoading = true
      if (!this.paramsData) {
        this.getAuditDict()
        this.handleAddBasis()
        this.handleAddBusiness()
        this.handleAddContent()
        this.handleAddEmphases()
        this.handleAddUser()
        this.addStep()
        this.showLoading = false
      } else {
        if (this.paramsData.editType === 'Edit') {
          this.editType = 'Edit'
        } else {
          this.editType = 'Copy'
        }
        const id = this.paramsData.id
        this.getAuditDict()
        this.getAuditPlan(id)
        this.showLoading = false
      }
    },
    // 获取编辑的方案
    getAuditPlan(id) {
      programmeGet({ id: id }).then(res => {
        const data = res.data
        this.changeGetStepDataType(data.step)
        if (this.editType === 'Copy') {
          data.state === 'draft'
        }
        this.formData = data
        if (!data.basis.length) {
          this.handleAddBasis()
        }
        if (!data.business.length) {
          this.handleAddBusiness()
        }
        if (!data.content.length) {
          this.handleAddContent()
        }
        if (!data.emphases.length) {
          this.handleAddEmphases()
        }
        if (!data.userList.length) {
          this.handleAddUser()
        }
        if (!data.step.length) {
          this.addStep()
        }
        this.showLoading = false
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
      dictGet({ id: -2 }).then(res => {
        this.userJob = res.data.dictionaries
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
          console.log(queryString)
          var data = res.data
          console.log(data)
          var restaurants = []
          data.map(res => {
            var obj = { value: `《${res.title}》` + (res.number ? `（${res.number}）` : '') }
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
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1)
      }
    },
    handleSelectTitle(value) {
      console.log(value)
    },
    // 选择人员
    selectPersonnel(value) {
      this.PerVisible = true
      this.width = '900px'
      this.title = '选择人员'
      this.formIndex = value.toString()
    },
    // dialog获取的人员
    onPersonnel(data) {
      this.formData.userList[data.index].userName = data[0].userName
      this.formData.userList[data.index].userId = data[0].userId
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
    // 提交实施步骤数据时调用此函数将数据重新组装成后端需要的数据格式
    changeSubmitStepDataType() {
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
    handleEdit(state) {
      // this.listLoading = true
      const data = Object.assign({}, this.formData)
      data.state = state
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
      this[this.editType.toLocaleLowerCase() + 'AuditPlan'](data)
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
    // 复制
    copyAuditPlan(data) {
      programmeAdd(data).then((res) => {
        if (!res.status.error) {
          this.$message.success('复制成功！')
          this.backList()
        } else {
          this.$message.error('复制失败！')
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
