<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 查看通知
-->
<template>
  <div class="notice-input-container">
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
        <span>{{ todoType | typeText }}通知</span>
      </div>
      <el-form
        ref="refForm"
        :model="formData"
        label-width="100px"
        class="department-form">
        <el-form-item
          label="公告标题"
          prop="title">
          <el-input
            v-model="formData.title"
            type="text"
            clearable />
        </el-form-item>
        <el-form-item
          label="通知范围"
          prop="range">
          <el-select
            v-model="formData.range"
            placeholder="请选择范围">
            <el-option
              v-for="item in range"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header" class="card-header">
        <span>通知内容</span>
      </div>
      <div v-html="formData.content"/>
    </el-card>
    <el-card>
      <div slot="header" class="card-header">
        <span>相关文件</span>
      </div>
      <div class="public-upload">
        <el-upload
          ref="upload"
          :limit="10"
          :file-list="fileList"
          class="upload"
          action=""
          multiple
          disabled/>
      </div>
    </el-card>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import Tinymce from '@/components/Tinymce/index'
import { noticeGet } from '@/api/organizationalManagement'
export default {
  name: 'NoticeInput',
  components: { Tinymce },
  props: {
    paramsData: {
      type: [Object, String, Array],
      required: false,
      default: ''
    }
  },
  data() {
    return {
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
      content: '',
      todoType: 'Add',
      formData: {
        title: '',
        content: '',
        range: '',
        inform_id: '',
        fileIds: ''
      },
      range: [{
        value: '0',
        label: '全部部门'
      }, {
        value: '1',
        label: '指定部门'
      }]
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
        this.addNotice()
      } else {
        this.todoType = 'Edit'
        this.getNotice()
      }
    },
    // 获取通知
    getNotice() {
      console.log(this.paramsData)
      noticeGet({ id: this.paramsData.id }).then(res => {
        if (!res.status.error) {
          this.formData = res.data
          console.log(res)
          const list = res.data.fileList || []
          console.log(this.formData.fileIds)
          list.map(v => {
            console.log(v)
            v.url = v.path + v.fileName + '.' + v.suffix
            v.name = v.name + '.' + v.suffix
          })
          this.fileList = list
          console.log(this.fileList)
        } else {
          this.$message({
            type: 'error',
            message: res.status.msg + '!'
          })
        }
      })
    },
    // 返回列表
    backList() {
      this.$emit('view', 'list')
    }
  }
}

</script>
