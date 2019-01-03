<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 添加 or 编辑
-->
<template>
  <div class="report-container">
    <div class="report-header">
      <div class="header-left">
        <el-button @click="backList">返回列表</el-button>
      </div>
    </div>
    <el-card>
      <div slot="header" class="card-header">
        <span>报告内容</span>
      </div>
      <div class="text-content">
        <tinymce
          :height="300"
          v-model="formData.content"/>
      </div>
      <br>
      <span>相关文件</span>
      <hr>
      <br>
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

export default {
  name: 'RectifyNoticeReport',
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
      content: '',
      todoType: '',
      fileList: [],
      visible: false,
      showCheckbox: true,
      width: '',
      title: '',
      formData: {
        'departmentId': '57',
        'title': '',
        'content': '',
        'depName': '',
        'range': 1,
        'informIds': '',
        'informName': '全部部门',
        'fileIds': '',
        'state': 'draft'
      },
      fileIdArr: []
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
      // const data = this.paramsData
    },
    // 返回列表
    backList() {
      this.$emit('view', 'list')
    },
    // 获取通知
    // getNotice() {
    //   console.log(this.paramsData)
    //   noticeGet({ id: this.paramsData.id }).then(res => {
    //     if (!res.status.error) {
    //       this.formData = res.data
    //       console.log(res)
    //       const list = res.data.fileList || []
    //       console.log(this.formData.fileIds)
    //       list.map(v => {
    //         console.log(v)
    //         v.url = v.path + v.fileName + '.' + v.suffix
    //         v.name = v.name + '.' + v.suffix
    //       })
    //       this.fileList = list
    //       console.log(this.fileList)
    //     } else {
    //       this.$message({
    //         type: 'error',
    //         message: res.status.msg + '!'
    //       })
    //     }
    //   })
    // },
    // 上传文件
    // 下载文件
    headleShow(file) {
      console.log(file)
      this.downloadMulti(file.name, file.url)
    }
  }
}
</script>
