<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 查看文件
-->
<template>
  <el-card v-loading="showLoading">
    <div slot="header" class="card-header">
      <el-row>
        <el-col :span="20" align="left">
          <el-button type="text" disabled>文件列表</el-button>
        </el-col>
        <el-col :span="4" align="right">
          <el-button type="text" @click="backList('managementMethods')">返回列表</el-button>
        </el-col>
      </el-row>
    </div>
    <el-row class="file-list" >
      <file-list/>
    </el-row>
  </el-card>
</template>
<script>
/* 当前组件必要引入 */
import { clauseGet } from '@/api/organizationalManagement'
import FileList from './components/FileList'
export default {
  name: 'MMShow',
  components: { FileList },
  // props: {},
  data() {
    return {
      fileList: [],
      formData: {
        from: '',
        number: '',
        title: '',
        departmentId: '',
        titleLevel: '',
        isTitle: '',
        fileIds: '',
        content: []
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
      const { id } = this.$route.params
      this.getFileData(id)
    },
    getFileData(id) {
      clauseGet({ id }).then(res => {
        if (!res.status.error) {
          const list = res.data.fileList || []
          console.log(this.formData.fileIds)
          list.map(v => {
            console.log(v)
            v.url = v.path + v.fileName + '.' + v.suffix
            v.name = v.name + '.' + v.suffix
          })
          this.fileList = list
          this.formData = res.data
        } else {
          this.$message({
            type: 'error',
            message: res.status.msg + '!'
          })
        }
        this.showLoading = false
      })
    },
    // 下载文件
    headleShow(file) {
      this.downloadMulti(file.name, file.url)
    }
  }
}

</script>
