<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    showData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    getShowData() {
      const data = []
      const rows = [];
      (this.showData || []).map(item => {
        data.push(item.content)
        rows.push({ value: item.sum, name: item.content })
      })
      return { data, rows }
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      const { data, rows } = this.getShowData()

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          // data: ['违规行为1', '违规行为2', '违规行为3', '违规行为4', '违规行为5']
          data
        },
        calculable: true,
        series: [
          {
            name: '违规行为TOP5',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            // data: [
            //   { value: 320, name: '违规行为1' },
            //   { value: 240, name: '违规行为2' },
            //   { value: 149, name: '违规行为3' },
            //   { value: 100, name: '违规行为4' },
            //   { value: 59, name: '违规行为5' }
            // ],
            data: rows,
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
