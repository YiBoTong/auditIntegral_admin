<!--
****--@date     2018-12-24 18:00
****--@author   XXL
****--@describe show
-->
<template>
  <el-card v-loading="dataLoading">
    <el-row slot="header" class="card-header">
      <el-col :span="12">
        <el-button type="text">查看工作底稿</el-button>
      </el-col>
      <el-col :span="12" align="right">
        <el-button type="text" @click="backList">返回列表</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-form
        ref="refForm"
        :model="formData"
        label-width="100px">
        <el-col>
          <el-form-item
            label="项目名称">
            {{ formData.projectName || "—" }}
          </el-form-item>
        </el-col>
        <el-col
          :xs="{span: 24}"
          :sm="{span: 12}"
          :md="{span: 12}"
          :lg="{span: 8}"
          :xl="{span: 8}">
          <el-form-item
            label="检查单位"
            prop="title">
            {{ formData.departmentName || "—" }}
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
            {{ formData.queryDepartmentName || "—" }}
            （{{ formData.public ?'': '不' }}允许查看工作底稿）
          </el-form-item>
        </el-col>
        <el-col
          :xs="{span: 24}"
          :sm="{span: 12}"
          :md="{span: 12}"
          :lg="{span: 8}"
          :xl="{span: 8}">
          <el-form-item label="编号">
            {{ formData.year | numbers(formData.number) }}
          </el-form-item>
        </el-col>
        <el-col
          :xs="{span: 24}"
          :sm="{span: 12}"
          :md="{span: 12}"
          :lg="{span: 12}"
          :xl="{span: 12}">
          <el-form-item label="检查开始日期">
            {{ formData.queryStartTime || "—" }}
          </el-form-item>
        </el-col>
        <el-col
          :xs="{span: 24}"
          :sm="{span: 12}"
          :md="{span: 12}"
          :lg="{span: 12}"
          :xl="{span: 12}">
          <el-form-item label="检查结束日期">
            {{ formData.queryEndTime || "—" }}
          </el-form-item>
        </el-col>
        <el-col
          :xs="{span: 24}"
          :sm="{span: 12}"
          :md="{span: 12}"
          :lg="{span: 12}"
          :xl="{span: 12}">
          <el-form-item
            label="检查人">
            {{ formData.checkName || "—" }}
          </el-form-item>
        </el-col>
        <!--<el-col-->
        <!--:xs="{span: 24}"-->
        <!--:sm="{span: 12}"-->
        <!--:md="{span: 12}"-->
        <!--:lg="{span: 8}"-->
        <!--:xl="{span: 8}">-->
        <!--<el-form-item-->
        <!--label="被检查人">-->
        <!--{{ formData.inspectName || "—" }}-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <el-col
          :xs="{span: 24}"
          :sm="{span: 12}"
          :md="{span: 12}"
          :lg="{span: 12}"
          :xl="{span: 12}">
          <el-form-item
            label="复核人">
            {{ formData.reviewName || "—" }}
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <!--实施稽核的依据-->
    <br>
    <span>依据</span>
    <hr>
    <br>
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

    <!--工作方案业务范围-->
    <br>
    <span>业务范围</span>
    <hr>
    <br>
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

    <!--工作方案主要内容-->
    <br>
    <span>主要内容</span>
    <hr>
    <br>
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

    <!--工作方案重点-->
    <br>
    <span>重点</span>
    <hr>
    <br>
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

    <!--方案实施步骤-->
    <br>
    <span>实施步骤</span>
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
          class="stepDataAll-content">
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
              class="step-content-content">
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
                  class="step-list-content">
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

    <!--检查内容-->
    <br>
    <span>检查内容</span>
    <hr>
    <br>
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

    <!--选择文件-->
    <br>
    <span>相关文件</span>
    <hr>
    <div v-if="fileList.length" class="public-upload">
      <el-upload
        ref="upload"
        :limit="10"
        :file-list="fileList"
        :on-preview="headleShow"
        class="upload"
        action=""
        disabled/>
    </div>
    <div v-else>暂无相关文件</div>
  </el-card>
</template>
<script>
/* 当前组件必要引入 */
import { programmeGet, getDraft } from '@/api/auditManagement'
import PersonnelDialog from '@/components/PersonnelDialog/personnelDialog'
import DepartmentDialog from '@/components/DepartmentDialog/departmentDialog'
import { checkChange } from '@/filters/index'

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
      dataLoading: false,
      checked: true,
      programmeData: [],
      fileList: [],
      formData: {
        'projectName': '',
        'departmentName': '',
        'reviewName': '',
        // 'inspectName': '',
        'checkName': '',
        'programmeId': '',
        'queryDepartmentId': '',
        'departmentId': '',
        'number': '',
        'public': false,
        'type': '',
        'time': '',
        'state': 'draft',
        'queryUsers': [],
        'adminUsers': '',
        // 'inspectUsers': '',
        'fileIds': '',
        'contentList': []
      },
      behaviorContent: [],
      todoType: 'Add',
      autosize: { minRows: 4, maxRows: 6 },
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
      programmeGet({ id: id }).then(res => {
        if (!res.status.error) {
          this.programmeData = res.data
          this.changeGetStepDataType(res.data.step)
        } else {
          this.$message.error(res.status.msg)
        }
      })
    },
    // 获取底稿
    getManuscript(id) {
      this.dataLoading = true
      getDraft({ id: id }).then(res => {
        if (!res.status.error) {
          const data = res.data
          const fileIdArr = []
          const list = res.data.fileList || []
          // const inspectUserList = []
          const adminUserList = []
          const queryUserList = []
          // 获取方案内容
          this.getAuditPlan(data.programmeId)
          // 获取检查内容
          if (data.contentList.length) {
            this.getBehaviorContent(data.contentList)
          }
          // 处理文件显示
          list.map(item => fileIdArr.push(item.id))
          data.fileIds = fileIdArr.join(',')
          list.map(v => {
            v.url = v.path + v.fileName + '.' + v.suffix
            v.name = v.name + '.' + v.suffix
          })
          // 处理人员显示
          // data.inspectUserList.map(res => {
          //   inspectUserList.push(res.userName)
          // })
          data.adminUserList.map(res => {
            adminUserList.push(res.userName)
          })
          data.queryUserList.map(res => {
            if (res.isLeader) {
              queryUserList.unshift(res.userName + '（组长）')
            } else {
              queryUserList.push(res.userName)
            }
          })
          this.fileList = list
          // this.formData.inspectName = inspectUserList.join('、')
          data.reviewName = adminUserList.join('、')
          data.checkName = queryUserList.join('、')
          data.public = checkChange(data.public)
          // if (!data.contentList.length) {
          //   this.addViolation()
          // } else {
          //   this.getBehaviorContent(data.contentList)
          // }
          this.formData = data
        } else {
          this.$message({
            type: 'error',
            message: res.status.msg + '!'
          })
        }
        this.dataLoading = false
      })
    },
    // 下载文件
    headleShow(file) {
      console.log(file)
      this.downloadMulti(file.name, file.url)
    },
    // 获取检查内容
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
    },
    // 获取实施步骤
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
      this.stepData = temp
    }
  }
}

</script>
