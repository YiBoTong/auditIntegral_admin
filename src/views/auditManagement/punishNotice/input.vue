<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 创建修改
-->
<template>
  <div
    v-loading="listLoading"
    class="punish-input-container">
    <div class="punish-top">
      <div class="header-left">
        <el-button @click="backList">返回列表</el-button>
      </div>
      <div class="header-right">
        <el-button
          type="primary"
          @click="submitForm">完成
        </el-button>
      </div>
    </div>
    <el-card>
      <div slot="header" class="card-header">
        <span>{{ editType | punishEditType }}</span>
      </div>
      <div class="card-body">
        <div class="body-top">
          <div>编号:</div>
          <div>普定县农村信用社员工违规积分通知书</div>
        </div>
        <div class="body-body">
          content
        </div>
        <div class="body-bottom">
          <div class="bottom-content">
            本通知一式两份，一份送违规责任人，一份由违规积分管理办公室留存。违规责任人收到通知后应在积分管理办公室留存联签字确认。
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { dictionaryType as dictionaryTypeRules, dictionary as dictionaryRules } from '../rules'
import { dictAdd, dictEdit, dictGet } from '@/api/systemManagement'

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
      dictAdd,
      dictEdit,
      listLoading: false,
      dictionaryRules,
      dictionaryTypeRules,
      formData: {
        typeId: '-1',
        key: '',
        title: '',
        isUse: false,
        updateTime: '',
        describe: '',
        dictionaries: []
      },
      dictionaries: [],
      editType: '',
      autosize: { minRows: 4, maxRows: 6 },
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
      this.getSeleteDict()
      if (this.paramsData.editType === 'score') {
        this.editType = 'score'
      } else if (this.paramsData.editType === 'number') {
        this.editType = 'number'
      } else {
        this.editType = 'author'
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
    // 添加字典
    addDictionary() {
      this.formData.dictionaries.push({
        key: '',
        value: '',
        order: '',
        describe: ''
      })
    },
    // 删除字典内容
    delDictionary(index) {
      this.formData.dictionaries.splice(index, 1)
    },
    // 获取字典
    getDictionary() {
      const { id } = this.paramsData
      dictGet({ id }).then(res => {
        if (!res.status.error) {
          this.formData = res.data
        } else {
          this.$message({
            type: 'error',
            message: res.status.msg + '!'
          })
          this.canEdit = false
        }
      })
    },
    // 提交表单
    submitForm() {
      // this.listLoading = true
      console.log(this.formData)
      this.$refs.refForm.validate(valid => {
        if (!valid) return false
        const data = Object.assign({}, this.formData)
        // data.dictionaries.map((item, index) => item.order = index + 1)
        data.dictionaries.map(function(item, index) {
          item.order = index + 1
          return item.order
        })
        this[this.todoType.toLocaleLowerCase() + 'Dictionaries'](data)
      })
    },
    // 创建
    addDictionaries(data) {
      dictAdd(data).then((res) => {
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
    editDictionaries(data) {
      dictEdit(data).then((res) => {
        this.$message({
          type: res.status.error ? 'error' : 'success',
          message: res.status.msg + '!'
        })
        if (!res.status.error) {
          this.backList()
        }
      })
    },
    // 获取字典类型
    getSeleteDict() {
      dictGet({ id: -1 }).then(res => {
        this.dictionaries = res.data.dictionaries || []
      })
    }
  }
}

</script>
