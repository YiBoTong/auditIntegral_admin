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
    <!--审计方案-->
    <el-card>
      <div slot="header" class="card-header">
        <div class="header-left">
          <span>审计方案</span>
        </div>
      </div>
      <!--审计方案-->
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

      <!--实施稽核的依据-->
      <br>
      <span>实施稽核的依据</span>
      <hr>
      <br>
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

      <!--工作方案业务范围-->
      <br>
      <span>业务范围</span>
      <hr>
      <br>
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

      <!--工作方案主要内容-->
      <br>
      <span>主要内容</span>
      <hr>
      <br>
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

      <!--工作方案重点-->
      <br>
      <span>方案重点</span>
      <hr>
      <br>
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

      <!--审查方案实施步骤-->
      <br>
      <span>方案实施步骤</span>
      <hr>
      <br>
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
              :xs="{span: 24}"
              :sm="{span: 24}"
              :md="{span: 24}"
              :lg="{span: 24}"
              :xl="{span: 24}"
              class="content-type">
              <el-form-item :label="numberConvertToUppercase(index+1)+'、'">
                {{ stepDataAll.content }}
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
                  :sm="{span: 24}"
                  :md="{span: 24}"
                  :lg="{span: 24}"
                  :xl="{span: 24}">
                  <el-form-item :label="(sindex+1)+'、'">
                    {{ content.content }}
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
                      :sm="{span: 24}"
                      :md="{span: 24}"
                      :lg="{span: 24}"
                      :xl="{span: 24}">
                      <el-form-item :label="(stepIndex+1)+'.'">
                        {{ step.content }}
                      </el-form-item>
                    </el-col>
                  </el-form>
                </el-col>
              </el-form>
            </el-col>
          </el-form>
        </el-col>
      </el-row>

      <!--工作方案人员-->
      <br>
      <span>工作人员</span>
      <hr>
      <br>
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

    <!--部门负责人审核记录-->
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

    <!--分管领导审核记录-->
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
        const data = res.data
        this.changeGetStepDataType(data.step)
        this.formData = res.data
      })
    },
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
    }
  }
}
</script>
