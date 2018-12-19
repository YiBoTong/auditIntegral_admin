<!--
****--@date     2018-12-18 10:02
****--@author   XXL
****--@describe show
-->
<template>
  <div class="audit-input-container">
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
          :model="tableData"
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
              {{ tableData.title }}
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
              {{ tableData.purpose }}
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
              {{ tableData.key | auditKey }}
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
              {{ tableData.type | auditType }}
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
              {{ tableData.state | typeText }}
            </el-form-item>
          </el-col>

          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 12}"
            :xl="{span: 6}">
            <el-form-item label="审计开始时间">
              {{ tableData.startTime }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 12}"
            :xl="{span: 6}">
            <el-form-item label="审计结束时间">
              {{ tableData.endTime }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 12}"
            :xl="{span: 6}">
            <el-form-item label="工作开始时间">
              {{ tableData.planStartTime }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 12}"
            :xl="{span: 6}">
            <el-form-item label="工作结束时间">
              {{ tableData.planEndTime }}
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
        <el-table
          :data="tableData.basis"
          border
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="100"/>
          <el-table-column
            prop="content"
            label="内容"/>
        </el-table>
      </div>
    </el-card>

    <el-card>
      <div slot="header" class="card-header">
        <div class="header-left">
          <span>工作方案业务范围</span>
        </div>
      </div>
      <div class="audit-show-table">
        <el-table
          :data="tableData.business"
          border
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="100"/>
          <el-table-column
            prop="content"
            label="内容"/>
        </el-table>
      </div>
    </el-card>

    <el-card>
      <div slot="header" class="card-header">
        <div class="header-left">
          <span>工作方案主要内容</span>
        </div>
      </div>
      <div class="audit-show-table">
        <el-table
          :data="tableData.content"
          border
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="100"/>
          <el-table-column
            prop="content"
            label="内容"/>
        </el-table>
      </div>
    </el-card>

    <el-card>
      <div slot="header" class="card-header">
        <div class="header-left">
          <span>工作方案重点</span>
        </div>
      </div>
      <div class="audit-show-table">
        <el-table
          :data="tableData.emphases"
          border
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="100"/>
          <el-table-column
            prop="content"
            label="内容"/>
        </el-table>
      </div>
    </el-card>

    <el-card>
      <div slot="header" class="card-header">
        <div class="header-left">
          <span>审查方案实施步骤</span>
        </div>
      </div>
      <div class="audit-show-table">
        <el-table
          :data="tableData.step"
          border
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="100"/>
          <el-table-column
            prop="type"
            label="类型">
            <template slot-scope="scope">
              {{ scope.row.type | auditStep }}
            </template>
          </el-table-column>
          <el-table-column
            prop="content"
            label="内容"/>
        </el-table>
      </div>

    </el-card>

    <el-card>
      <div slot="header" class="card-header">
        <div class="header-left">
          <span>工作方案人员</span>
        </div>
      </div>
      <div class="audit-show-table">
        <el-table
          :data="tableData.userList"
          border
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="100"/>
          <el-table-column
            prop="job"
            label="员工行政职务">
            <template slot-scope="scope">
              {{ scope.row.job | userJob }}
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="员工技术职称">
            <template slot-scope="scope">
              {{ scope.row.title | userTitle }}
            </template>
          </el-table-column>
          <el-table-column
            prop="task"
            label="员工分工">
            <template slot-scope="scope">
              {{ scope.row.task | userTask }}
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
      tableData: {
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
        this.tableData = res.data
      })
    }
  }
}
</script>
