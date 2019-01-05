<!--
****--@date     2019-01-05 14:27
****--@author   YC
****--@describe 表格布局模版
-->
<template>
  <div class="tableLayout">
    <div v-if="hasLeft" class="tlLeft">
      <slot name="left"/>
    </div>
    <div class="tlRight">
      <div v-if="hasTop" class="tlTop">
        <slot name="top"/>
      </div>
      <div ref="tlTable" :style="{height:tlTableHeight+'px'}" :class="[hasPager ? 'hasPager':'']" class="tlTable">
        <slot/>
      </div>
      <div v-if="hasPager" ref="tlPager" class="tlPager" align="right">
        <slot name="pager"/>
      </div>
    </div>
  </div>
</template>
<script>
/* 当前组件必要引入 */
export default {
  name: 'TableLayout',
  components: { },
  props: {
    hasLeft: {
      type: Boolean,
      default: false
    },
    hasTop: {
      type: Boolean,
      default: true
    },
    hasPager: {
      type: Boolean,
      default: true
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      tlTableHeight: 0
    }
  },
  created() {
    this.init()
  },
  mounted() {
    this.$nextTick(function() {
      this.getTlTableHeight()
    })
  },
  methods: {
    // 初始化
    init() {},
    getTlTableHeight() {
      const tlTable = this.$refs.tlTable
      const contentHeight = tlTable.parentNode.offsetHeight
      let tlPagerHeight = 0
      let tableHeight = 0
      if (this.hasPager) {
        tlPagerHeight = this.$refs.tlPager.offsetHeight
      }
      tableHeight = contentHeight - tlPagerHeight - tlTable.offsetTop
      this.tlTableHeight = tableHeight
    }
  }
}

</script>
