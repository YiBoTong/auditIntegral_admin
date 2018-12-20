<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 添加 or 编辑
-->
<template>
  <div class="methods-input-container">
    <div class="form-header">
      <div class="header-left">
        <el-button @click="backList">返回列表</el-button>
      </div>
      <div class="header-right">
        <el-button
          type="primary"
          @click="submitForm(formData)">{{ todoType | typeText }}</el-button>
        <el-button @click="resetForm('refForm')">重置</el-button>
      </div>
    </div>
    <el-card>
      <div slot="header" class="card-header">
        <span>{{ todoType | typeText }}管理办法</span>
      </div>
      <el-row :gutter="10">
        <el-form
          ref="refForm"
          :model="formData"
          label-width="130px">
          <el-col>
            <el-form-item
              label="管理办法标题"
              prop="title">
              <el-input
                v-model="formData.title"
                type="text"
                clearable />
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 24}"
            :md="{span: 12}"
            :lg="{span: 12}"
            :xl="{span: 12}">
            <el-form-item
              label="状态"
              class="editFormInput"
              prop="state">
              <el-select v-model="formData.state" placeholder="请选择">
                <el-option
                  v-for="item in states"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 24}"
            :md="{span: 12}"
            :lg="{span: 12}"
            :xl="{span: 12}">
            <el-form-item
              label="指定部门"
              prop="informId">
              <el-radio-group v-model="formData.informType">
                <el-radio :label="0">所有部门</el-radio>
                <el-radio :label="1">当前部门</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
    <el-card>
      <div slot="header" class="card-header">
        <el-row>
          <el-col :span="12">
            <span>管理内容</span>
          </el-col>
          <!--<el-col :span="12" align="right">-->
          <!--<el-button-->
          <!--type="text"-->
          <!--size="medium"-->
          <!--@click="addMethods"><i class="el-icon-plus" />添加-->
          <!--</el-button>-->
          <!--</el-col>-->
        </el-row>
      </div>
      <el-row :gutter="10">
        <el-form
          v-for="(content,index) in formData.content"
          :key="index"
          :ref="'departmentForm'+index"
          :model="content"
          label-width="100px">
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: content.isTitle ?8:12}"
            :lg="{span: content.isTitle ?8:12}"
            :xl="{span: content.isTitle ?8:12}">
            <el-form-item
              label="类型"
              prop="isTitle">
              <el-radio-group v-model="content.isTitle">
                <el-radio :label="true">标题</el-radio>
                <el-radio :label="false">内容</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col
            v-show="content.isTitle"
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 8}"
            :lg="{span: 8}"
            :xl="{span: 8}">
            <el-form-item
              label="标题级别"
              prop="titleLevel">
              <el-select v-model="content.titleLevel" placeholder="请选择">
                <dictionary-option :option-data="dictionaries"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: content.isTitle ?8:12}"
            :lg="{span: content.isTitle ?8:12}"
            :xl="{span: content.isTitle ?8:12}"
            align="right">
            <el-form-item>
              <el-button
                type="text"
                size="medium"
                @click="addChild(index)">
                <i class="el-icon-plus" />
                {{ index !== formData.content.length - 1 ? '插入' : '添加' }}
              </el-button>
              <el-button
                :disabled="formData.content.length === 1"
                type="text"
                size="medium"
                @click="delChild(index)"><i class="el-icon-delete" />删除
              </el-button>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              :label="content.isTitle ? '标题' : '内容'"
              prop="content">
              <el-input
                :autosize="{ minRows: 1, maxRows: 6}"
                v-model="content.content"
                type="textarea" />
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import DictionaryOption from '@/components/DictionaryOption/dictionaryOption'
/* 当前组件必要引入 */
import states from './state'
import { clauseAdd, clauseEdit, clauseGet } from '@/api/organizationalManagement'
import { dictGet } from '@/api/systemManagement'
export default {
  name: 'MMInput',
  components: { DictionaryOption },
  props: {
    paramsData: {
      type: [Object],
      default: null
    }
  },
  data() {
    return {
      states,
      dictionaries: [],
      todoType: 'Add',
      formData: {
        title: '',
        informId: -1,
        informType: 0,
        fileIds: '',
        content: [],
        fileList: [],
        state: 'draft'
      }
    }
  },
  created() {
    this.init()
  },
  mounted() { },
  methods: {
    // 初始化
    init() {
      // this.getSeleteDict()
      // if (!this.paramsData) {
      //   this.addChild()
      // } else {
      //   this.todoType = 'Edit'
      //   this.getClause()
      //   console.log(this.paramsData)
      // }
      this.getSeleteDict()
      const data = this.paramsData
      console.log(data)
      // 判断是添加 还是 修改
      if (data && data.addOrEdit) { // 修改
        this.todoType = data.addOrEdit
        this.getClause()
      } else {
        if (data) { // 选择部门后进入添加
          this.todoType = 'Add'
          this.formData.informType = 1
          this.formData.informId = data.id
          this.addChild()
        } else { // 没选择部门进入添加
          this.todoType = 'Add'
          this.formData.informId = -1
        }
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
    // 提交表单
    submitForm() {
      this.listLoading = true
      console.log(this.formData)
      const data = Object.assign({}, this.formData)

      this.$refs.refForm.validate(valid => {
        if (!valid) return false
        if (data.informType === 0) {
          data.informId = -1
        }
        data.content = data.content.filter(item => item.content !== '')
        data.content.map((item, index) => (item.order = index + 1))
        if (this.paramsData) {
          clauseEdit(data).then(res => {
            this.$message.success('编辑成功')
            this.backList()
          })
        } else {
          clauseAdd(data).then(res => {
            this.$message.success('新增成功')
            this.backList()
          })
        }
        this.listLoading = false
      })
    },
    getClause() {
      clauseGet({ id: this.paramsData.id }).then(res => {
        const data = res.data
        const fileIds = []
        data.fileList.map(item => {
          fileIds.push(item.id)
        })
        data.informType = data.informId === -1 ? 0 : 1
        data.fileIds = fileIds.join(',')
        this.formData = data
        if (!data.content.length) {
          this.addChild()
        }
      })
    },
    addChild(index = 0) {
      const temp = this.formData.content.length && this.formData.content[index || (this.formData.content.length - 1)]
      const item = {
        content: '',
        isTitle: temp.isTitle || false,
        titleLevel: temp.titleLevel || '',
        order: ''
      }
      if (index !== this.formData.content.length - 1) {
        this.formData.content.splice(index, 0, item)
      } else {
        this.formData.content.push(item)
      }
    },
    // 删除
    delChild(index) {
      this.formData.content.splice(index, 1)
    },
    // 获取字典类型
    getSeleteDict() {
      dictGet({ id: -4 }).then(res => {
        this.dictionaries = res.data.dictionaries || []
      })
    }
  }
}

</script>
