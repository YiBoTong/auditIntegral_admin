<!--
****--@date     2018-12-03 21:56
****--@author   XXL
****--@describe 权限list
-->
<template>
  <div class="power-list-container">
    <el-card>
      <div slot="header">
        权限管理
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="100" />
        <el-table-column
          prop="date"
          label="测试" />
        <el-table-column
          prop="name"
          label="测试" />
        <el-table-column
          prop="address"
          label="测试" />
        <el-table-column
          prop="date"
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="edit(scope.row)">管理
            </el-button>
          </template>
      </el-table-column></el-table>
    </el-card>
  </div>
</template>
<script>
/* 当前组件必要引入 */
export default {
  name: 'PowerManagementList',
  components: {},
  // props: [],
  data() {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  created() {
    this.init()
  },
  mounted() {
  },
  activated() {},
  methods: {
    // 初始化
    init() {},
    // 管理
    edit(obj) {
      this.publishSubscribe('input', obj)
    },
    // 向父组件传递信息
    publishSubscribe(type, obj) {
      this.$emit('view', type, obj)
    }
  }
}
</script>
