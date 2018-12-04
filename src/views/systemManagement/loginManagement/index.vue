<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 登录管理
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
import IndexInput from './input'
import IndexList from './list'

export default {
  name: 'LoginManagement',
  components: { IndexInput, IndexList },
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
