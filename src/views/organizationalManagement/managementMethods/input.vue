<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 添加 or 编辑
-->
<template>
  <el-card v-loading="showLoading" class="editMainBox">
    <div slot="header" class="card-header">
      <el-row>
        <el-col :span="12">
          <el-button type="text" disabled>{{ todoType | typeText }}文件</el-button>
        </el-col>
        <el-col :span="12" align="right">
          <el-button type="text" @click="backList('managementMethods')">返回列表</el-button>
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="10">
      <el-form
        ref="refForm"
        :model="formData"
        :rules="methodsRules"
        label-width="130px">
        <el-col>
          <el-form-item
            label="标题"
            prop="title">
            <el-input
              v-model="formData.title"
              :autosize="{minRows: 3}"
              placeholder="请输入文件标题"
              type="textarea"
              clearable/>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item
            label="来源"
            prop="number">
            <el-input
              v-model="formData.from"
              placeholder="请输入来源"
              clearable/>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item
            label="文件号"
            prop="number">
            <el-input
              v-model="formData.number"
              placeholder="请输入文件号"
              clearable/>
          </el-form-item>
        </el-col>
        <el-col
          :xs="{span: 24}"
          :sm="{span: 24}"
          :md="{span: 12}"
          :lg="{span: 12}"
          :xl="{span: 12}">
          <el-form-item
            label="分类"
            prop="informId">
            <el-select v-model="formData.type">
              <dictionary-option :id="-10"/>
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
              <el-radio :label="1">当前部门（{{ formData.departmentName }}）</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <hr>
    <br>
    <h4>文件正文</h4>
    <el-row :gutter="10">
      <el-form
        v-for="(content,index) in formData.content"
        :key="index"
        :ref="'departmentForm'+index"
        :model="content"
        :rules="methodsRules"
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
              <el-radio :label="1">标题</el-radio>
              <el-radio :label="0">内容</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col
          v-if="content.isTitle"
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
              <i class="el-icon-plus"/>
              {{ index !== formData.content.length - 1 ? '插入' : '添加' }}
            </el-button>
            <el-button
              :disabled="formData.content.length === 1"
              type="text"
              size="medium"
              @click="delChild(index)"><i class="el-icon-delete"/>删除
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
              type="textarea"/>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <hr>
    <br>
    <h4>相关附件</h4>
    <br>
    <div class="public-upload">
      <el-upload
        ref="upload"
        :before-remove="beforeRemove"
        :http-request="doUpload"
        :limit="10"
        :file-list="fileList"
        :on-exceed="handleExceed"
        :on-remove="onRemove"
        :on-preview="headleShow"
        class="upload"
        action
        multiple
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <div slot="tip" class="el-upload__tip">支持任意文件上传，且不超过1GB</div>
      </el-upload>
    </div>
    <div align="center">
      <el-button type="primary" size="small" @click="handleEdit('draft')">保存为草稿</el-button>
      <el-button plain size="small" @click="handleEdit('publish')">保存并发布</el-button>
    </div>
  </el-card>
</template>
<script>
import DictionaryOption from '@/components/DictionaryOption/dictionaryOption'
/* 当前组件必要引入 */
import states from './state'
import { clauseAdd, clauseEdit, clauseGet } from '@/api/organizationalManagement'
import { dictGet } from '@/api/systemManagement'
import { methodsRules } from '@/utils/rules'
import { fileUpload } from '@/api/uploadFile'

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
      methodsRules,
      states,
      dictionaries: null,
      todoType: 'Add',
      fileList: [],
      formData: {
        title: '',
        number: '',
        departmentId: '',
        departmentName: '',
        informType: 0,
        fileIds: '',
        from: '',
        content: [],
        state: 'draft'
      },
      fileIdArr: []
    }
  },
  created() {
    this.init()
  },
  mounted() { },
  methods: {
    // 初始化
    init() {
      const data = this.paramsData
      this.getSeleteDict()
      console.log(data)
      // 判断是添加 还是 修改
      if (data && data.addOrEdit) { // 修改
        this.todoType = data.addOrEdit
        this.getClause()
      } else {
        if (data) { // 选择部门后进入添加
          this.todoType = 'Add'
          this.formData.informType = data.id === -1 ? 0 : 1
          this.formData.departmentName = data.id === -1 ? '根部门/网点' : data.name
          this.formData.departmentId = data.id
          this.addChild()
          this.showLoading = false
        } else { // 没选择部门进入添加
          this.todoType = 'Add'
          this.addChild()
          this.formData.departmentName = '根部门/网点'
          this.formData.departmentId = -1
          this.formData.informType = 0
          this.showLoading = false
        }
      }
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 提交表单
    handleEdit(state) {
      this.listLoading = true
      console.log(this.formData)
      const data = Object.assign({}, this.formData)
      data.state = state
      data.fileIds = this.fileIdArr.join()
      this.$refs.refForm.validate(valid => {
        if (!valid) return false
        if (data.informType === 0) {
          data.informId = -1
        }
        data.content = data.content.filter(item => item.content !== '')
        data.content.map((item, index) => (item.order = index + 1))
        if (this.todoType === 'Edit') {
          clauseEdit(data).then(res => {
            this.$message.success('编辑成功')
            this.backList('managementMethods')
          })
        } else {
          clauseAdd(data).then(res => {
            this.$message.success('新增成功')
            this.backList('managementMethods')
          })
        }
        this.listLoading = false
      })
    },
    getClause() {
      clauseGet({ id: this.paramsData.id }).then(res => {
        const data = res.data
        const fileIds = []
        const content = data.content
        const _this = this
        const fileIdArr = []
        const list = res.data.fileList || []
        list.map(item => fileIdArr.push(item.id))
        data.fileIds = fileIdArr.join(',')
        list.map(v => {
          v.url = v.path + v.fileName + '.' + v.suffix
          v.name = v.name + '.' + v.suffix
        })
        // data.fileList.map(item => {
        //   fileIds.push(item.id)
        // })
        data.informType = data.departmentId === -1 ? 0 : 1
        if (!data.informId) {
          data.departmentId = this.$store.state.user.userInfo.departmentId
          data.departmentName = this.$store.state.user.userInfo.departmentName
        }

        data.fileIds = fileIds.join(',')
        data.content = []
        this.fileList = list
        this.formData = data
        // 防止内容过多卡死，缓慢追加内容
        content.forEach((value, index) => {
          setTimeout(function() {
            _this.formData.content.push(value)
          }, 20 * index)
        })
        if (!content.length) {
          this.addChild()
        }
        this.showLoading = false
      })
    },
    addChild(index = 0) {
      const temp = this.formData.content.length && this.formData.content[index || (this.formData.content.length - 1)]
      const item = {
        content: '',
        isTitle: temp.isTitle || 0,
        titleLevel: temp.titleLevel || '',
        order: ''
      }
      if (index !== this.formData.content.length - 1) {
        this.formData.content.splice(index, 0, item)
      } else {
        this.formData.content.push(item)
      }
    },
    // 移除文件
    onRemove(file, fileList) {
      if (fileList.length > 0) {
        this.fileIdArr = []
        fileList.map(item => this.fileIdArr.push(item.raw.fileId))
      }
    },
    // 下载文件
    headleShow(file) {
      console.log(file)
      this.downloadMulti(file.name, file.url)
    },
    // 上传文件
    doUpload(content) {
      const fd = new FormData()
      fd.append('file', content.file)
      fileUpload(fd).then(res => {
        content.file['fileId'] = res.data
        this.fileIdArr.push(res.data)
        console.log(res.data)
      })
    },
    // 文件上传
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
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
