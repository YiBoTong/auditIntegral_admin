<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 查看部门
-->
<template>
  <div class="show-container">
    <div class="show-header">
      <div class="header-left">
        <el-button @click="backList">返回列表</el-button>
      </div>
    </div>
    <el-form
      :model="formData"
      label-width="120px" />
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { orgGet } from '@/api/organizationalManagement'
export default {
  name: 'NoticeShow',
  components: {},
  props: {
    paramsData: {
      type: [Object, String, Array],
      required: false,
      default: ''
    }
  },
  data() {
    return {
      formData: {}
    }
  },
  created() {
    this.init()
  },
  mounted() { },
  methods: {
    // 初始化
    init() {
      // 获取机构
      orgGet().then(res => {

      })
    },
    // 返回列表
    backList() {
      this.$emit('view', 'list')
    }
  }
}

</script>
