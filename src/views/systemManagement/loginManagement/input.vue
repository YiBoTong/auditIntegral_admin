<!--
****--@date     2018-11-12 14:03
****--@author   XXL
****--@describe 通知公告编辑
-->
<template>
  <div class="form-container">
    <div v-if="paramsData == null">
      <div class="form-header">
        <div class="header-left">
          <el-button @click="backList">返回列表</el-button>
        </div>
        <div class="header-right">
          <el-button type="primary" @click="submitForm(formData)">创建</el-button>
          <el-button @click="resetForm('refForm')">重置</el-button>
        </div>
      </div>
      <el-form :model="formData" ref="refForm" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input type="text" v-model="formData.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="发布范围" prop="notificationScope">
          <el-input type="text" v-model="formData.notificationScope" clearable></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div v-else>
      <div class="form-header">
        <div class="header-left">
          <el-button @click="backList">返回列表</el-button>
        </div>
        <div class="header-right">
          <el-button type="primary" @click="submitForm(formData)">修改</el-button>
          <el-button @click="resetForm('refForm')">重置</el-button>
        </div>
      </div>
      <el-form :model="formData" ref="refForm" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input type="text" v-model="formData.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="发布范围" prop="notificationScope">
          <el-input type="text" v-model="formData.notificationScope" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-input type="text" v-model="formData.state" clearable></el-input>
        </el-form-item>
        <el-form-item label="最后操作时间" prop="finalOperationTime">
          <el-input type="text" v-model="formData.finalOperationTime" clearable></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  /* 当前组件必要引入 */
  export default {
    name: 'loginManagementInput',
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
      },
      // 重置表单
      resetForm (formName) {
        this.$refs[formName].resetFields();
      },
      // 提交表单
      submitForm (data) {
        console.log(data);
      }
    },
    created () {
      this.init();
    },
    mounted () {
      if (this.paramsData) {
        let data = JSON.parse(JSON.stringify(this.paramsData));
        this.formData = data;
      } else {
        return '';
      }
    },
    components: {}
  };

</script>
