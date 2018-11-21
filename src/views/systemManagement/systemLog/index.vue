<template>
  <div class="public-container">
    <keep-alive>
      <notice-list
        v-if="view==='list'"
        :params-data="paramsData"
        @view="viewCall" />
    </keep-alive>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import NoticeList from './list'

export default {
  name: 'SystemLog',
  components: { NoticeList },
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
