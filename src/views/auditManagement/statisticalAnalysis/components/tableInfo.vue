<!--
****--@date     2019-01-15 18:16
****--@author   YC
****--@describe 表格信息
-->
<template>
  <el-table
    :data="listData"
    :cell-style="cellStyle"
    height="100%"
    @cell-click="cellClick">
    <el-table-column
      prop="projectName"
      show-overflow-tooltip
      label="项目名称" />
    <el-table-column
      prop="programmeTitle"
      show-overflow-tooltip
      label="方案" />
    <el-table-column
      prop="number"
      show-overflow-tooltip
      label="编号" />
    <el-table-column
      prop="startTime"
      show-overflow-tooltip
      label="开始时间"/>
    <el-table-column
      prop="startTime"
      show-overflow-tooltip
      label="结束时间" />
  </el-table>
</template>
<script>
/* 当前组件必要引入 */
export default {
  name: 'StatisticalAnalysisTable',
  components: {},
  props: {
    listData: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    // 初始化
    init() {
    },
    // 点击查看
    cellClick(row, column, cell, event) {
      if (column.property === 'projectName') {
        console.log(row)
        this.publishSubscribe('show', row)
      } else {
        return ''
      }
    },
    // 向父组件传递信息
    publishSubscribe(type, obj) {
      this.$emit('view', type, obj)
    },
    // 设置单元格style
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return 'color:#409EFF;cursor: pointer;'
      } else {
        return ''
      }
    }
  }
}
</script>
