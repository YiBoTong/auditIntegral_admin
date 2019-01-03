<!--
****--@date     2018-12-24 18:00
****--@author   XXL
****--@describe show
-->
<template>
  <div
    class="manuscript-show-container">
    <div class="form-header">
      <div class="header-left">
        <el-button @click="backList">返回列表</el-button>
      </div>
    </div>
    <el-row :gutter="10">
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 12}"
        :lg="{span: 12}"
        :xl="{span: 12}">
        <ve-pie :data="chartData" :settings="{dataType: 'percent'}" :option="{title:'稽核业务范围'}" />
      </el-col>
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 12}"
        :lg="{span: 12}"
        :xl="{span: 12}">
        <ve-radar :data="raderChartData"/>
      </el-col>
      <el-col>
        <ve-histogram :data="histogramChartData"/>
      </el-col>
      <!--<el-col-->
      <!--:xs="{span: 24}"-->
      <!--:sm="{span: 24}"-->
      <!--:md="{span: 12}"-->
      <!--:lg="{span: 12}"-->
      <!--:xl="{span: 12}">-->
      <!--<ve-line-->
      <!--:data="lineChartData"-->
      <!--:settings="{-->
      <!--stack: { '用户': ['访问用户', '下单用户'] },-->
      <!--area: true-->
      <!--}"/>-->
      <!--</el-col>-->
    </el-row>
  </div>
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
      listLoading: false,
      checked: true,
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
        'contentList': []
      },
      behaviorContent: [],
      todoType: 'Add',
      autosize: { minRows: 4, maxRows: 6 },
      chartData: {
        columns: ['业务', '数量'],
        rows: [
          { '业务': '业务1', '数量': 1 },
          { '业务': '业务2', '数量': 1 },
          { '业务': '业务3', '数量': 1 },
          { '业务': '业务4', '数量': 1 },
          { '业务': '业务5', '数量': 1 }
        ]
      },
      raderChartData: {
        columns: ['姓名', '违规行为1', '违规行为2', '违规行为3', '违规行为4', '违规行为5'],
        rows: [
          { '姓名': '小张', '违规行为1': 0, '违规行为2': 1, '违规行为3': 1, '违规行为4': 3, '违规行为5': 2 },
          { '姓名': '小王', '违规行为1': 1, '违规行为2': 0, '违规行为3': 2, '违规行为4': 1, '违规行为5': 0 },
          { '姓名': '小明', '违规行为1': 0, '违规行为2': 0, '违规行为3': 1, '违规行为4': 1, '违规行为5': 3 }
        ]
      },
      histogramChartData: {
        columns: ['行为', '小张', '小王', '小明'],
        rows: [
          { '行为': '违规行为1', '小张': 1, '小王': 2, '小明': 3 },
          { '行为': '违规行为2', '小张': 3, '小王': 0, '小明': 2 },
          { '行为': '违规行为3', '小张': 2, '小王': 1, '小明': 0 },
          { '行为': '违规行为4', '小张': 0, '小王': 1, '小明': 2 },
          { '行为': '违规行为5', '小张': 1, '小王': 3, '小明': 3 }
        ]
      },
      lineChartData: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
          { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
          { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
          { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
          { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
          { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
        ]
      }
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
          console.log(data)
          const fileIdArr = []
          const list = res.data.fileList || []
          const inspectUserList = []
          const adminUserList = []
          const queryUserList = []
          // 获取方案内容
          this.getAuditPlan(data.programmeId)
          // 获取违规内容
          if (!data.contentList.length) {
            return
          } else {
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
          data.inspectUserList.map(res => {
            inspectUserList.push(res.userName)
          })
          data.adminUserList.map(res => {
            adminUserList.push(res.userName)
          })
          data.queryUserList.map(res => {
            queryUserList.push(res.userName)
          })
          // todo 需要处理人员数据
          this.formData = data
          this.fileList = list
          this.formData.inspectName = inspectUserList.join(',')
          this.formData.reviewName = adminUserList.join(',')
          this.formData.checkName = queryUserList.join(',')
          this.formData.public = checkChange(data.public)
          // if (!data.contentList.length) {
          //   this.addViolation()
          // } else {
          //   this.getBehaviorContent(data.contentList)
          // }
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
      this.behaviorContent = temp
      this.loading = false
    }
  }
}

</script>
