<!--
****--@date     2018-12-07 10:55
****--@author   YC
****--@describe html内容
-->
<template>
  <div class="htmlContent" v-html="content"/>
</template>
<script>
/* 当前组件必要引入 */
export default {
  name: 'HtmlContent',
  components: {},
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  created() {
    this.init()
  },
  mounted() {
  },
  methods: {
    // 初始化
    init() {
    }

  }
}

</script>
