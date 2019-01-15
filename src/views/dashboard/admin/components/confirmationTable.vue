<!--
****--@date     2019-01-04 10:21
****--@author   YC
****--@describe 事实确认书
-->
<template>
  <div>
    <h4 class="tableTitle">事实确认书</h4>
    <el-table :data="listData" style="width: 100%;padding-top: 15px;" height="300px">
      <el-table-column show-overflow-tooltip label="项目名称" prop="projectName"/>
      <el-table-column show-overflow-tooltip label="编号" prop="number">
        <template slot-scope="scope">
          {{ scope.row.number || '—' }}
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="回执状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.hasRead ? 'success' : 'danger'"> {{ scope.row.hasRead ? '已' : '未' }}读</el-tag>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="检查结束时间" prop="queryStartTime"/>
      <el-table-column show-overflow-tooltip label="回执时间" prop="hasReadTime">
        <template slot-scope="scope">
          {{ scope.row.hasReadTime || '—' }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { confirmationList } from '@/api/auditManagement'
export default {
  name: 'ConfirmationTable',
  components: {},
  props: {},
  data() {
    return {
      listData: []
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
      this.getListData()
    },
    // 获取数据 搜索
    getListData() {
      confirmationList({ page: { page: 1, size: 5 }, search: {}}).then(res => {
        this.listData = res.data || []
      })
    }
  }
}

</script>
