<!--
****--@date     2018-12-24 18:00
****--@author   XXL
****--@describe show
-->
<template>
  <div
    class="dict-input-container">
    <div class="form-header">
      <div class="header-left">
        <el-button @click="backList">返回列表</el-button>
      </div>
    </div>
    <!--工作底稿-->
    <el-card>
      <div slot="header" class="card-header">
        <span>{{ todoType | typeText }}工作底稿</span>
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
              {{ formData.title }}
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
              {{ formData.depName }}
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
              {{ formData.depName }}
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
    <!--方案内容-->
    <el-card v-if="paramsData">
      <div slot="header" class="card-header">
        <span>方案内容</span>
      </div>
      <el-card>
        <div slot="header" class="card-header">
          <div class="header-left">
            <span>实施稽核的依据</span>
          </div>
        </div>
        <div class="audit-show-table">
          <el-row>
            <el-form
              v-for="(basis,index) in programmeData.basis"
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
            v-for="(business,index) in programmeData.business"
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
            v-for="(content,index) in programmeData.content"
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
            v-for="(emphases,index) in programmeData.emphases"
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
            v-for="(step,index) in programmeData.step"
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
    </el-card>
    <!--违规内容-->
    <el-card>
      <div slot="header" class="card-header">
        <span>{{ todoType | typeText }}违规内容</span>
      </div>
      <el-row :gutter="10">
        <el-col
          v-for="(violation,index) in formData.content"
          :key="index">
          <el-form
            :ref="'violationForm'+index"
            :model="violation"
            label-width="80px"
            class="dict-content">
            <el-col
              :xs="{span: 24}"
              :sm="{span: 18}"
              :md="{span: 18}"
              :lg="{span: 18}"
              :xl="{span: 20}">
              <el-form-item
                :label="(index+1).toString()"
                prop="behaviorContent">
                {{ violation.behaviorContent }}
              </el-form-item>
            </el-col>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
    <!--选择文件-->
    <el-card>
      <div slot="header" class="card-header">
        <span>相关文件</span>
      </div>
      <div class="public-upload">
        <el-upload
          ref="upload"
          :limit="10"
          :file-list="fileList"
          :on-preview="headleShow"
          class="upload"
          action=""
          disabled/>
      </div>
    </el-card>
    <!--是否复选框-->
    <el-card>
      <div slot="header" class="card-header">
        <span>相关文件</span>
      </div>
      <div class="card-content">
        <div class="content-right"/>
      </div>
    </el-card>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { programmeGet, getDraft } from '@/api/auditManagement'
import PersonnelDialog from '@/components/PersonnelDialog/personnelDialog'
import DepartmentDialog from '@/components/DepartmentDialog/departmentDialog'

export default {
  name: 'DictionaryManagementInput',
  components: { PersonnelDialog, DepartmentDialog },
  props: {
    paramsData: {
      type: [Object, String],
      required: false,
      default: ''
    }
  },
  data() {
    return {
      depVisible: false,
      CheckVisible: false,
      ReviewVisible: false,
      width: '',
      title: '',
      listLoading: false,
      programmeData: [],
      fileList: [],
      formData: {
        'projectName': '',
        'depName': '',
        'reviewName': '',
        'check': '',
        'programmeId': '',
        'queryDepartmentId': '',
        'departmentId': '',
        'number': '',
        'public': '',
        'type': '',
        'time': '',
        'state': 'draft',
        'queryUsers': '',
        'adminUsers': '',
        'inspectUsers': '',
        'fileIds': '',
        'content': []
      },
      todoType: 'Add',
      autosize: { minRows: 4, maxRows: 6 }
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
      this.getManuscript(this.paramsData.id)
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
          const fileIdArr = []
          const list = res.data.fileList || []
          list.map(item => fileIdArr.push(item.id))
          data.fileIds = fileIdArr.join(',')
          list.map(v => {
            v.url = v.path + v.fileName + '.' + v.suffix
            v.name = v.name + '.' + v.suffix
          })
          this.fileList = list
          this.formData = data
        } else {
          this.$message({
            type: 'error',
            message: res.status.msg + '!'
          })
        }
      })
    },
    // 下载文件
    headleShow(file) {
      console.log(file)
      this.downloadMulti(file.name, file.url)
    }
  }
}

</script>
