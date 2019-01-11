<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 创建修改
-->
<template>
  <div>
    <!--工作底稿-->
    <el-card class="manuscript-input-container editMainBox">
      <el-row slot="header" class="card-header">
        <el-col :span="12">
          <el-button type="text">{{ todoType | typeText }}工作底稿</el-button>
        </el-col>
        <el-col :span="12" align="right">
          <el-button type="text" @click="backList">返回列表</el-button>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-form ref="refForm" :model="formData" label-width="100px">
          <el-col>
            <el-form-item label="项目名称">
              <el-input v-model="formData.projectName" placeholder="请输入项目名称" clearable/>
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 24}"
            :md="{span: 12}"
            :lg="{span: 12}"
            :xl="{span: 12}"
          >
            <el-form-item label="检查单位" prop="title">
              <!--<el-input-->
              <!--v-model="formData.title"-->
              <!--type="text"-->
              <!--clearable-->
              <!--readonly/>-->
              {{ formData.departmentName }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 24}"
            :md="{span: 12}"
            :lg="{span: 12}"
            :xl="{span: 12}"
          >
            <el-form-item label="检查日期">
              <el-date-picker
                v-model="formData.time"
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
            :xl="{span: 12}"
          >
            <el-form-item label="编号">
              <el-input v-model="formData.number" placeholder="请输入编号"/>
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 12}"
            :xl="{span: 12}"
          >
            <el-form-item label="被检查单位">
              <el-input
                v-model="formData.queryDepartmentName"
                placeholder="请选择部门"
                clearable
                @focus="selectDepartment"
              />
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 12}"
            :xl="{span: 12}"
          >
            <el-form-item label="被检查人">
              <el-input
                v-model="formData.inspectName"
                placeholder="请选择被检查人"
                clearable
                @focus="selectInspectPersonnel"
              />
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 12}"
            :xl="{span: 12}"
          >
            <el-form-item label="检查人">
              <el-input
                v-model="formData.checkName"
                placeholder="请选择检查人"
                clearable
                @focus="selectCheckPersonnel"
              />
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 12}"
            :xl="{span: 12}"
          >
            <el-form-item label="复核人">
              <el-input
                v-model="formData.reviewName"
                placeholder="请选择复核人"
                clearable
                @focus="selectReviewPersonnel"
              />
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 24}"
            :md="{span: 12}"
            :lg="{span: 12}"
            :xl="{span: 12}"
          >
            <el-form-item>
              <el-checkbox v-model="formData.public">通知被检查单位</el-checkbox>
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
            v-for="(basis,index) in programmeData.basis"
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
        </el-row>
      </div>

      <!--工作方案业务范围-->
      <br>
      <span>工作方案业务范围</span>
      <hr>
      <br>
      <div class="audit-show-table">
        <el-form
          v-for="(business,index) in programmeData.business"
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
      </div>

      <!--工作方案主要内容-->
      <br>
      <span>工作方案主要内容</span>
      <hr>
      <br>
      <div class="audit-show-table">
        <el-form
          v-for="(content,index) in programmeData.content"
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
      </div>

      <!--工作方案重点-->
      <br>
      <span>工作方案重点</span>
      <hr>
      <br>
      <div class="audit-show-table">
        <el-form
          v-for="(emphases,index) in programmeData.emphases"
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
      </div>

      <!--方案实施步骤-->
      <br>
      <span>{{ todoType | typeText }}方案实施步骤</span>
      <hr>
      <br>
      <el-row :gutter="10">
        <el-col v-for="(stepDataAll,index) in stepData" :key="index">
          <el-form
            :ref="'stepDataAllForm'+index"
            :model="stepDataAll"
            label-width="30px"
            class="stepDataAll-content"
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
                class="step-content-content"
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
                    class="step-list-content"
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
      </el-row>

      <!--检查内容-->
      <br>
      <span>检查内容</span>
      <hr>
      <br>
      <el-row :gutter="10">
        <el-col v-for="(violation,index) in behaviorContent" :key="index">
          <el-form
            :ref="'violationForm'+index"
            :model="violation"
            label-width="30px"
            class="violation-content"
          >
            <el-col
              :xs="{span: 12}"
              :sm="{span: 18}"
              :md="{span: 18}"
              :lg="{span: 18}"
              :xl="{span: 20}"
              class="content-type"
            >
              <el-form-item :label="numberConvertToUppercase(index+1)+'、'">
                <el-input
                  v-model="violation.content"
                  :autosize="{minRows: 1, maxRows: 6}"
                  placeholder="请输入违规分类"
                  type="textarea"
                />
              </el-form-item>
            </el-col>
            <el-col
              :xs="{span: 12}"
              :sm="{span: 6}"
              :md="{span: 6}"
              :lg="{span: 6}"
              :xl="{span: 4}"
            >
              <el-form-item>
                <el-button type="text" size="medium" @click="addViolation">
                  <i class="el-icon-plus"/>添加分类
                </el-button>
                <el-button
                  :disabled="behaviorContent.length === 1"
                  type="text"
                  size="medium"
                  @click="delViolation(index)"
                >
                  <i class="el-icon-delete"/>删除
                </el-button>
              </el-form-item>
            </el-col>
            <el-col v-for="(content,sindex) in violation.behaviorContent" :key="sindex">
              <el-form
                :ref="'behaviorContentForm'+sindex"
                :model="content"
                label-width="50px"
                class="content-behavior-content"
              >
                <el-col
                  :xs="{span: 24}"
                  :sm="{span: 18}"
                  :md="{span: 18}"
                  :lg="{span: 18}"
                  :xl="{span: 20}"
                >
                  <el-form-item :label="(sindex+1)+'.'">
                    <el-autocomplete
                      v-model="content.behaviorContent"
                      :trigger-on-focus="false"
                      :fetch-suggestions="querySearch"
                      :autosize="{minRows: 2, maxRows: 6 }"
                      class="inline-input"
                      placeholder="请选择或输入检查内容"
                    />
                  </el-form-item>
                </el-col>
                <el-col
                  :xs="{span: 24}"
                  :sm="{span: 6}"
                  :md="{span: 6}"
                  :lg="{span: 6}"
                  :xl="{span: 4}"
                >
                  <el-form-item>
                    <el-button type="text" size="medium" @click="addViolationContent(index,sindex)">
                      <i class="el-icon-plus"/>添加内容
                    </el-button>
                    <el-button
                      :disabled="behaviorContent[index].behaviorContent.length === 1"
                      type="text"
                      size="medium"
                      @click="delViolationContent(index,sindex)"
                    >
                      <i class="el-icon-delete"/>删除
                    </el-button>
                  </el-form-item>
                </el-col>
              </el-form>
            </el-col>
          </el-form>
        </el-col>
      </el-row>

      <!--选择文件-->
      <br>
      <span>相关文件</span>
      <hr>
      <br>
      <div class="public-upload">
        <el-upload
          ref="upload"
          :before-remove="beforeRemove"
          :http-request="doUpload"
          :limit="10"
          :file-list="fileList"
          :on-exceed="handleExceed"
          :on-remove="onRemove"
          :on-preview="headleShow"
          class="upload"
          action
          multiple
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <div slot="tip" class="el-upload__tip">支持任意文件上传，且不超过1GB</div>
        </el-upload>
      </div>
      <br>
      <div align="center">
        <el-button
          :loading="buttonLoading"
          type="primary"
          size="small"
          @click="submitForm('draft')"
        >保存为草稿</el-button>
        <el-button
          :loading="buttonLoading"
          type="success"
          size="small"
          @click="submitForm('publish')"
        >保存并发布</el-button>
      </div>
    </el-card>
    <br>
    <!--dialog-->
    <personnel-dialog
      :visible.sync="CheckVisible"
      :width="width"
      :title="title"
      @personnel="onCheckPersonnel"
    />
    <department-dialog
      :select-one="true"
      :show-checkbox="true"
      :visible.sync="DepVisible"
      :width="width"
      :title="title"
      @department="onDepartment"
    />
    <personnel-dialog
      :visible.sync="ReviewVisible"
      :width="width"
      :title="title"
      @personnel="onReviewPersonnel"
    />
    <personnel-dialog
      :visible.sync="InspectVisible"
      :width="width"
      :title="title"
      @personnel="onInspectPersonnel"
    />
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { fileUpload } from '@/api/uploadFile'
import { addDraft, editDraft, programmeGet, getDraft } from '@/api/auditManagement'
import PersonnelDialog from '@/components/PersonnelDialog/personnelDialog'
import DepartmentDialog from '@/components/DepartmentDialog/departmentDialog'
import { clausesSearch } from '@/api/organizationalManagement'
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
      buttonLoading: false,
      DepVisible: false,
      CheckVisible: false,
      ReviewVisible: false,
      InspectVisible: false,
      width: '',
      title: '',
      listLoading: false,
      checked: false,
      programmeData: [],
      fileList: [],
      formData: {
        'projectName': '',
        'departmentId': '', // 检查单位
        'departmentName': '',
        'reviewName': '',
        'inspectName': '',
        'checkName': '',
        'programmeId': '',
        'queryDepartmentId': '', // 被检查单位
        'queryDepartmentName': '',
        'number': '',
        'public': false,
        'type': '',
        'time': '',
        'state': 'draft',
        // todo 注意人员是多个
        'queryUsers': '',
        'adminUsers': '',
        'inspectUsers': '',
        'fileIds': '',
        'contentList': []
      },
      behaviorContent: [],
      todoType: 'Add',
      fileIdArr: [],
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
      console.log(this.paramsData)
      if (this.paramsData.isProgramme) {
        const { departmentId, departmentName } = this.$store.state.user.userInfo
        this.todoType = 'Add'
        this.formData.programmeId = this.paramsData.id
        this.formData.departmentId = departmentId
        this.formData.departmentName = departmentName
        this.getAuditPlan(this.paramsData.id)
        this.addViolation()
      } else {
        this.todoType = 'Edit'
        console.log(this.paramsData.id)
        this.getManuscript(this.paramsData.id)
        this.getAuditPlan(this.paramsData.programmeId)
      }
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
        this.programmeData = res.data
        this.changeGetStepDataType(res.data.step)
      })
    },
    // 获取底稿
    getManuscript(id) {
      getDraft({ id: id }).then(res => {
        if (!res.status.error) {
          const data = res.data
          const fileIdArr = []
          const list = res.data.fileList || []
          const inspectUserList = []
          const inspectUserIdList = []
          const adminUserList = []
          const adminUserIdList = []
          const queryUserList = []
          const queryUserIdList = []
          // 处理文件显示
          list.map(item => fileIdArr.push(item.id))
          data.fileIds = fileIdArr.join(',')
          list.map(v => {
            v.url = v.path + v.fileName + '.' + v.suffix
            v.name = v.name + '.' + v.suffix
          })
          // 处理人员显示
          data.inspectUserList.map(res => {
            if (res.userName) {
              inspectUserList.push(res.userName)
              inspectUserIdList.push(res.userId)
            }
          })
          data.adminUserList.map(res => {
            if (res.userName) {
              adminUserList.push(res.userName)
              adminUserIdList.push(res.userId)
            }
          })
          data.queryUserList.map(res => {
            if (res.userName) {
              queryUserList.push(res.userName)
              queryUserIdList.push(res.userId)
            }
          })
          // todo 需要处理人员数据
          this.formData = data
          this.fileList = list
          this.formData.inspectName = inspectUserList.join('、')
          this.formData.inspectUsers = inspectUserIdList.join(',')
          this.formData.reviewName = adminUserList.join('、')
          this.formData.adminUsers = adminUserIdList.join(',')
          this.formData.checkName = queryUserList.join('、')
          this.formData.queryUsers = queryUserIdList.join(',')
          this.formData.public = checkChange(data.public)
          if (!data.contentList.length) {
            this.addViolation()
          } else {
            this.getBehaviorContent(data.contentList)
          }
        } else {
          this.$message({
            type: 'error',
            message: res.status.msg + '!'
          })
        }
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
    },
    // 添加违规项
    addViolation() {
      this.behaviorContent.push({
        'type': 'title',
        'content': '',
        'behaviorContent': []
      })
      const len = this.behaviorContent.length
      this.addViolationContent(len > 0 ? len - 1 : 0)
    },
    // 删除违规项
    delViolation(index) {
      this.behaviorContent.splice(index, 1)
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
      console.log(temp)
      this.behaviorContent = temp
    },
    // 获取保存的检查内容数据
    getContentList() {
      let order = 0
      const temp = []
      this.behaviorContent.map(item => {
        const { type, content } = item
        // 排除违规分类下的空检查内容
        const behaviorContent = item.behaviorContent.filter(cItem => cItem.behaviorContent !== '')
        // 如果当前违规分类下没有检查内容，则不添加
        if (behaviorContent.length) {
          order++
          // 添加违规分类
          temp.push({ type, behaviorContent: content, behaviorId: 0, order })
          // 添加违规分类项
          behaviorContent.map(cItem => {
            order++
            cItem['order'] = order
            temp.push(cItem)
          })
        }
      })
      return temp
    },
    // 添加检查内容
    addViolationContent(index) {
      const contentItem = { behaviorContent: '', behaviorId: 0, type: 'other' }
      this.behaviorContent[index].behaviorContent.push(contentItem)
    },
    // 删除检查内容
    delViolationContent(index, sindex) {
      this.behaviorContent[index].behaviorContent.splice(sindex, 1)
    },
    // 搜索违规项
    querySearch(queryString, cb) {
      // 获取管理办法
      if (queryString.length > 1) {
        clausesSearch({ content: queryString }).then(res => {
          var data = res.data
          var restaurants = []
          data.map(res => {
            var obj = { value: res.content }
            restaurants.push(obj)
          })
          console.log(restaurants)
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
    // 选择部门dialog
    selectDepartment() {
      this.DepVisible = true
      this.width = '600px'
      this.title = '选择部门'
    },
    // 获取部门
    onDepartment(data) {
      this.formData.queryDepartmentName = data.name
      this.formData.queryDepartmentId = data.id
    },
    // 选择检查人员
    selectCheckPersonnel(value) {
      this.CheckVisible = true
      this.width = '900px'
      this.title = '选择检查人员'
    },
    // 获取检查人员
    onCheckPersonnel(data) {
      if (data.length > 0) { // 判断是单人 还是多人
        const nameArr = []
        const idsArr = []
        data.map(res => {
          nameArr.push(res.userName)
          idsArr.push(res.userId)
        })
        this.formData.checkName = nameArr.join('、')
        this.formData.queryUsers = idsArr.join(',')
      } else { // 单选
        this.formData.checkName = data.userName
        this.formData.queryUsers = data.userId
      }
    },
    // 获取复核人员
    selectReviewPersonnel(value) {
      this.ReviewVisible = true
      this.width = '900px'
      this.title = '选择复核人员'
    },
    // 获取复核人员
    onReviewPersonnel(data) {
      if (data.length > 0) { // 判断是单人 还是多人
        const nameArr = []
        const idsArr = []
        data.map(res => {
          nameArr.push(res.userName)
          idsArr.push(res.userId)
        })
        this.formData.reviewName = nameArr.join('、')
        this.formData.adminUsers = idsArr.join(',')
      } else { // 单选
        this.formData.checkName = data.userName
        this.formData.adminUsers = data.userId
      }
    },
    // 获取被检查人员
    selectInspectPersonnel(value) {
      this.InspectVisible = true
      this.width = '900px'
      this.title = '选择被检查人员'
    },
    // 获取被检查人员
    onInspectPersonnel(data) {
      if (data.length > 0) { // 判断是单人 还是多人
        const nameArr = []
        const idsArr = []
        data.map(res => {
          nameArr.push(res.userName)
          idsArr.push(res.userId)
        })
        this.formData.inspectName = nameArr.join('、')
        this.formData.inspectUsers = idsArr.join(',')
      } else { // 单选
        this.formData.inspectName = data.userName
        this.formData.inspectUsers = data.userId
      }
    },

    // 移除文件
    onRemove(file, fileList) {
      console.log(fileList)
      if (fileList.length > 0) {
        this.fileIdArr = []
        fileList.map(item => this.fileIdArr.push(item.raw.fileId))
      }
    },
    // 文件上传
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    changeRange(val) {
      const t = val === 1 ? this.range[0].label : ''
      this.formData.informName = t
    },

    // 下载文件
    headleShow(file) {
      console.log(file)
      this.downloadMulti(file.name, file.url)
    },
    // 上传文件
    doUpload(content) {
      const fd = new FormData()
      fd.append('file', content.file)
      fileUpload(fd).then(res => {
        content.file['fileId'] = res.data
        this.fileIdArr.push(res.data)
        console.log(res.data)
      })
    },
    // 提交表单
    submitForm(state) {
      this.buttonLoading = true
      console.log(this.formData)
      this.$refs.refForm.validate(valid => {
        if (!valid) return false
        const data = Object.assign({}, this.formData)
        data.contentList = this.getContentList()
        data.fileIds = this.fileIdArr.join(',')
        data.state = state
        console.log(data)
        this[this.todoType.toLocaleLowerCase() + 'Manuscript'](data)
      })
    },
    // 创建
    addManuscript(data) {
      addDraft(data).then((res) => {
        this.$message({
          type: res.status.error ? 'error' : 'success',
          message: res.status.msg + '!'
        })
        this.buttonLoading = false
        if (!res.status.error) {
          this.backList()
        }
      })
    },
    // 编辑
    editManuscript(data) {
      editDraft(data).then((res) => {
        this.$message({
          type: res.status.error ? 'error' : 'success',
          message: res.status.msg + '!'
        })
        this.buttonLoading = false
        if (!res.status.error) {
          this.backList()
        }
      })
    }
  }
}

</script>
