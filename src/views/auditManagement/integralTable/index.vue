<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 积分
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
  name: 'IntegralTable',
  components: { IndexView, IndexInput, IndexList },
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
    // 根据子组件传递过来的信息判断进入哪一个子组件 默认为list子组件
    viewCall(view, data) {
      this.view = view
      this.paramsData = data
    }
  }
}

</script>
