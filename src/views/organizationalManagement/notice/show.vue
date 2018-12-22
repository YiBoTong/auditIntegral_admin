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
    </div>
    <el-card>
      <div slot="header" class="card-header">
        <span>{{ todoType | typeText }}通知</span>
      </div>
      <el-row>
        <el-form
          ref="refForm"
          :model="formData"
          label-width="100px"
          class="department-form">
          <el-col
            :xs="{span: 24}"
            :sm="{span: 24}"
            :md="{span: 24}"
            :lg="{span: 24}"
            :xl="{span: 24}">
            <el-form-item
              label="公告标题"
            >
              {{ formData.title }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 8}">
            <el-form-item
              label="通知范围"
            >
              {{ formData.range | rangeText }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 8}">
            <el-form-item
              label="状态"
            >
              {{ formData.state | typeText }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 8}">
            <el-form-item
              label="发布时间"
              prop="range">
              {{ formData.time }}
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
    <el-card>
      <div slot="header" class="card-header">
        <span>通知内容</span>
      </div>
      <html-content :content="formData.content"/>
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
          :on-preview="headleShow"
          class="upload"
          action=""
          disabled/>
      </div>
    </el-card>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import Tinymce from '@/components/Tinymce/index'
import { noticeGet } from '@/api/organizationalManagement'
import HtmlContent from '../../../components/HtmlContent/htmlContent'
export default {
  name: 'NoticeInput',
  components: { HtmlContent, Tinymce },
  props: {
    paramsData: {
      type: [Object, String, Array],
      required: false,
      default: ''
    }
  },
  data() {
    return {
      fileList: [],
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
    },
    // 下载文件
    headleShow(file) {
      this.downloadMulti(file.name, file.url)
    }
  }
}

</script>
