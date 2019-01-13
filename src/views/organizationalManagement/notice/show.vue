<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 查看通知
-->
<template>
  <el-card v-loading="showLoading">
    <div slot="header" class="card-header">
      <el-row>
        <el-col :span="12">
          <el-button type="text">查看通知</el-button>
        </el-col>
        <el-col :span="12" align="right">
          <el-button type="text" @click="backList">返回列表</el-button>
        </el-col>
      </el-row>
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
            {{ (formData.range == 2 ? formData.departmentName : formData.range) | rangeText }}
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
    <hr>
    <br>
    <h4>通知内容</h4>
    <br>
    <html-content :content="formData.content"/>
    <br>
    <hr>
    <br>
    <h4>相关附件</h4>
    <div class="public-upload">
      <el-upload
        v-if="fileList.length > 0"
        ref="upload"
        :limit="10"
        :file-list="fileList"
        :on-preview="headleShow"
        class="upload"
        action=""
        disabled />
      <div v-else>
        <br>
        <span>暂无附件</span>
      </div>
    </div>
  </el-card>
</template>
<script>
/* 当前组件必要引入 */
import { noticeGet } from '@/api/organizationalManagement'
import HtmlContent from '../../../components/HtmlContent/htmlContent'
export default {
  name: 'NoticeInput',
  components: { HtmlContent },
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
      noticeGet({ id: this.paramsData.id }).then(res => {
        if (!res.status.error) {
          this.formData = res.data
          const list = res.data.fileList || []
          list.map(v => {
            console.log(v)
            v.url = v.path + v.fileName + '.' + v.suffix
            v.name = v.name + '.' + v.suffix
          })
          this.fileList = list
        } else {
          this.$message({
            type: 'error',
            message: res.status.msg + '!'
          })
        }
        this.showLoading = false
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
