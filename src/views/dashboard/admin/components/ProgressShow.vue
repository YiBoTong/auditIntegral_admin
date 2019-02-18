<!--
****--@date     2019-02-18 11:23
****--@author   XXL
****--@describe 进展显示
-->
<template>
  <div>
    <el-steps :active="1" simple style="margin-bottom: 30px;background-color: #FFFFFF">
      <el-step title="进度 1" icon="el-icon-edit"/>
      <el-step title="进度 2" icon="el-icon-upload"/>
      <el-step title="进度 3" icon="el-icon-picture"/>
    </el-steps>
  </div>
</template>
<script>
/* 当前组件必要引入 */
export default {
  name: 'ProgressShow',
  components: {},
  // props: {},
  data() {
    return {}
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
    }
  }
}
</script>
