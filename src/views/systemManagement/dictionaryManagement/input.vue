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
          type="primary"
          @click="submitForm">完成
        </el-button>
        <el-button @click="resetForm('formData')">重置</el-button>
      </div>
    </div>
    <br>
    <div class="dict-title">
      <span>{{ todoType }}字典</span>
      <hr>
    </div>
    <el-form
      ref="refForm"
      :rules="dictionaryTypeRules"
      :model="formData"
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
      <!-- <el-form-item label="是否启用"
                    prop="isUse">
        <el-input v-model="formData.isUse"
                  type="text"
                  clearable />
      </el-form-item> -->
      <el-form-item label="是否启用">
        <el-switch
          v-model="formData.isUse"
          active-color="#13ce66"
          inactive-color="#ff4949" />
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
      <!-- <el-form-item label="顺序"
                      prop="order">
          <el-input v-model="dictionary.order" />
        </el-form-item> -->
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
      listLoading: false,
      dictionaryRules,
      dictionaryTypeRules,
      formData: {
        title: '',
        isUse: '',
        updateTime: '',
        describe: '',
        dictionaries: []
      },
      todoType: '添加',
      autosize: { minRows: 4, maxRows: 6 }
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
        console.log(this.paramsData)
      } else {
        this.todoType = '编辑'
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
      dictGet().then(res => {

      })
    },
    // 提交表单
    submitForm() {
      this.listLoading = true
      console.log(this.formData)
      const data = Object.assign({}, this.formData)
      this.$refs.refForm.validate(valid => {
        if (!valid) return
        if (!this.paramsData) {
          dictEdit(data).then(res => {
            this.$message.success('编辑成功')
          })
        } else {
          dictAdd(data).then(res => {
            this.$message.success('新增成功')
          })
        }
        // this.listLoading = false
      })
    }
  }
}

</script>
