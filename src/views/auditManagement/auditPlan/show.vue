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
      <div class="header-right">
        <div class="header-right">
          <el-button
            :disabled="!canEdit"
            type="primary"
            size="small"
            @click="submitForm">完成
          </el-button>
          <el-button
            :disabled="!canEdit"
            size="small"
            @click="resetForm('refForm')">重置</el-button>
        </div>
      </div>
    </div>

    <el-card>
      <div slot="header" class="card-header">
        <div class="header-left">
          <span>{{ todoType | typeText }}实施稽核的依据</span>
        </div>
      </div>
      <el-row>
        <el-form
          v-for="(basis,index) in formData.basisList"
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
              prop="userName">
              <el-input
                v-model="basis.content"
                :autosize="{minRows: 1, maxRows: 6}"
                clearable
                type="textarea"
                placeholder="请输入依据内容"
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
                :disabled="formData.basisList.length === 1"
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
      <div slot="header" class="card-header">
        <div class="header-left">
          <span>{{ todoType | typeText }}工作方案业务范围</span>
        </div>
      </div>
      <el-row>
        <el-form
          v-for="(business,index) in formData.businessList"
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
              prop="userName">
              <el-input
                v-model="business.content"
                :autosize="{minRows: 1, maxRows: 6}"
                clearable
                type="textarea"
                placeholder="请输入内容"
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
                @click="handleAddBusiness"><i class="el-icon-plus" />添加
              </el-button>
              <el-button
                :disabled="formData.businessList.length === 1"
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
      <div slot="header" class="card-header">
        <div class="header-left">
          <span>{{ todoType | typeText }}工作方案主要内容</span>
        </div>
      </div>
      <el-row>
        <el-form
          v-for="(content,index) in formData.contentList"
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
              prop="userName">
              <el-input
                v-model="content.content"
                :autosize="{minRows: 1, maxRows: 6}"
                type="textarea"
                placeholder="请输入主要内容"
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
                @click="handleAddContent"><i class="el-icon-plus" />添加
              </el-button>
              <el-button
                :disabled="formData.contentList.length === 1"
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
      <div slot="header" class="card-header">
        <div class="header-left">
          <span>{{ todoType | typeText }}工作方案重点</span>
        </div>
      </div>
      <el-row>
        <el-form
          v-for="(emphases,index) in formData.emphasesList"
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
              prop="userName">
              <el-input
                v-model="emphases.content"
                :autosize="{minRows: 1, maxRows: 6}"
                clearable
                type="textarea"
                placeholder="请输入内容"
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
                @click="handleAddEmphases"><i class="el-icon-plus" />添加
              </el-button>
              <el-button
                :disabled="formData.emphasesList.length === 1"
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
      <div slot="header" class="card-header">
        <div class="header-left">
          <span>{{ todoType | typeText }}审查方案实施步骤</span>
        </div>
      </div>
      <el-row>
        <el-form
          v-for="(step,index) in formData.stepList"
          :key="index"
          :ref="'stepForm'+index"
          :model="step"
          label-width="50px"
          class="step-form">
          <el-col
            :xs="{span: 24}"
            :sm="{span: 24}"
            :md="{span: 14}"
            :lg="{span: 16}"
            :xl="{span: 17}">
            <el-form-item
              :label="(index+1).toString()"
              prop="userName">
              <el-input
                v-model="step.content"
                :autosize="{minRows: 1, maxRows: 6}"
                type="textarea"
                placeholder="请输入内容"
              />
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 12}"
            :sm="{span: 12}"
            :md="{span: 5}"
            :lg="{span: 4}"
            :xl="{span: 4}">
            <el-form-item
              prop="userName">
              <el-input
                v-model="step.type"
                clearable
                placeholder="请选择"
              />
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
                :disabled="formData.stepList.length === 1"
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
      <div slot="header" class="card-header">
        <div class="header-left">
          <span>{{ todoType | typeText }}工作方案人员</span>
        </div>
      </div>
      <el-row>
        <el-form
          v-for="(user,index) in formData.userList"
          :key="index"
          :ref="'userForm'+index"
          :model="user"
          label-width="50px"
          class="user-form">
          <el-col
            :xs="{span: 24}"
            :sm="{span: 24}"
            :md="{span: 24}"
            :lg="{span: 12}"
            :xl="{span: 13}">
            <el-form-item
              :label="(index+1).toString()"
              prop="userName">
              <el-input
                v-model="user.job"
                :autosize="{minRows: 1, maxRows: 6}"
                type="textarea"
                placeholder="请输入内容"
              />
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 9}"
            :md="{span: 9}"
            :lg="{span: 4}"
            :xl="{span: 4}">
            <el-form-item
              prop="userName">
              <el-input
                v-model="user.title"
                clearable
                placeholder="员工技术职称"
              />
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 10}"
            :md="{span: 10}"
            :lg="{span: 4}"
            :xl="{span: 4}">
            <el-form-item
              prop="userName">
              <el-input
                v-model="user.task"
                clearable
                placeholder="员工分工"
              />
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 5}"
            :md="{span: 5}"
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
// import { loginAdd, loginEdit } from '@/api/systemManagement'

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
        basisList: [],
        businessList: [],
        contentList: [],
        emphasesList: [],
        stepList: [],
        userList: []
      },
      todoType: 'Add',
      canEdit: true
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
        this.getAuditPlan()
      }
    },
    // 返回列表
    backList() {
      this.$emit('view', 'list')
    },
    // 获取
    getAuditPlan() {
    //   const { id } = this.paramsData
    //   dictGet({ id }).then(res => {
    //     if (!res.status.error) {
    //       this.formData = res.data
    //     } else {
    //       this.$message({
    //         type: 'error',
    //         message: res.status.msg + '!'
    //       })
    //     }
    //   })
    }
  }
}
</script>
