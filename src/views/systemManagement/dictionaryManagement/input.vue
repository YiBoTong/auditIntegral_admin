<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 创建修改
-->
<template>
  <div
    v-loading="listLoading"
    class="dict-container">
    <div class="form-header">
      <div class="header-left">
        <el-button @click="backList">返回列表</el-button>
      </div>
      <div class="header-right">
        <el-button
          :disabled="!canEdit"
          type="primary"
          @click="submitForm">完成
        </el-button>
        <el-button
          :disabled="!canEdit"
          @click="resetForm('formData')">重置</el-button>
      </div>
    </div>
    <br>
    <div class="dict-title">
      <span>{{ todoType | typeText }}字典</span>
      <hr>
    </div>
    <el-form
      ref="refForm"
      :rules="dictionaryTypeRules"
      :model="formData"
      :disabled="!canEdit"
      label-width="100px"
      class="dict-add">
      <el-form-item
        label="类型标题"
        prop="title">
        <el-input
          v-model="formData.title"
          type="text"
          clearable />
      </el-form-item>
      <el-form-item label="是否启用">
        <el-switch
          v-model="formData.isUse"
          active-color="#13ce66"
          inactive-color="#ff4949" />
      </el-form-item>
      <el-form-item label="字典类型">
        <el-select
          v-model="formData.key"
          placeholder="请选择">
          <el-option
            v-for="(item,index) in dictionaries"
            :key="index"
            :value="item.key"
            :label="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item
        label="描述"
        prop="describe"
        class="describe">
        <el-input
          v-model="formData.describe"
          :autosize="autosize"
          type="textarea"
          clearable />
      </el-form-item>
    </el-form>
    <div class="dict-title">
      <span>字典内容</span>
      <hr>
    </div>
    <el-form
      v-for="(dictionary,index) in formData.dictionaries"
      :key="index"
      :rules="dictionaryRules"
      :ref="'dictionaryForm'+index"
      :model="dictionary"
      label-width="80px"
      class="dict-content">
      <el-form-item
        label="键"
        prop="key">
        <el-input v-model="dictionary.key" />
      </el-form-item>
      <el-form-item
        label="值"
        prop="value">
        <el-input v-model="dictionary.value" />
      </el-form-item>
      <el-form-item
        label="备注"
        prop="describe">
        <el-input v-model="dictionary.describe" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="text"
          size="medium"
          @click="addDictionary"><i class="el-icon-plus" />添加
        </el-button>
        <el-button
          :disabled="formData.dictionaries.length === 1"
          type="text"
          size="medium"
          @click="delDictionary(index)"><i class="el-icon-delete" />删除
        </el-button>
      </el-form-item>
    </el-form>
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
      todoType: 'Add',
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
      if (!this.paramsData) {
        this.addDictionary()
      } else {
        this.todoType = 'Edit'
        this.getDictionary()
        console.log(this.paramsData)
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
        if (!res.data.status.error) {
          this.formData = res.data.data
        } else {
          this.$message({
            type: 'error',
            message: res.data.status.msg + '!'
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
          type: res.data.status.error ? 'error' : 'success',
          message: res.data.status.msg + '!'
        })
        if (!res.data.status.error) {
          this.backList()
        }
      })
    },
    // 编辑
    editDictionaries(data) {
      dictEdit(data).then((res) => {
        this.$message({
          type: res.data.status.error ? 'error' : 'success',
          message: res.data.status.msg + '!'
        })
        if (!res.data.status.error) {
          this.backList()
        }
      })
    },
    // 获取字典类型
    getSeleteDict() {
      dictGet({ id: -1 }).then(res => {
        this.dictionaries = res.data.data.dictionaries || []
      })
    }
  }
}

</script>
