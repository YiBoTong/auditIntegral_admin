<!--
****--@date     2018-11-30 10:15
****--@author   YC
****--@describe 管理办法
-->
<template>
  <div class="public-container">
    <keep-alive>
      <index-list
        v-if="view==='list'"
        :params-data="paramsData"
        @view="viewCall"
      />
    </keep-alive>
    <index-input
      v-if="view==='input'"
      :params-data="paramsData"
      @view="viewCall"
    />
    <index-show
      v-if="view==='show'"
      :params-data="paramsData"
      @view="viewCall"
    />
  </div>
</template>
<script>
import IndexInput from './input'
/* 当前组件必要引入 */
import IndexList from './list'
import IndexShow from './show'
export default {
  name: 'MMIndex',
  components: { IndexShow, IndexInput, IndexList },
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
    },
    // 接受子组件传递过来的信息
    viewCall(view, data) {
      this.view = view
      this.paramsData = data
    }
  }
}

</script>
