<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 查看办法
-->
<template>
  <el-card v-loading="showLoading">
    <div slot="header" class="card-header">
      <el-row>
        <el-col :span="20">
          {{ formData.updateTime }}
        </el-col>
        <el-col :span="4" align="right">
          <el-button type="text" @click="backList">返回列表</el-button>
        </el-col>
        <el-col>
          <template v-if="formData.from">
            <h1 align="center" class="managementMethodsFrom">{{ formData.from }}</h1>
            <br>
          </template>
          <h2 align="center">{{ formData.title }}</h2>
          <template v-if="formData.number">
            <br>
            <h3 align="center">{{ formData.number }}</h3>
          </template>
        </el-col>
      </el-row>
    </div>
    <el-row class="managementMethodsShowContent" >
      <el-col
        v-for="(content,index) in formData.content"
        :key="index">
        <template v-if="content.isTitle">
          <h3 v-if="content.titleLevel==='h1'" align="center">
            {{ content.content }}
          </h3>
          <p v-else><b>{{ content.content }}</b></p>
        </template>
        <p v-else>
          {{ content.content }}
        </p>
      </el-col>
      <el-col>
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
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
/* 当前组件必要引入 */
import { clauseGet } from '@/api/organizationalManagement'
export default {
  name: 'MMShow',
  components: {},
  props: {
    paramsData: {
      type: [Object],
      required: false,
      default: null
    }
  },
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
      clauseGet({ id: this.paramsData.id }).then(res => {
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
