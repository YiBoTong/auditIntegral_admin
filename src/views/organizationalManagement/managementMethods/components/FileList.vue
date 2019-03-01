<!--
****--@date     2019-02-28 15:11
****--@author   XXL
****--@describe 文件列表
-->
<template>
  <div>
    <el-table
      :data="[{ name: '文件1', date: '2016-05-02'}, { name: '文件2', date: '2016-05-04'},{name: '文件3', date: '2016-05-02'}, { name: '文件4', date: '2016-05-04' }]"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="文件名"
      />
      <el-table-column
        prop="date"
        label="创建日期"
      />
      <el-table-column
        label="操作"
        align="center"
        width="120">
        <template slot-scope="scope">
          <el-button type="text" @click="handleSeeFile">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
/* 当前组件必要引入 */
export default {
  name: 'FileList',
  components: {},
  // props: {},
  data() {
    return {}
  },
  // computed: {},
  // watch: {},
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    // 初始化
    init() {
    },
    handleSeeFile() {
      this.selectRoute('managementMethods', 'file')
    }
  }
}
</script>
