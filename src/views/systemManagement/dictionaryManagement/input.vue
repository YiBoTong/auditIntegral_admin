<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 创建修改
-->
<template>
  <el-card v-loading="showLoading">
    <div slot="header" class="card-header">
      <el-row>
        <el-col :span="12">
          <el-button type="text" disabled>{{ todoType | typeText }}字典</el-button>
        </el-col>
        <el-col :span="12" align="right">
          <el-button type="text" @click="backList('dictionaryManagement')">返回列表</el-button>
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="10">
      <el-form
        ref="refForm"
        :rules="dictionaryTypeRules"
        :model="formData"
        label-width="100px">
        <el-col
          :xs="{span: 24}"
          :sm="{span: 24}"
          :md="{span: 24}"
          :lg="{span: 12}"
          :xl="{span: 12}">
          <el-form-item
            label="字典类型"
            prop="title">
            <el-input
              v-model="formData.title"
              placeholder="请输入字典类型，例如：人员性别"
              type="text"
              clearable />
          </el-form-item>
        </el-col>
        <el-col
          :xs="{span: 24}"
          :sm="{span: 12}"
          :md="{span: 12}"
          :lg="{span: 6}"
          :xl="{span: 6}">
          <el-form-item label="是否启用">
            <el-switch
              v-model="formData.isUse"
              :disabled="formData.id && formData.id<0"
              active-color="#13ce66"
              inactive-color="#ff4949" />
          </el-form-item>
        </el-col>
        <el-col
          :xs="{span: 24}"
          :sm="{span: 12}"
          :md="{span: 12}"
          :lg="{span: 6}"
          :xl="{span: 6}">
          <el-form-item label="字典分类">
            <el-select
              :disabled="formData.id && formData.id<0"
              v-model="formData.key"
              placeholder="请选择字典"
              clearable>
              <el-option
                v-for="(item,index) in dictionaries"
                :key="index"
                :value="item.key"
                :label="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item
            label="描述"
            prop="describe"
            class="describe">
            <el-input
              v-model="formData.describe"
              :autosize="autosize"
              placeholder="输入字典类型描述、用途等"
              type="textarea"
              clearable />
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <hr>
    <br>
    <h3>字典内容</h3>
    <br>
    <el-row :gutter="10">
      <el-col
        v-for="(dictionary,index) in formData.dictionaries"
        :key="index">
        <el-form
          :rules="dictionaryRules"
          :ref="'dictionaryForm'+index"
          :model="dictionary"
          label-width="80px"
          class="dict-content">
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 6}"
            :xl="{span: 6}">
            <el-form-item
              label="键"
              prop="key">
              <el-input
                :disabled="dictionary.id && dictionary.id<0"
                v-model="dictionary.key"
                placeholder="例如：man"
                clearable />
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 6}"
            :xl="{span: 6}">
            <el-form-item
              label="值"
              prop="value">
              <el-input
                v-model="dictionary.value"
                placeholder="例如：男"
                clearable />
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 6}"
            :xl="{span: 6}">
            <el-form-item
              label="备注"
              prop="describe">
              <el-input
                v-model="dictionary.describe"
                placeholder="字典备注信息"
                clearable />
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 6}"
            :xl="{span: 6}">
            <el-form-item>
              <el-button
                type="text"
                size="medium"
                @click="addDictionary"><i class="el-icon-plus" />添加
              </el-button>
              <el-button
                :disabled="formData.dictionaries.length === 1 || (dictionary.id && dictionary.id<0)"
                type="text"
                size="medium"
                @click="delDictionary(index)"><i class="el-icon-delete" />删除
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-col>
    </el-row>
    <div align="center">
      <el-button :disabled="!canEdit" type="primary" @click="submitForm">保存</el-button>
    </div>
  </el-card>
</template>
<script>
/* 当前组件必要引入 */
import { dictionaryType as dictionaryTypeRules, dictionary as dictionaryRules } from '../rules'
import { dictAdd, dictEdit, dictGet } from '@/api/systemManagement'

export default {
  name: 'DictionaryManagementInput',
  components: {},
  // props: {},
  data() {
    return {
      dictAdd,
      dictEdit,
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
      dictId: null,
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
      const { id } = this.$route.params
      this.dictId = id
      this.getSelectDict()
      if (!this.dictId) {
        this.addDictionary()
        this.showLoading = false
      } else {
        this.todoType = 'Edit'
        this.getDictionary()
      }
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
      dictGet({ id: this.dictId }).then(res => {
        if (!res.status.error) {
          this.formData = res.data
        } else {
          this.$message({
            type: 'error',
            message: res.status.msg + '!'
          })
          this.canEdit = false
        }
        this.showLoading = false
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
          this.backList('dictionaryManagement')
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
          this.backList('dictionaryManagement')
        }
      })
    },
    // 获取字典类型
    getSelectDict() {
      dictGet({ id: -1 }).then(res => {
        this.dictionaries = res.data.dictionaries || []
      })
    }
  }
}

</script>
