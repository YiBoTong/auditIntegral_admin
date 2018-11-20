<template>
  <div class="form-container">
    <div class="form-header">
      <div class="header-left">
        <el-button @click="backList">返回列表</el-button>
      </div>
      <div class="header-right">
        <el-button
          type="primary"
          @click="submitForm">添加
        </el-button>
        <el-button @click="resetForm('formData')">重置</el-button>
      </div>
    </div>
    <br>
    <div class="dict-title">
      <span>创建字典</span>
      <hr>
    </div>
    <el-form
      :rules="dictionaryTypeRules"
      ref="formData"
      :model="formData"
      label-width="100px">
      <el-form-item
        label="类型标题"
        prop="title">
        <el-input
          v-model="formData.title"
          type="text"
          clearable/>
      </el-form-item>
      <el-form-item
        label="是否启用"
        prop="isUse">
        <el-input
          v-model="formData.isUse"
          type="text"
          clearable/>
      </el-form-item>
      <el-form-item
        label="描述"
        prop="describe">
        <el-input
          v-model="formData.describe"
          type="text"
          clearable/>
      </el-form-item>
    </el-form>
    <div class="dict-title">
      <span>字典内容</span>
      <hr>
    </div>
    <div class="dict-form">
      <el-form
        v-for="(dictionary,index) in formData.dictionaries"
        :key="index"
        :rules="dictionaryRules"
        :ref="'dictionaryForm'+index"
        :model="dictionary"
        label-width="80px">
        <el-form-item label="键" prop="key">
          <el-input v-model="dictionary.key"/>
        </el-form-item>
        <el-form-item label="值" prop="value">
          <el-input v-model="dictionary.value"/>
        </el-form-item>
        <el-form-item label="顺序" prop="order">
          <el-input v-model="dictionary.order"/>
        </el-form-item>
        <el-form-item label="备注" prop="describe">
          <el-input v-model="dictionary.describe"/>
        </el-form-item>
        <el-form-item>
          <el-button
            type="text"
            size="medium"
            @click="addDictionary"><i class="el-icon-plus"/>添加
          </el-button>
          <el-button
            type="text"
            size="medium"
            @click="delDictionary(index)"><i class="el-icon-delete"/>删除
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import {dictionaryType as dictionaryTypeRules, dictionary as dictionaryRules} from '../rules'
export default {
  name: 'DictionaryManagementInput',
  components: {},
  props: {
    paramsData: String
  },
  data() {
    return {
      dictionaryRules,
      dictionaryTypeRules,
      formData: {
        title: '',
        isUse: '',
        updateTime: '',
        describe: '',
        dictionaries: []
      },
      todoType: 'add'
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
      if (!this.paramsData) {
        this.addDictionary()
      } else {
        this.getDictionary()
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
    addDictionary() {
      this.formData.dictionaries.push({
        key: '',
        value: '',
        order: '',
        describe: ''
      })
    },
    delDictionary(index) {
      this.formData.dictionaries.splice(index, 1)
    },
    getDictionary() {

    },
    // 提交表单
    submitForm() {
      console.log(this.formData)
    }
  }
}

</script>
