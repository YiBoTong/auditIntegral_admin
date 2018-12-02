<!--
****--@date     2018-11-30 16:18
****--@author   YC
****--@describe 树节点
-->
<template>
  <p>
    <span>{{ org.name }}</span>
    <org-tree-child :children="org.children"/>
  </p>
</template>
<script>
/* 当前组件必要引入 */
import OrgTreeChild from './child'
export default {
  name: 'OrgTreeItem',
  components: { OrgTreeChild },
  props: {
    org: {
      type: Object,
      default: () => ({
        name: '',
        children: []
      })
    }
  },
  data() {
    return {}
  },
  created() {
    this.init()
  },
  mounted() {
  },
  methods: {
    // 初始化
    init() {
    }

  }
}

</script>
