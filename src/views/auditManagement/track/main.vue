<!--
****--@date     2019-01-11 11:50
****--@author   XXL
****--@describe 后续检查
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
  name: 'TrackIndex',
  components: { IndexList },
  // props: {},
  data() {
    return {
      view: 'list'
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
      if (this.$route.name !== 'track') {
        this.view = ''
      }
    }
  }
}
</script>
