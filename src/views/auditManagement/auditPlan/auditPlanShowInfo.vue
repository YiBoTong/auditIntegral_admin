<!--
****--@date     2019-01-06 00:27
****--@author   YC
****--@describe 审计方案查看详情
-->
<template>
  <div>
    <!--审计方案-->
    <el-row>
      <el-form :model="formData" label-width="120px" class="audit-form">
        <el-col
          :xs="{span: 24}"
          :sm="{span: 24}"
          :md="{span: 24}"
          :lg="{span: 24}"
          :xl="{span: 24}"
        >
          <el-form-item label="方案标题" prop="title">{{ formData.title }}</el-form-item>
        </el-col>
        <el-col
          :xs="{span: 24}"
          :sm="{span: 24}"
          :md="{span: 24}"
          :lg="{span: 24}"
          :xl="{span: 24}"
        >
          <el-form-item label="稽核目的">{{ formData.purpose || "—" }}</el-form-item>
        </el-col>

        <el-col :xs="{span: 24}" :sm="{span: 8}" :md="{span: 8}" :lg="{span: 8}" :xl="{span: 8}">
          <el-form-item label="方案类型">{{ formData.key | dictionaries(self,-5) }}</el-form-item>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 8}" :md="{span: 8}" :lg="{span: 8}" :xl="{span: 8}">
          <el-form-item label="稽核审计方式">{{ formData.type | dictionaries(self,-6) }}</el-form-item>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 8}" :md="{span: 8}" :lg="{span: 8}" :xl="{span: 8}">
          <el-form-item label="状态">{{ formData.state | auditStateChange }}</el-form-item>
        </el-col>

        <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 12}" :xl="{span: 6}">
          <el-form-item label="审计开始时间">{{ formData.startTime || "—" }}</el-form-item>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 12}" :xl="{span: 6}">
          <el-form-item label="审计结束时间">{{ formData.endTime || "—" }}</el-form-item>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 12}" :xl="{span: 6}">
          <el-form-item label="工作开始时间">{{ formData.planStartTime || "—" }}</el-form-item>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 12}" :xl="{span: 6}">
          <el-form-item label="工作结束时间">{{ formData.planEndTime || "—" }}</el-form-item>
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
        <template v-if="formData.basis.length">
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
              :sm="{span: 24}"
              :md="{span: 24}"
              :lg="{span: 24}"
              :xl="{span: 24}"
            >
              <el-form-item :label="(index+1).toString()" v-model="basis.order">
                <div v-show="false">{{ basis.order = (index+1) }}</div>
                {{ basis.content }}
              </el-form-item>
            </el-col>
          </el-form>
        </template>
        <p v-else>暂无依据</p>
      </el-row>
    </div>

    <!--工作方案业务范围-->
    <br>
    <span>业务范围</span>
    <hr>
    <br>
    <div class="audit-show-table">
      <template v-if="formData.business.length">
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
            :sm="{span: 24}"
            :md="{span: 24}"
            :lg="{span: 24}"
            :xl="{span: 24}"
          >
            <el-form-item :label="(index+1).toString()">
              <div v-show="false">{{ business.order = (index+1) }}</div>
              {{ business.content }}
            </el-form-item>
          </el-col>
        </el-form>
      </template>
      <p v-else>暂无业务范围</p>
    </div>

    <!--工作方案主要内容-->
    <br>
    <span>主要内容</span>
    <hr>
    <br>
    <div class="audit-show-table">
      <template v-if="formData.content.length">
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
            :sm="{span: 24}"
            :md="{span: 24}"
            :lg="{span: 24}"
            :xl="{span: 24}"
          >
            <el-form-item :label="(index+1).toString()">
              <div v-show="false">{{ content.order = (index+1) }}</div>
              {{ content.content }}
            </el-form-item>
          </el-col>
        </el-form>
      </template>
      <p v-else>暂无主要内容</p>
    </div>

    <!--工作方案重点-->
    <br>
    <span>方案重点</span>
    <hr>
    <br>
    <div class="audit-show-table">
      <template v-if="formData.emphases.length">
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
            :sm="{span: 24}"
            :md="{span: 24}"
            :lg="{span: 24}"
            :xl="{span: 24}"
          >
            <el-form-item :label="(index+1).toString()">
              <div v-show="false">{{ emphases.order = (index+1) }}</div>
              {{ emphases.content }}
            </el-form-item>
          </el-col>
        </el-form>
      </template>
      <p v-else>暂无主要内容</p>
    </div>

    <!--审查方案实施步骤-->
    <br>
    <span>方案实施步骤</span>
    <hr>
    <br>
    <el-row :gutter="10">
      <template v-if="stepData.length">
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
              <el-form-item :label="numberConvertToUppercase(index+1)+'、'">{{ stepDataAll.content }}</el-form-item>
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
      </template>
      <p v-else>暂无方案实施步骤</p>
    </el-row>

    <!--工作方案人员-->
    <br>
    <span>工作人员</span>
    <hr>
    <br>
    <el-row class="audit-show-table">
      <template v-if="formData.userList.length">
        <el-form
          v-for="(user,index) in formData.userList"
          :key="index"
          :ref="'userForm'+index"
          :model="user"
          label-width="50px"
          class="user-form"
        >
          <el-col>
            <el-col
              :xs="{span: 24}"
              :sm="{span: 12}"
              :md="{span: 12}"
              :lg="{span: 6}"
              :xl="{span: 6}"
            >
              <el-form-item :label="(index+1).toString()">{{ user.userName }}</el-form-item>
            </el-col>
            <el-col
              :xs="{span: 24}"
              :sm="{span: 12}"
              :md="{span: 12}"
              :lg="{span: 6}"
              :xl="{span: 6}"
            >
              <el-form-item>
                <div v-show="false">{{ user.order = (index+1) }}</div>
                {{ user.job | dictionaries(self,-2) }}
              </el-form-item>
            </el-col>
            <el-col
              :xs="{span: 24}"
              :sm="{span: 12}"
              :md="{span: 12}"
              :lg="{span: 6}"
              :xl="{span: 6}"
            >
              <el-form-item>{{ user.title }}</el-form-item>
            </el-col>
            <el-col
              :xs="{span: 24}"
              :sm="{span: 12}"
              :md="{span: 12}"
              :lg="{span: 6}"
              :xl="{span: 6}"
            >
              <el-form-item>{{ user.task }}</el-form-item>
            </el-col>
          </el-col>
        </el-form>
      </template>
      <p v-else>暂无方案实施步骤</p>
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
    </template>

    <!--分管领导审核记录-->
    <template v-if="formData.adminExamine != '' ">
      <br>
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
    </template>
  </div>
</template>
<script>
/* 当前组件必要引入 */
export default {
  name: 'AuditPlanShowInfo',
  components: {},
  props: {
    stepData: {
      type: Array,
      default: () => []
    },
    formData: {
      type: Object,
      default: () => ({
        id: '',
        purpose: '',
        title: '',
        type: ' ',
        startTime: '',
        endTime: '',
        planStartTime: '',
        planEndTime: '',
        updateTime: '',
        state: '',
        basis: [],
        business: [],
        content: [],
        emphases: [],
        step: [],
        userList: [],
        adminExamine: [],
        depExamines: []
      })
    }
  },
  data() {
    return {
      self: this
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
    }

  }
}

</script>
