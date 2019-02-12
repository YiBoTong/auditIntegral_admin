<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 字典管理
-->
<template>
  <div class="public-container">
    <keep-alive>
      <index-list
        v-if="view==='list'"/>
    </keep-alive>
    <router-view v-if="'list'!==view"/>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import IndexInput from './input'
import IndexList from './list'
import IndexView from './show'

export default {
  name: 'DictionaryManagement',
  components: { IndexView, IndexInput, IndexList },
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
    init() {
      if (this.$route.name !== 'dictionaryManagement') {
        this.view = ''
      }
    }
  }
}

</script>
