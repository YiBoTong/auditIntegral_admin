<template>
  <el-button v-bind="currentConfig" v-on="$listeners">
    <slot/>
  </el-button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    tag: {
      type: String,
      default: ''
    }
  },
  computed: {
    currentConfig() {
      return this.tag === 'table' ? {
        ...this.$attrs,
        type: 'text',
        size: 'medium'
      } : { ...this.$attrs, type: this.type }
    }
  }
}
</script>
