<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 创建修改
-->
<template>
  <div
    class="confirmation-show-container">
    <div class="show-header">
      <div class="header-left">
        <el-button @click="backList">返回列表</el-button>
      </div>
    </div>
    <div v-loading="loading" class="show-content">
      <el-card>
        <div slot="header" class="card-header">
          <div class="header-title">稽核事实确认书</div>
        </div>
        <div class="card-content">
          <div class="content-top">
            <div>{{ tableData.draft.departmentName }}:</div>
            <div class="top-content">
              根据xⅹ稽査局的工作部署,依据:{{ basisStr }},XX稽核组于 {{ tableData.programme.startTime }} 至{{ tableData.programme.endTime }},对你社{{ tableData.programme.planStartTime }}至{{ tableData.programme.planEndTime }}业务经营、贯例执行党和国家各项金融政策、法律、法规及系统内各项规章制度等情况进行了常规稽核。本次稽核发现以下问题:`
            </div>
          </div>
          <div class="content-body">
            <div v-for="(item, index) in behaviorContent" :key="item.id" class="body-draft-content">
              <div class="behavior-content-title indent">{{ numberConvertToUppercase(index+1)+'、'+item.content }}</div>
              <div v-for="(sonItem, sonIndex) in item.behaviorContent" :key="sonIndex">
                <div class="behavior-content-content sonIndent">{{ sonIndex+1 +'、'+sonItem.behaviorContent }}</div>
              </div>
            </div>
          </div>
          <div v-if="tableData.hasRead === 0" class="content-bottom">
            <el-button :loading="buttonLoading" type="primary" size="medium" @click="handleHasRead">
              我已阅读
            </el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { getConfirmation, changeReadConfirmation } from '@/api/auditManagement'
import { programmeGet } from '@/api/auditManagement'

export default {
  name: 'DictionaryManagementInput',
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
      loading: false,
      buttonLoading: false,
      tableData: [],
      behaviorContent: [],
      basisStr: []
    }
  },
  computed: {

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
      }
    },
    // 返回列表
    backList() {
      this.$emit('view', 'list')
    },
    // 我已阅读
    handleHasRead() {
      console.log(123)
      this.buttonLoading = true
      changeReadConfirmation({ id: this.tableData.id }).then(res => {
        if (res.status.error) {
          this.buttonLoading = false
          this.$message({ type: 'error', message: res.status.msg })
        } else {
          this.buttonLoading = false
          this.$message({ type: 'error', message: res.status.msg })
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
          // console.log(this.tableData)
          const data = res.data// 获取依据
          const queryId = data.programme.id
          this.getAuditPlan(queryId)
          if (!data.draftContent.length) {
            this.addViolation()
          } else {
            this.getBehaviorContent(data.draftContent)
          }
        } else {
          this.$message({
            type: 'error',
            message: res.status.msg + '!'
          })
        }
      })
    },
    // 获取依据
    getAuditPlan(id) {
      programmeGet({ id: id }).then(res => {
        const data = res.data.basis
        const list = []
        console.log(data)
        data.map(res => {
          list.push(res.content)
        })
        this.basisStr = list.join(',')
      })
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
