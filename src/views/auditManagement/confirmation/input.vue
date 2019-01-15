<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 创建修改
-->
<template>
  <el-card v-loading="loading" class="editMainBox">
    <el-row slot="header" :gutter="10" class="card-header">
      <el-col :span="24" align="right">
        <el-button type="text" @click="backList">返回列表</el-button>
      </el-col>
      <el-col :span="24" align="center">
        <h1>稽核事实确认书</h1>
        <br>
        <p v-if="fromData">{{ fromData.year | numbers(fromData.number) }}</p>
      </el-col>
    </el-row>
    <div class="confirmation-input-container">
      <div v-if="showData" class="card-content">
        <div class="content-top">
          <h3>{{ tableData.draft.departmentName }}：</h3>
          <div class="top-content">
            <span class="text">根据稽核工作计划及领导安排，依据</span>
            <el-checkbox-group v-model="basisIds" :min="1">
              <el-checkbox
                v-for="item in basisList"
                :label="item.id"
                :key="item.id"
              >{{ item.content }}</el-checkbox>
            </el-checkbox-group>，{{ fromData.draft.queryDepartmentName }} 于 {{ tableData.programme.startTime | fmtDate('yyyy年MM月dd日') }} 至 {{ tableData.programme.endTime | fmtDate('yyyy年MM月dd日') }}，对你社{{ tableData.programme.planStartTime
            | fmtDate('yyyy年MM月dd日') }} 至 {{ tableData.programme.planEndTime | fmtDate('yyyy年MM月dd日') }} 业务经营、贯例执行党和国家各项金融政策、法律、法规及系统内各项规章制度等情况进行了常规稽核。本次稽核发现以下问题：
          </div>
        </div>
        <!--检查内容-->
        <div class="content-body">
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
                  :xs="{span: 24}"
                  :sm="{span: 16}"
                  :md="{span: 16}"
                  :lg="{span: 16}"
                  :xl="{span: 18}"
                  class="content-type"
                >
                  <el-form-item :label="numberConvertToUppercase(index+1)+'、'">
                    <el-input
                      v-model="violation.content"
                      :autosize="{minRows: 1, maxRows: 6}"
                      placeholder="请输入问题分类"
                      type="textarea"
                    />
                  </el-form-item>
                </el-col>
                <el-col
                  :xs="{span: 24}"
                  :sm="{span: 8}"
                  :md="{span: 8}"
                  :lg="{span: 8}"
                  :xl="{span: 6}"
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
                      :sm="{span: 16}"
                      :md="{span: 16}"
                      :lg="{span: 16}"
                      :xl="{span: 18}"
                    >
                      <el-form-item :label="(sindex+1)+'.'">
                        <el-autocomplete
                          v-model="content.behaviorContent"
                          :trigger-on-focus="false"
                          :fetch-suggestions="querySearch"
                          :autosize="{minRows: 2, maxRows: 6 }"
                          class="inline-input"
                          placeholder="请选择或输入检查内容"
                          clearable
                        />
                      </el-form-item>
                    </el-col>
                    <el-col
                      :xs="{span: 24}"
                      :sm="{span: 8}"
                      :md="{span: 8}"
                      :lg="{span: 8}"
                      :xl="{span: 6}"
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
        </div>

        <!--被检查人-->
        <el-row class="inspect-user">
          <el-form ref="form" label-width="90px">
            <el-form-item label="违规人员：">
              <el-input
                v-model="inspectName"
                placeholder="请选择违规人员"
                clearable
                @focus="selectInspectPersonnel"
              />
            </el-form-item>
          </el-form>
          <!--<el-col :span="4"><span></span></el-col>-->
          <!--<el-col :span="20">-->
          <!--<el-input-->
          <!--v-model="inspectName"-->
          <!--placeholder="请选择违规人员"-->
          <!--clearable-->
          <!--@focus="selectInspectPersonnel"-->
          <!--/>-->
          <!--</el-col>-->
        </el-row>
        <!--文件上传-->
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

        <div class="content-bottom">
          <el-button
            :loading="buttonLoading"
            type="primary"
            size="small"
            @click="handleBasis('draft')"
          >保存为草稿</el-button>
          <el-button
            :loading="buttonLoading"
            :disabled="basisIds.length < 1"
            plain
            size="small"
            @click="handleBasis('publish')"
          >保存并发布</el-button>
        </div>
      </div>
    </div>
    <personnel-dialog
      v-if="InspectVisible"
      :visible.sync="InspectVisible"
      :width="width"
      :title="title"
      @personnel="onInspectPersonnel"
    />
  </el-card>
