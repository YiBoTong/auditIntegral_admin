<!--
****--@date     2019-01-04 10:21
****--@author   YC
****--@describe 整改通知
-->
<template>
  <div>
    <h4 class="tableTitle">整改通知</h4>
    <el-table :data="listData" style="width: 100%;padding-top: 15px;" height="300px">
      <el-table-column show-overflow-tooltip label="项目名称" prop="projectName"/>
      <el-table-column show-overflow-tooltip label="检查单位" prop="number"/>
      <el-table-column show-overflow-tooltip label="被查单位" prop="number"/>
      <el-table-column show-overflow-tooltip label="整改报告" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.rectifyReportId ? 'success' : 'danger'"> {{ (scope.row.rectifyReportId > 0 ? '已' : '未') }}填写</el-tag>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="检查结束时间" prop="queryStartTime"/>
      <el-table-column show-overflow-tooltip label="填写时间" prop="updateTime">
        <template slot-scope="scope">
          {{ scope.row.rectifyReportId ? (scope.row.hasReadTime || '—') : "—" }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { rectifyList } from '@/api/auditManagement'
export default {
  name: 'RectifyNoticeTable',
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
      rectifyList({ page: { page: 1, size: 5 }, search: {}}).then(res => {
        this.listData = res.data || []
      })
    }
  }
}

</script>
