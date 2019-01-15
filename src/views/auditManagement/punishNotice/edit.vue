<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 创建修改
-->
<template>
  <el-card v-loading="dataLoading" class="editMainBox">
    <el-row slot="header" :gutter="10" class="card-header">
      <el-col :span="12">
        <el-button type="text">违规积分通知书</el-button>
      </el-col>
      <el-col :span="12" align="right">
        <el-button type="text" @click="backList">返回列表</el-button>
      </el-col>
    </el-row>
    <h3>工作底稿</h3>
    <hr>
    <el-row :gutter="10">
      <el-form ref="refForm" :model="formData" label-width="100px">
        <el-col
          :xs="{span: 24}"
          :sm="{span: 24}"
          :md="{span: 24}"
          :lg="{span: 24}"
          :xl="{span: 24}"
        >
          <el-form-item label="检查单位" prop="title">{{ formData.departmentName }}</el-form-item>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 8}">
          <el-form-item label="日期">{{ formData.time }}</el-form-item>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 8}">
          <el-form-item label="编号">{{ formData.number }}</el-form-item>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 8}">
          <el-form-item label="项目名称">{{ formData.projectName }}</el-form-item>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 8}">
          <el-form-item label="被检查单位">{{ formData.queryDepartmentName }}</el-form-item>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 8}">
          <el-form-item label="检查人">{{ formData.checkName }}</el-form-item>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 8}">
          <el-form-item label="复核人">{{ formData.reviewName }}</el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <br>
    <h3>检查内容</h3>
    <hr>
    <br>
    <el-row :gutter="10">
      <el-col v-for="(violation,index) in behaviorContent" :key="index">
        <el-form
          :ref="'violationForm'+index"
          :model="violation"
          label-width="40px"
          class="violation-content"
        >
          <el-col
            :xs="{span: 24}"
            :sm="{span: 24}"
            :md="{span: 24}"
            :lg="{span: 24}"
            :xl="{span: 24}"
          >
            <el-form-item
              :label="numberConvertToUppercase(index+1).toString() + '、'"
              prop="behaviorContent"
            >{{ violation.content }}</el-form-item>
            <el-col v-for="(sonViolation,sonIndex) in violation.behaviorContent" :key="sonIndex">
              <el-form
                :ref="'sonViolationForm'+sonIndex"
                :model="sonViolation"
                label-width="50px"
                class="violation-son-content"
              >
                <el-col
                  :xs="{span: 24}"
                  :sm="{span: 24}"
                  :md="{span: 24}"
                  :lg="{span: 24}"
                  :xl="{span: 24}"
                >
                  <el-form-item
                    :label="(sonIndex+1).toString()+'、'"
                    prop="behaviorContent"
                  >{{ sonViolation.behaviorContent }}</el-form-item>
                </el-col>
              </el-form>
            </el-col>
          </el-col>
        </el-form>
      </el-col>
    </el-row>
    <br>
    <h3>被处罚人</h3>
    <hr>
    <br>
    <div class="card-content">
      <el-row :gutter="10">
        <el-form ref="refForm" :model="formData" label-width="100px">
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 6}"
            :xl="{span: 6}"
          >
            <el-form-item label="项目名称">{{ punishNoticeData.projectName }}</el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 6}"
            :xl="{span: 6}"
          >
            <el-form-item label="被审计人">{{ punishNoticeData.userName }}</el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 6}"
            :xl="{span: 6}"
          >
            <el-form-item label="审计部门">{{ punishNoticeData.queryDepartmentName }}</el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 6}"
            :xl="{span: 6}"
          >
            <el-form-item label="审计日期">{{ punishNoticeData.time }}</el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <br>
    <h3>违规行为</h3>
    <hr>
    <br>
    <div class="card-content">
      <el-row>
        <el-col
          :xs="{span: 24}"
          :sm="{span: 18}"
          :md="{span: 19}"
          :lg="{span: 20}"
          :xl="{span: 21}">
          <el-form label-width="80px">
            <el-form-item label="违规依据:">
              <el-autocomplete
                v-model="basis"
                :trigger-on-focus="false"
                :fetch-suggestions="querySearch"
                class="autocomplete-input"
                placeholder="请输入依据内容"
                clearable
              />
            </el-form-item>
          </el-form>
        </el-col>
        <el-form
          v-for="(behavior,index) in formData.behaviorList"
          :key="index"
          :ref="'behaviorForm'+index"
          :model="behavior"
          label-width="80px"
          class="behavior-form"
        >
          <el-col
            :xs="{span: 24}"
            :sm="{span: 18}"
            :md="{span: 19}"
            :lg="{span: 20}"
            :xl="{span: 21}"
          >
            <el-form-item :label="(index+1).toString()">
              <el-input
                v-model="behavior.content"
                :autosize="{minRows: 1, maxRows: 6}"
                clearable
                type="textarea"
                placeholder="请输入内容"
              />
          </el-form-item></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 6}" :md="{span: 5}" :lg="{span: 4}" :xl="{span: 3}">
            <el-form-item>
              <el-button type="text" size="medium" @click="handleAddBehavior">
                <i class="el-icon-plus"/>添加
              </el-button>
              <el-button
                :disabled="formData.behaviorList.length === 1"
                type="text"
                size="medium"
                @click="handleDelBehavior(index)"
              >
                <i class="el-icon-delete"/>删除
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div align="center">
      <el-button type="primary" size="small" @click="handleSm('draft')">保存为草稿</el-button>
      <el-button plain size="small" @click="handleSm('publish')">保存并上报</el-button>
    </div>
  </el-card>
