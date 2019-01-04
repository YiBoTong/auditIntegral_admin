<template>
  <div v-if="$attrs.type === 'textarea'">
    <el-input
      ref="textarea"
      v-bind="$attrs"
      :value="nativeInputValue"
      :maxlength="currentMaxlength"
      @input="setLength"
      v-on="$listeners"
    />
    <div class="record">
      <span class="length">{{ valueLength }}</span>
      / {{ currentMaxlength }}
    </div>
  </div>
  <el-input
    v-else
    v-bind="$attrs"
    :value="nativeInputValue"
    :maxlength="currentMaxlength"
    v-on="$listeners"
  >
    <slot slot="append"/>
  </el-input>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    maxlength: {
      type: Number,
      default: 50
    },
    tag: {
      type: String,
      default: ''
    },
    isEdit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      valueLength: '',
      nativeInputValue: ''
    }
  },
  computed: {
    currentEdit() {
      return this.isEdit
    },
    currentMaxlength() {
      let maxlength

      switch (this.tag) {
        case 'name':
        case 'password':
          maxlength = 20
          break

        case 'employee':
          maxlength = 10
          break

        case 'IDCard':
          maxlength = 18
          break

        case 'phone':
          maxlength = 11
          break

        default:
          maxlength = this.maxlength
          break
      }

      return maxlength
    }
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(val) {
        this.nativeInputValue = val
        if (this.$refs.textarea && !val) this.valueLength = 0
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setLength()
    })
  },
  methods: {
    setLength(val) {
      if (this.$refs.textarea) {
        this.valueLength = val ? val.length : 0
      }
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

