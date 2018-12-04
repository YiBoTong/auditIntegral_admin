<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 人员管理
-->
<template>
  <div class="public-container">
    <keep-alive>
      <index-list
        v-if="view==='list'"
        @view="viewCall"/>
    </keep-alive>
    <index-input
      v-if="view==='input'"
      :params-data="paramsData"
      @view="viewCall" />
    <index-view
      v-if="view==='show'"
      :params-data="paramsData"
      @view="viewCall" />
  </div>
</template>

<script>
/* 当前组件必要引入 */
import IndexInput from './input'
import IndexList from './list'
import IndexView from './show'

export default {
  name: 'PersonnelManagement',
  components: { IndexView, IndexInput, IndexList },
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
    init: function() {
    },
    // 接受子组件传递过来的信息
    viewCall(view, data) {
      console.log(data)
      this.view = view
      this.paramsData = data
    }
  }
}

</script>
