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
import IndexList from './list'
export default {
  name: 'SystemLog',
  components: { IndexList },
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
    init() {}
  }
}
</script>
