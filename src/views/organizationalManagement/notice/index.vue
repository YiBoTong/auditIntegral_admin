<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 通知管理
-->
<template>
  <div class="public-container">
    <keep-alive>
      <notice-list
        v-if="view==='list'"
        :params-data="paramsData"
        @view="viewCall" />
    </keep-alive>
    <notice-input
      v-if="view==='input'"
      :params-data="paramsData"
      @view="viewCall" />
    <notice-view
      v-if="view==='show'"
      :params-data="paramsData"
      @view="viewCall" />
  </div>
</template>

<script>
/* 当前组件必要引入 */
import NoticeInput from './input'
import NoticeList from './list'
import NoticeView from './show'

export default {
  name: 'Notice',
  components: { NoticeView, NoticeInput, NoticeList },
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
