<!--
****--@date     2018-12-07 17:07
****--@author   YC
****--@describe 部门管理布局文件
-->
<template>
  <div class="orgLayout">
    <div class="olLeft">
      <slot name="left"/>
    </div>
    <div class="olRight">
      <slot name="right"/>
    </div>
  </div>
</template>
<script>
/* 当前组件必要引入 */
export default {
  name: 'OrgLayout',
  components: {},
  props: {},
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
