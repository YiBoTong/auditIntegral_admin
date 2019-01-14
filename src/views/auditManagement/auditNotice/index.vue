<!--
****--@date     2019-01-14 15:17
****--@author   XXL
****--@describe 审计报告
-->
<template>
  <div class="public-container">
    <keep-alive>
      <index-list
        v-if="view==='list'"
        :params-data="paramsData"
        @view="viewCall" />
    </keep-alive>
    <index-show
      v-if="view==='show'"
      :params-data="paramsData"
      @view="viewCall" />
  </div>
</template>
<script>
/* 当前组件必要引入 */
import IndexList from './list'
import IndexShow from './show'

export default {
  name: 'AuditNoticeIndex',
  components: { IndexList, IndexShow },
  // props: {},
  data() {
    return {
      view: 'list',
      paramsData: ''
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
    },
    // 选择显示子组件
    viewCall(view, data) {
      this.view = view
      this.paramsData = data
    }
  }
}
</script>

