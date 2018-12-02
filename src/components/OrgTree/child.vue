<!--
****--@date     2018-12-01 10:07
****--@author   YC
****--@describe 部门树子节点
-->
<template>
  <ul>
    <li v-for="child in children" :key="child.id">
      <tree-folder v-if="child.children" :folder="child"/>
      <span v-else>{{ child.name }}</span>
    </li>
  </ul>
</template>
<script>
/* 当前组件必要引入 */
export default {
  name: 'OrgTreeChild',
  components: {},
  props: {
    children: {
      type: Array,
      default: () => ([])
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
