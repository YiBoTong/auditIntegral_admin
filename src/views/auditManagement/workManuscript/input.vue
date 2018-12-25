<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 创建修改
-->
<template>
  <div
    class="manuscript-input-container">
    <div class="form-header">
      <div class="header-left">
        <el-button @click="backList">返回列表</el-button>
      </div>
      <div class="header-right">
        <el-button
          type="primary"
          @click="submitForm">完成
        </el-button>
        <el-button
          @click="resetForm('formData')">重置</el-button>
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
              <el-input
                v-model="formData.title"
                type="text"
                clearable
                readonly/>
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 8}">
            <el-form-item label="日期">
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
            :lg="{span: 8}"
            :xl="{span: 8}">
            <el-form-item label="编号">
              <el-input v-model="formData.number" placeholder="请输入编号"/>
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
              <el-input
                v-model="formData.projectName"
                placeholder="请输入项目名称"
                clearable />
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
              <el-input
                v-model="formData.depName"
                placeholder="请选择部门"
                clearable
                @focus="selectDepartment" />
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
              <el-input
                v-model="formData.checkName"
                placeholder="请选择检查人"
                clearable
                @focus="selectCheckPersonnel"/>
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
              <el-input
                v-model="formData.reviewName"
                placeholder="请选择复核人"
                clearable
                @focus="selectReviewPersonnel"/>
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
        <div class="left">
          <span>{{ todoType | typeText }}违规内容</span>
        </div>
      </div>
      <el-row :gutter="10">
        <el-col
          v-for="(violation,index) in behaviorContent"
          :key="index">
          <el-form
            :ref="'violationForm'+index"
            :model="violation"
            label-width="30px"
            class="violation-content">
            <el-col
              :xs="{span: 12}"
              :sm="{span: 18}"
              :md="{span: 18}"
              :lg="{span: 18}"
              :xl="{span: 20}"
              class="content-type">
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
              :xl="{span: 4}">
              <el-form-item>
                <el-button
                  type="text"
                  size="medium"
                  @click="addViolation"><i class="el-icon-plus" />添加分类
                </el-button>
                <el-button
                  :disabled="behaviorContent.length === 1"
                  type="text"
                  size="medium"
                  @click="delViolation(index)"><i class="el-icon-delete" />删除
                </el-button>
              </el-form-item>
            </el-col>
            <el-col
              v-for="(content,sindex) in violation.behaviorContent"
              :key="sindex">
              <el-form
                :ref="'behaviorContentForm'+sindex"
                :model="content"
                label-width="50px"
                class="content-behavior-content">
                <el-col
                  :xs="{span: 24}"
                  :sm="{span: 18}"
                  :md="{span: 18}"
                  :lg="{span: 18}"
                  :xl="{span: 20}">
                  <el-form-item :label="(sindex+1)+'.'">
                    <el-autocomplete
                      v-model="content.behaviorContent"
                      :trigger-on-focus="false"
                      :fetch-suggestions="querySearch"
                      :autosize="{minRows: 2, maxRows: 6 }"
                      class="inline-input"
                      placeholder="请选择或输入违规内容"
                    />
                  </el-form-item>
                </el-col>
                <el-col
                  :xs="{span: 24}"
                  :sm="{span: 6}"
                  :md="{span: 6}"
                  :lg="{span: 6}"
                  :xl="{span: 4}">
                  <el-form-item>
                    <el-button
                      type="text"
                      size="medium"
                      @click="addViolationContent(index,sindex)"><i class="el-icon-plus" />添加内容
                    </el-button>
                    <el-button
                      :disabled="behaviorContent[index].behaviorContent.length === 1"
                      type="text"
                      size="medium"
                      @click="delViolationContent(index,sindex)"><i class="el-icon-delete" />删除
                    </el-button>
                  </el-form-item>
                </el-col>
              </el-form>
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
          :before-remove="beforeRemove"
          :http-request="doUpload"
          :limit="10"
          :file-list="fileList"
          :on-exceed="handleExceed"
          :on-remove="onRemove"
          :on-preview="headleShow"
          class="upload"
          action=""
          multiple>
          <el-button
            slot="trigger"
            size="small"
            type="primary">选取文件
          </el-button>
          <div
            slot="tip"
            class="el-upload__tip">支持任意文件上传，且不超过1GB
          </div>
        </el-upload>
      </div>
    </el-card>
    <!--是否复选框-->
    <el-card>
      <div slot="header" class="card-header">
        <span>是否通知被检查单位</span>
      </div>
      <div class="card-content">
        <div class="content-left">
          <el-checkbox v-model="formData.public">是否通知被检查单位</el-checkbox>
        </div>
      </div>
    </el-card>
    <!--dialog-->
    <personnel-dialog :visible.sync="CheckVisible" :width="width" :title="title" @personnel="onCheckPersonnel"/>
    <department-dialog :visible.sync="depVisible" :width="width" :title="title" @department="onDepartment"/>
    <personnel-dialog :visible.sync="ReviewVisible" :width="width" :title="title" @personnel="onReviewPersonnel"/>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { fileUpload } from '@/api/uploadFile'
