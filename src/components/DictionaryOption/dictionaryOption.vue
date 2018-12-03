<!--
****--@date     2018-12-03 20:42
****--@author   YC
****--@describe 字典选项
-->
<template>
  <div>
    <el-option
      v-for="(item,index) in dictionaries"
      :key="index"
      :value="item.key"
      :label="item.value" />
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { dictGet } from '@/api/systemManagement'

export default {
  name: 'DictionaryOption',
  components: {},
  props: {
    id: {
      type: [String, Number],
      default: -1
    },
    optionData: {
      type: [Array],
      default: () => ([])
    }
  },
  data() {
    return {
      dictionaries: []
    }
  },
  watch: {
    optionData() {
      this.init()
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
      if (this.optionData.length) {
        this.dictionaries = this.optionData
      } else {
        this.getSeleteDict()
      }
    },
    // 获取字典类型
    getSeleteDict() {
      dictGet({ id: this.id }).then(res => {
        this.dictionaries = res.data.dictionaries || []
      })
    }
  }
}

</script>
