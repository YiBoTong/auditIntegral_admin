<!--
****--@date     2018-12-18 10:02
****--@author   XXL
****--@describe show
-->
<template>
  <div class="audit-show-container">
    <div class="form-header">
      <div class="header-left">
        <el-button @click="backList">返回列表</el-button>
      </div>
    </div>

    <el-card>
      <div slot="header" class="card-header">
        <div class="header-left">
          <span>审计方案</span>
        </div>
      </div>
      <el-row>
        <el-form
          :model="formData"
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
              {{ formData.title }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 24}"
            :md="{span: 24}"
            :lg="{span: 24}"
            :xl="{span: 24}">
            <el-form-item
              label="稽核目的">
              {{ formData.purpose }}
            </el-form-item>
          </el-col>

          <el-col
            :xs="{span: 24}"
            :sm="{span: 8}"
            :md="{span: 8}"
            :lg="{span: 8}"
            :xl="{span: 8}">
            <el-form-item
              label="方案类型">
              {{ formData.key | dictionaries(self,-5) }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 8}"
            :md="{span: 8}"
            :lg="{span: 8}"
            :xl="{span: 8}">
            <el-form-item
              label="稽核审计方式">
              {{ formData.type | dictionaries(self,-6) }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 8}"
            :md="{span: 8}"
            :lg="{span: 8}"
            :xl="{span: 8}">
            <el-form-item
              label="状态">
              {{ formData.state | auditStateChange }}
            </el-form-item>
          </el-col>

          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 12}"
            :xl="{span: 6}">
            <el-form-item label="审计开始时间">
              {{ formData.startTime }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 12}"
            :xl="{span: 6}">
            <el-form-item label="审计结束时间">
              {{ formData.endTime }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 12}"
            :xl="{span: 6}">
            <el-form-item label="工作开始时间">
              {{ formData.planStartTime }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 12}"
            :xl="{span: 6}">
            <el-form-item label="工作结束时间">
              {{ formData.planEndTime }}
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-card>

    <el-card>
      <div slot="header" class="card-header">
        <div class="header-left">
          <span>实施稽核的依据</span>
        </div>
      </div>
      <div class="audit-show-table">
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
              :sm="{span: 24}"
              :md="{span: 24}"
              :lg="{span: 24}"
              :xl="{span: 24}">
              <el-form-item
                :label="(index+1).toString()"
                v-model="basis.order"
              >
                <div v-show="false">
                  {{ basis.order = (index+1) }}
                </div>
                {{ basis.content }}
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>

      </div>
    </el-card>

    <el-card>
      <div slot="header" class="card-header">
        <div class="header-left">
          <span>工作方案业务范围</span>
        </div>
      </div>
      <div class="audit-show-table">
        <el-form
          v-for="(business,index) in formData.business"
          :key="index"
          :ref="'businessForm'+index"
          :model="business"
          label-width="50px"
          class="business-form">
          <el-col
            :xs="{span: 24}"
            :sm="{span: 24}"
            :md="{span: 24}"
            :lg="{span: 24}"
            :xl="{span: 24}">
            <el-form-item
              :label="(index+1).toString()"
            >
              <div v-show="false">
                {{ business.order = (index+1) }}
              </div>
              {{ business.content }}
            </el-form-item>
          </el-col>
        </el-form>
      </div>
    </el-card>

    <el-card>
      <div slot="header" class="card-header">
        <div class="header-left">
          <span>工作方案主要内容</span>
        </div>
      </div>
      <div class="audit-show-table">
        <el-form
          v-for="(content,index) in formData.content"
          :key="index"
          :ref="'contentForm'+index"
          :model="content"
          label-width="50px"
          class="content-form">
          <el-col
            :xs="{span: 24}"
            :sm="{span: 24}"
            :md="{span: 24}"
            :lg="{span: 24}"
            :xl="{span: 24}">
            <el-form-item
              :label="(index+1).toString()"
            >
              <div v-show="false">
                {{ content.order = (index+1) }}
              </div>
              {{ content.content }}
            </el-form-item>
          </el-col>
        </el-form>

      </div>
    </el-card>

    <el-card>
      <div slot="header" class="card-header">
        <div class="header-left">
          <span>工作方案重点</span>
        </div>
      </div>
      <div class="audit-show-table">
        <el-form
          v-for="(emphases,index) in formData.emphases"
          :key="index"
          :ref="'emphasesForm'+index"
          :model="emphases"
          label-width="50px"
          class="emphases-form">
          <el-col
            :xs="{span: 24}"
            :sm="{span: 24}"
            :md="{span: 24}"
            :lg="{span: 24}"
            :xl="{span: 24}">
            <el-form-item
              :label="(index+1).toString()"
            >
              <div v-show="false">
                {{ emphases.order = (index+1) }}
              </div>
              {{ emphases.content }}
            </el-form-item>
          </el-col>
        </el-form>
      </div>
    </el-card>

    <el-card>
      <div slot="header" class="card-header">
        <div class="header-left">
          <span>审查方案实施步骤</span>
        </div>
      </div>
      <div class="audit-show-table">
        <el-form
          v-for="(step,index) in formData.step"
          :key="index"
          :ref="'stepForm'+index"
          :model="step"
          label-width="50px"
          class="step-form">
          <el-col
            :xs="{span: 24}"
            :sm="{span: 4}"
            :md="{span: 4}"
            :lg="{span: 4}"
            :xl="{span: 4}">
            <el-form-item
              :label="(index+1).toString()"
            >
              <div v-show="false">
                {{ step.order = (index+1) }}
              </div>
              {{ step.type }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 20}"
            :md="{span: 20}"
            :lg="{span: 20}"
            :xl="{span: 20}">
            <el-form-item
            >
              {{ step.content }}
            </el-form-item>
          </el-col>
        </el-form>
      </div>
    </el-card>

    <el-card>
      <div slot="header" class="card-header">
        <div class="header-left">
          <span>工作方案人员</span>
        </div>
      </div>
      <div class="audit-show-table">
        <el-form
          v-for="(user,index) in formData.userList"
          :key="index"
          :ref="'userForm'+index"
          :model="user"
          label-width="50px"
          class="user-form">
          <el-col
            :xs="{span: 24}"
            :sm="{span: 8}"
            :md="{span: 8}"
            :lg="{span: 8}"
            :xl="{span: 8}">
            <el-form-item
              :label="(index+1).toString()"
            >
              <div v-show="false">
                {{ user.order = (index+1) }}
              </div>
              {{ user.job | dictionaries(self,-8) }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 8}"
            :md="{span: 8}"
            :lg="{span: 8}"
            :xl="{span: 8}">
            <el-form-item>
              {{ user.title | dictionaries(self,-7) }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 8}"
            :md="{span: 8}"
            :lg="{span: 8}"
            :xl="{span: 8}">
            <el-form-item >
              {{ user.task | dictionaries(self,-9) }}
            </el-form-item>
          </el-col>
        </el-form>
      </div>
    </el-card>

    <el-card v-if="formData.depExamines != '' ">
      <div slot="header" class="card-header">
        <div class="header-left">
          <span>部门负责人审核记录</span>
        </div>
      </div>
      <div class="audit-show-table">
        <el-table
          :data="formData.depExamines"
          border
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="100"/>
          <el-table-column
            prop="userName"
            label="审核人"/>
          <el-table-column
            prop="content"
            label="审核意见"/>
          <el-table-column
            prop="time"
            label="审核时间"/>
          <el-table-column
            prop="state"
            label="审核结果">
            <template slot-scope="scope">
              {{ scope.row.state | auditStateChange }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <el-card v-if="formData.adminExamine != '' ">
      <div slot="header" class="card-header">
        <div class="header-left">
          <span>分管领导审核记录</span>
        </div>
      </div>
      <div class="audit-show-table">
        <el-table
          :data="formData.adminExamine"
          border
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="100"/>
          <el-table-column
            prop="userName"
            label="审核人"/>
          <el-table-column
            prop="content"
            label="审核意见"/>
          <el-table-column
            prop="time"
            label="审核时间"/>
          <el-table-column
            prop="state"
            label="审核结果">
            <template slot-scope="scope">
              {{ scope.row.state | auditStateChange }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

  </div>
</template>
<script>
/* 当前组件必要引入 */
import { programmeGet } from '@/api/auditManagement'

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
      listLoading: false,
      self: this,
      formData: {
        id: '',
        purpose: '',
        type: ' ',
        start_time: '',
        end_time: '',
        plan_start_time: '',
        plan_end_time: '',
        update_time: '',
        state: '',
        basis: [],
        business: [],
        content: [],
        emphases: [],
        step: [],
        userList: [],
        adminExamine: [],
        depExamines: []
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
      if (this.paramsData) {
        const id = this.paramsData.id
        this.getAuditPlan(id)
      }
    },
    // 返回列表
    backList() {
      this.$emit('view', 'list')
    },
    // 获取
    getAuditPlan(id) {
      programmeGet({ id: id }).then(res => {
        this.formData = res.data
      })
    }
  }
}
</script>
