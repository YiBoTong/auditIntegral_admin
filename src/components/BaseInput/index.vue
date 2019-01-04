<template>
  <current-input v-if="isEdit" v-bind="$attrs" :value="value" v-on="$listeners">
    <slot/>
  </current-input>
  <div v-else>{{ value }}</div>
</template>

<script>
import CurrentInput from './CurrentInput'

export default {
  components: { CurrentInput },
  props: {
    isEdit: {
      type: Boolean,
      default: true
    },
    value: {
      type: [String, Number],
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  $text-black: #363434;
  $base-blue: #409EFF;
  .record {
  white-space: nowrap;
  color: $text-black;
  font-size: 12px;
  margin-top: 6px;
  line-height: 1.2em;
  .length {
    color: $base-blue;
  }
}
</style>

