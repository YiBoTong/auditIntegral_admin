<!--
****--@date     2018-11-12 14:04
****--@author   XXL
****--@describe 字典管理
-->
<template>
  <div class="show-container">
    <div class="show-header">
      <div class="header-left">
        <el-button @click="backList">返回列表</el-button>
      </div>
    </div>
    <el-form :model="formData" label-width="100px">
      <el-form-item label="标题:" prop="title">
        <div>{{formData.title}}</div>
      </el-form-item>
      <el-form-item label="发布范围:">
        <div>{{formData.notificationScope}}</div>
      </el-form-item>
      <el-form-item label="状态:">
        <div>{{formData.state}}</div>
      </el-form-item>
      <el-form-item label="最后操作时间:" prop="finalOperationTime">
        <div>{{formData.finalOperationTime}}</div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  /* 当前组件必要引入 */
  export default {
    name: 'dictionaryManagementShow',
    props: {
      paramsData: Object
    },
    data () {
      return {
        formData: {
          title: '',
          notificationScope: ''
        }
      };
    },
    methods: {
      // 初始化
      init () {
      },
      // 返回列表
      backList () {
        this.$emit('view', 'list');
      }
    },
    created () {
      this.init();
    },
    mounted () {
      if (this.paramsData) this.formData = this.paramsData;
      console.log(this.formData);
    },
    components: {}
  };

</script>
