<!--
****--@date     2019-01-03 14:26
****--@author   XXL
****--@describe 审计报告
-->
<template>
  <div class="public-container">
    <keep-alive>
      <index-list
        v-if="view==='list'"/>
    </keep-alive>
    <router-view v-if="view!=='list'"/>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import IndexList from './list'

export default {
  name: 'AuditReports',
  components: { IndexList },
  // props: [],
  data() {
    return {
      view: 'list'
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
      if (this.$route.name !== 'auditReport') {
        this.view = ''
      }
    }
  }
}
</script>
