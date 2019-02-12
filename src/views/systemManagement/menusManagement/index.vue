<!--
****--@date     2018-12-03 21:48
****--@author   XXL
****--@describe 菜单管理
-->
<template>
  <div class="public-container">
    <keep-alive>
      <index-list
        v-if="view==='list'"/>
    </keep-alive>
  </div>
</template>

<script>
/* 当前组件必要引入 */
import indexList from './list'
export default {
  name: 'MenusManagement',
  components: { indexList },
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
    }
  }
}
</script>
