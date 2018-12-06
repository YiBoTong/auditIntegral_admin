<!--
****--@date     2018-12-03 21:55
****--@author   XXL
****--@describe 权限管理
-->
<template>
  <div class="public-container">
    <keep-alive>
      <index-list
        v-if="view==='list'"
        :params-data="paramsData"
        @view="viewCall" />
    </keep-alive>
    <index-input
      v-if="view==='input'"
      :params-data="paramsData"
      @view="viewCall" />
  </div>
</template>
<script>
/* 当前组件必要引入 */
import IndexList from './list'
import IndexInput from './input'
// import NoticeView from './show'

export default {
  name: 'PowerManagement',
  components: { IndexList, IndexInput },
  // props: [],
  data() {
    return {
      view: 'list',
      paramsData: ''
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
    },
    // 接受子组件传递过来的信息
    viewCall(view, data) {
      this.view = view
      this.paramsData = data
    }
  }
}
</script>
