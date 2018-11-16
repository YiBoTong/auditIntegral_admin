<template>
  <div class="app-container">
    <p class="warn-content">
      {{ $t('guide.description') }}
    </p>
    <el-button icon="el-icon-question"
               type="primary"
               @click.prevent.stop="guide">{{ $t('guide.button') }}</el-button>
  </div>
</template>

<script>
import * as Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import steps from './defineSteps'

export default {
  name: 'Guide',
  data() {
    return {
      driver: null
    }
  },
  mounted() {
    this.driver = new Driver()
  },
  methods: {
    guide() {
      this.driver.defineSteps(steps)
      this.driver.start()
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .el-button {
    margin: 20px 0;
  }
}
</style>

