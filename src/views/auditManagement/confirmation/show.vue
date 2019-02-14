<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 查看事实确认书
-->
<template>
  <el-card v-loading="dataLoading" class="confirmation-show-container">
    <el-row slot="header" :gutter="10" class="card-header">
      <el-col :span="12">
        <el-button type="text" disabled>查看事实确认书</el-button>
      </el-col>
      <el-col :span="12" align="right">
        <el-button type="text" @click="backList('confirmation')">返回列表</el-button>
      </el-col>
      <el-col :span="24" align="center">
        <h1>稽核事实确认书</h1>
        <br>
        <p v-if="fromData">{{ fromData.year | numbers(fromData.number) }}</p>
      </el-col>
    </el-row>
    <div v-if="showData" class="card-content">
      <div class="content-top">
        <div>
          <h3>{{ fromData.draft.queryDepartmentName }}:</h3>
        </div>
        <div class="top-content indent">
          根据稽核工作计划及领导安排，
          <!--依据:{{ basisStr }} ,XX稽核组于 {{ tableData.programme.startTime | fmtDate('yyyy年MM月dd日') }} 至{{ tableData.programme.endTime | fmtDate('yyyy年MM月dd日') }},对你社{{ tableData.programme.planStartTime | fmtDate('yyyy年MM月dd日') }}至{{ tableData.programme.planEndTime | fmtDate('yyyy年MM月dd日') }}业务经营、贯例执行党和国家各项金融政策、法律、法规及系统内各项规章制度等情况进行了常规稽核。本次稽核发现以下问题:-->
          {{ showStr }}
        </div>
      </div>
      <div class="content-body">
        <div v-for="(item, index) in behaviorContent" :key="item.id" class="body-draft-content">
          <div class="behavior-content-title indent">
            <h3>{{ numberConvertToUppercase(index+1)+'、'+item.content }}</h3>
          </div>
          <div v-for="(sonItem, sonIndex) in item.behaviorContent" :key="sonIndex">
            <div
              class="behavior-content-content sonIndent"
            >{{ sonIndex+1 +'、'+sonItem.behaviorContent }}</div>
          </div>
        </div>
      </div>
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
      <div v-if="tableData.hasRead === 0 && fromData.state==='publish'" align="center">
        <br>
        <el-button :loading="buttonLoading" type="primary" size="medium" @click="handleHasRead">我已阅读</el-button>
      </div>
    </div>
  </el-card>
</template>
<script>
/* 当前组件必要引入 */
import { getConfirmation, changeReadConfirmation } from '@/api/auditManagement'
import { fmtDate } from '@/filters/index'
export default {
  name: 'ConfirmationShow',
  components: {},
  // props: {},
  data() {
    return {
      dataLoading: false,
      buttonLoading: false,
      tableData: [],
      behaviorContent: [],
      basisStr: '',
      department: '',
      showData: false,
      fromData: null,
      inspectName: '',
      users: '',
      fileIdArr: ''
    }
  },
  computed: {
    showStr: function() {
      return `依据${this.basisStr}，${this.fromData.draft.departmentName} 于 ${fmtDate(this.tableData.programme.startTime, 'yyyy年MM月dd日')} 至 ${fmtDate(this.tableData.programme.endTime, 'yyyy年MM月dd日')}，对你社${fmtDate(this.tableData.programme.planStartTime, 'yyyy年MM月dd日')} 至 ${fmtDate(this.tableData.programme.planEndTime, 'yyyy年MM月dd日')} 业务经营、贯例执行党和国家各项金融政策、法律、法规及系统内各项规章制度等情况进行了常规稽核。本次稽核发现以下问题：`
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
      if (this.$route.params) {
        const { id } = this.$route.params
        this.getConfirmationData(id)
      }
    },
    // 我已阅读
    handleHasRead() {
      this.buttonLoading = true
      changeReadConfirmation({ id: this.tableData.id }).then(res => {
        if (!res.status.error) {
          this.$message({ type: 'success', message: res.status.msg })
          this.init()
        } else {
          this.$message({ type: 'error', message: res.status.msg })
          this.init()
        }
        this.buttonLoading = false
      })
    },
    // 下载文件
    headleShow(file) {
      console.log(file)
      this.downloadMulti(file.name, file.url)
    },
    // 获取事实确认书
    getConfirmationData(id) {
      this.dataLoading = true
      getConfirmation({ id: id }).then(res => {
        if (!res.status.error) {
          this.tableData = res.data
          this.department = res.data.draft.departmentName
          // console.log(this.tableData)
          const data = res.data
          // 获取依据
          const basisList = []
          const list = res.data.fileList
          res.data.basisList.map(res => {
            basisList.push(res.content)
          })
          this.basisStr = basisList.join('、')
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
          list.map(v => {
            v.url = v.path + v.fileName + '.' + v.suffix
            v.name = v.name + '.' + v.suffix
          })
          this.fileList = list
          // 检查内容
          if (data.contentList.length) {
            this.getBehaviorContent(data.contentList)
          }
          this.fromData = data
          this.showData = true
        } else {
          this.$message({
            type: 'error',
            message: res.status.msg + '!'
          })
        }
        this.dataLoading = false
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
    }
  }
}
</script>