</template>
<script>
/* 当前组件必要引入 */
import { fileUpload } from '@/api/uploadFile'
import { getConfirmation, editConfirmation, programmeGet } from '@/api/auditManagement'
import { clausesSearch } from '@/api/organizationalManagement'
import PersonnelDialog from '@/components/PersonnelDialog/personnelDialog'

export default {
  name: 'DictionaryManagementInput',
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
      InspectVisible: false,
      width: '',
      title: '',
      loading: false,
      buttonLoading: false,
      tableData: [],
      behaviorContent: [],
      basisList: [],
      basisIds: [],
      fileIds: [],
      fileIdArr: [],
      fileList: [],
      showData: false,
      fromData: null,
      users: '',
      inspectName: ''
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
        this.getConfirmationData(id)
        this.getAuditPlan(this.paramsData.programmeId)
      }
    },
    // 返回列表
    backList() {
      this.$emit('view', 'list')
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
        this.inspectName = nameArr.join('、')
        this.users = idsArr.join(',')
      } else { // 单选
        this.inspectName = data.userName
        this.users = data.userId
      }
    },
    // 保存
    handleBasis(state) {
      const ids = this.basisIds
      if (ids.length < 1) {
        this.$message.warning('请至少选择一个依据')
        return false
      }
      this.buttonLoading = true
      this.fileIds = this.fileIdArr.join()
      const data = {
        id: this.tableData.id,
        users: this.users,
        fileIds: this.fileIds,
        contentList: this.getContentList(),
        basisIds: ids.join(','), state
      }
      editConfirmation(data).then(res => {
        if (!res.status.error) {
          this.$message({
            type: 'success',
            message: res.status.msg + '!'
          })
          this.backList()
        } else {
          this.$message({
            type: 'error',
            message: res.status.msg + '!'
          })
          this.init()
        }
      })
    },
    // 获取事实确认书
    getConfirmationData(id) {
      this.loading = true
      getConfirmation({ id: id }).then(res => {
        if (!res.status.error) {
          this.tableData = res.data
          const list = res.data.fileList || []
          const data = res.data
          if (res.data.basisList) {
            const basisList = res.data.basisList
            const ids = []
            basisList.map(res => {
              ids.push(res.id)
            })
            this.basisIds = ids
          }
          const id = data.programme.id
          // 处理人员显示
          const inspectName = []
          const inspectNameId = []
          data.userList.map(res => {
            if (res.userName) {
              inspectName.push(res.userName)
              inspectNameId.push(res.userId)
            }
          })
          this.inspectName = inspectName.join('、')
          this.users = inspectNameId.join(',')
          // 处理文件显示
          list.map(item => this.fileIdArr.push(item.id))
          this.fileIds = this.fileIdArr.join(',')
          list.map(v => {
            v.url = v.path + v.fileName + '.' + v.suffix
            v.name = v.name + '.' + v.suffix
          })
          this.fileList = list
          console.log(this.fileList)
          // 获取依据
          this.getAuditPlan(id)
          if (data.contentList.length) {
            this.getBehaviorContent(data.contentList)
          } else {
            this.addViolation()
          }
          this.fromData = data
          this.showData = true
        } else {
          this.$message({
            type: 'error',
            message: res.status.msg + '!'
          })
        }
        this.loading = false
      })
    },
    // 获取依据
    getAuditPlan(id) {
      programmeGet({ id: id }).then(res => {
        this.basisList = res.data.basis
      })
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
    // 添加检查内容
    addViolationContent(index) {
      const contentItem = { behaviorContent: '', behaviorId: 0, type: 'other' }
      this.behaviorContent[index].behaviorContent.push(contentItem)
    },
    // 删除检查内容
    delViolationContent(index, sindex) {
      this.behaviorContent[index].behaviorContent.splice(sindex, 1)
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
    }
  }
}
</script>
