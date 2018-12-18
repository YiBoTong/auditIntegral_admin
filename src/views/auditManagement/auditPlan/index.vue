<!--
****--@date     2018-12-10 17:48
****--@author   XXL
****--@describe 稽核方案
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
    <index-show
      v-if="view==='show'"
      :params-data="paramsData"
      @view="viewCall" />
  </div>
</template>
<script>
/* 当前组件必要引入 */
import IndexInput from './input'
import IndexList from './list'
import IndexShow from './show'

export default {
  name: 'AuditPlan',
  components: { IndexInput, IndexList, IndexShow },
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
    init: function() {
    },
    // 接受子组件传递过来的信息
    viewCall(view, data) {
      console.log(data)
      this.view = view
      this.paramsData = data
      console.log(typeof this.paramsData)
    }
  }
}

</script>
