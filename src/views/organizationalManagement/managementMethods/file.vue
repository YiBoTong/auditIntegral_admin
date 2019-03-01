<!--
****--@date     2019-02-28 15:45
****--@author   XXL
****--@describe 显示pdf文件
-->
<template>
  <el-card>
    <div slot="header" class="card-header">
      <el-row>
        <el-col :span="20" align="left">
          <el-button type="text" disabled>查看PDF文件</el-button>
        </el-col>
        <el-col :span="4" align="right">
          <el-button type="text" @click="goBack()">返回文件列表</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="file-pdf" >
      <vue-pdf />
    </div>
  </el-card>
</template>
<script>
/* 当前组件必要引入 */
import VuePdf from '@/components/VuePdf/index'
export default {
  name: 'ShowFile',
  components: { VuePdf },
  // props: {},
  data() {
    return {
      // width: '300px',
      // height: '500px'
    }
  },
  // computed: {},
  // watch: {},
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    // 初始化
    init() {
    },
    // 返回上一步 即回到文件列表
    goBack() {
      history.go(-1)
    }
  }
}
</script>
