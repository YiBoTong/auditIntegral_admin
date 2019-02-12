<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 通知管理
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
  name: 'Index',
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
    init: function() {
      if (this.$route.name !== 'notice') {
        this.view = ''
      }
    }
  }
}

</script>