import { addDraft, editDraft, programmeGet, getDraft } from '@/api/auditManagement'
import PersonnelDialog from '@/components/PersonnelDialog/personnelDialog'
import DepartmentDialog from '@/components/DepartmentDialog/departmentDialog'
import { clausesSearch } from '@/api/organizationalManagement'
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
      checked: false,
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
      todoType: 'Add'
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
        this.todoType = 'Add'
        this.formData.programmeId = this.paramsData.id
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
          // todo 需要处理人员数据
          this.formData = data
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
    // 获取违规内容
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
    // 获取保存的违规内容数据
    getContentList() {
      let order = 0
      const temp = []
      this.behaviorContent.map(item => {
        const { type, content } = item
        // 排除违规分类下的空违规内容
        const behaviorContent = item.behaviorContent.filter(cItem => cItem.behaviorContent !== '')
        // 如果当前违规分类下没有违规内容，则不添加
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
    // 添加违规内容
    addViolationContent(index) {
      const contentItem = { behaviorContent: '', behaviorId: 0, type: 'other' }
      this.behaviorContent[index].behaviorContent.push(contentItem)
    },
    // 删除违规内容
    delViolationContent(index, sindex) {
      this.behaviorContent[index].behaviorContent.splice(sindex, 1)
    },
    // 搜索违规项
    querySearch(queryString, cb) {
      // 获取管理办法
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
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    // 选择部门dialog
    selectDepartment() {
      this.depVisible = true
      this.width = '600px'
      this.title = '选择部门'
    },
    // 获取部门
    onDepartment(data) {
      this.formData.depName = data.name
      this.formData.departmentId = data.id
    },
    // 选择检查人员
    selectCheckPersonnel(value) {
      this.CheckVisible = true
      this.width = '900px'
      this.title = '选择检查人员'
    },
    // 获取检查人员
    onCheckPersonnel(data) {
      this.formData.checkName = data.userName
    },
    // 获取复核人员
    selectReviewPersonnel(value) {
      this.ReviewVisible = true
      this.width = '900px'
      this.title = '选择复核人员'
    },
    // 获取复核人员
    onReviewPersonnel(data) {
      this.formData.reviewName = data.userName
    },
    // 移除文件
    onRemove(file, fileList) {
      console.log(fileList)
      const fileIdArr = []
      if (fileList.length > 0) {
        fileList.map(item => fileIdArr.push(item.id))
        this.formData.fileIds = fileIdArr.join(',')
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
      const fileIdArr = this.formData.fileIds.split(',')
      fd.append('file', content.file)
      fileUpload(fd).then(res => {
        content.file['fileId'] = res.data
        fileIdArr.push(res.data)
      })
      this.formData.fileIds = fileIdArr.join(',')
      console.log(this.formData.fileIds)
    },
    // 提交表单
    submitForm() {
      // this.listLoading = true
      console.log(this.formData)
      this.$refs.refForm.validate(valid => {
        if (!valid) return false
        const data = Object.assign({}, this.formData)
        data.contentList = this.getContentList()
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
        if (!res.status.error) {
          this.backList()
        }
      })
    }
  }
}

</script>
