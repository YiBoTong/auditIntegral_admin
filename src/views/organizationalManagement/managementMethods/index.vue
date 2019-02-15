<!--
****--@date     2018-11-30 10:15
****--@author   YC
****--@describe 相关文件
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
  name: 'MMIndex',
  components: { IndexList },
  // props: [],
  data() {
    return {
      view: 'list',
      paramsData: null
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
      if (this.$route.name !== 'managementMethods') {
        this.view = ''
      }
    }
  }
}

</script>
