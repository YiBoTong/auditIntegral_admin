<!--
****--@date     2018-11-12 14:03
****--@author   XXL
****--@describe 通知公告编辑
-->
<template>
  <div>
    <el-button @click="backList">返回列表</el-button>
  </div>
</template>
<script>
  /* 当前组件必要引入 */
  export default {
    name: 'noticeInput',
    props: [],
    data () {
      return {};
    },
    methods: {
      // 初始化
      init () {
      },
      backList () {
        this.$emit('view', 'list');
      }

    },
    created () {
      this.init();
    },
    mounted () {
    },
    components: {}
  };

</script>
