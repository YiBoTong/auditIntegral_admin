<!--
****--@date     2019-02-28 15:47
****--@author   XXL
****--@describe 封装的显示pdf的插件
-->
<template>
  <div :style="style" class="pdf-container">
    <pdf :src="pdfUrl"/>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
export default {
  name: 'VuePdf',
  components: { pdf },
  props: {
    url: {
      type: String,
      default: null
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {
      pdfUrl: 'http://image.cache.timepack.cn/nodejs.pdf'
    }
  },
  computed: {
    style() {
      const style = {}
      if (this.width) {
        style.width = this.width
      }
      if (this.height) {
        style.height = this.height
      }
      return style
    }
  }
}
</script>