</template>
<script>
/* 当前组件必要引入 */
import { programmeGet, getDraft, getPunishNotice, fillingBehavior } from '@/api/auditManagement'
import { clausesTitleSearch } from '@/api/organizationalManagement'

export default {
  name: 'IndexEdit',
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
      dataLoading: false,
      programmeData: [],
      fileList: [],
      formData: {
        'projectName': '',
        'departmentName': '',
        'reviewName': '',
        'inspectName': '',
        'checkName': '',
        'programmeId': '',
        'queryDepartmentId': '',
        'departmentId': '',
        'number': '',
        'public': false,
        'type': '',
        'time': '',
        'state': 'draft',
        'queryUsers': '',
        'adminUsers': '',
        'inspectUsers': '',
        'fileIds': '',
        'contentList': [],
        'behaviorList': []
      },
      basis: '',
      basisClauseId: '',
      fillingBehavior: {
        'id': '',
        'state': '',
        'behaviorList': []
      },
      punishNoticeData: {},
      behaviorContent: [],
      todoType: 'Add',
      basisList: ''
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
      this.getManuscript(this.paramsData.draftId)
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
    // 搜索方案依据
    querySearch(queryString, cb) {
      // 获取管理标题
      if (queryString.length > 1) {
        clausesTitleSearch({ title: queryString }).then(res => {
          console.log(queryString)
          var data = res.data
          this.basisList = data
          console.log(data)
          var restaurants = []
          data.map(res => {
            var obj = { value: `《${res.title}》` + (res.number ? `（${res.number}）` : '') }
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
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1)
      }
    },
    // 获取底稿
    getManuscript(id) {
      this.dataLoading = true
      getDraft({ id: id }).then(res => {
        if (!res.status.error) {
          const data = res.data
          data.behaviorList = []
          console.log(res.data)
          // 获取方案内容
          this.getAuditPlan(data.programmeId)
          // 获取检查内容
          if (!data.contentList.length) {
            return
          } else {
            this.getBehaviorContent(data.contentList)
          }
          this.formData = data
          this.getPunishNoticeData()
          this.dataLoading = false
        } else {
          this.$message({
            type: 'error',
            message: res.status.msg + '!'
          })
          this.dataLoading = false
        }
      })
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
      this.loading = false
    },
    // 获取积分通知书
    getPunishNoticeData() {
      const { id } = this.paramsData
      getPunishNotice({ id }).then(res => {
        if (!res.status.error) {
          const data = res.data
          this.basisClauseId = data.basisClauseId
          if (data.basisClauseTitle || data.basisClauseNumber) {
            this.basis = `《${data.basisClauseTitle}》` + (data.basisClauseNumber ? `（${data.basisClauseNumber}）` : '')
          } else {
            this.basis = ''
          }
          // console.log('测试' + this.basis)
          this.punishNoticeData = data
          console.log(res.data)
          if (!res.data.behaviorList.length) {
            this.handleAddBehavior()
          } else {
            this.formData.behaviorList = res.data.behaviorList
          }
        } else {
          this.$message({
            type: 'error',
            message: res.status.msg + '!'
          })
        }
      })
    },
    // 添加违规行为
    handleAddBehavior() {
      // this.$set(this.formData.behaviorList, this.formData.behaviorList.length, {
      //   'id': '',
      //   'behaviorId': 0,
      //   'content': ''
      // })
      this.formData.behaviorList.push({
        'id': '',
        'behaviorId': 0,
        'content': ''
      })
      console.log('增加')
      console.log(this.formData.behaviorList)
    },
    // 删除违规行为
    handleDelBehavior(index) {
      console.log(index)
      this.formData.behaviorList.splice(index, 1)
    },
    // 提交违规行为
    handleSm(val) {
      if (this.basisList) {
        const basis = this.basisList.filter(res => this.basis === `《${res.title}》` + (res.number ? `（${res.number}）` : ''))
        this.basisClauseId = basis[0].id
      }
      const behaviorList = this.formData.behaviorList
      const data = {
        id: this.punishNoticeData.id,
        state: val,
        basisClauseId: this.basisClauseId,
        behaviorList: behaviorList.filter(res => res.content !== '')
      }
      fillingBehavior(data).then(res => {
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
        }
      })
    }
  }
}
</script>
