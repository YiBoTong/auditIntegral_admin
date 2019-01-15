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
      prop="userName"
      show-overflow-tooltip
      label="姓名" />
    <el-table-column
      prop="sex"
      show-overflow-tooltip
      label="性别" >
      <template slot-scope="scope">{{ (scope.row.sex !== undefined ? scope.row.sex : '—').toString() | userChange }}</template>
    </el-table-column>
    <el-table-column
      prop="role"
      show-overflow-tooltip
      label="职务（岗位）" />
    <el-table-column
      prop="money"
      show-overflow-tooltip
      label="罚款">
      <template slot-scope="scope">{{ scope.row.money | numberConvert }}</template>
    </el-table-column>
    <el-table-column
      prop="score"
      show-overflow-tooltip
      label="积分" >
      <template slot-scope="scope">{{ scope.row.score | numberConvert }}</template>
    </el-table-column>
    <el-table-column
      prop="departmentName"
      show-overflow-tooltip
      label="所属网点（部门）" />
    <el-table-column
      prop="title"
      show-overflow-tooltip
      label="处罚依据">
      <template slot-scope="scope">{{ getTitleCall(scope.row) }}</template>
    </el-table-column>
    <el-table-column
      prop="punishDepartmentName"
      show-overflow-tooltip
      label="处罚部门" />
  </el-table>
</template>
<script>
/* 当前组件必要引入 */
export default {
  name: 'StatisticalDetailedTable',
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
    getTitleCall(row) {
      let title = '—'
      if (row.title) {
        title = `《${row.title}》`
        if (row.number) {
          title += `（${row.number}）`
        }
      }
      return title
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
      if (columnIndex === -1) {
        return 'color:#409EFF;cursor: pointer;'
      } else {
        return ''
      }
    }
  }
}
</script>
