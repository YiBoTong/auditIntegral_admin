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
        v-loading="tableLoading"
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="100" />
        <el-table-column
          prop="value"
          label="角色"
          show-overflow-tooltip
          align="center"/>
        <el-table-column
          prop="describe"
          label="角色"
          show-overflow-tooltip
          align="center"/>
        <el-table-column
          v-if="authorEdit"
          prop="date"
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="selectRoute('powerManagement','edit',scope.row,scope.row)">管理
            </el-button>
          </template>
      </el-table-column></el-table>
    </el-card>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { dictGet } from '@/api/systemManagement'
export default {
  name: 'PowerManagementList',
  components: {},
  // props: [],
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.init()
    this.getDictRole()
  },
  mounted() {
  },
  activated() {
    this.getDictRole()
  },
  methods: {
    // 初始化
    init() {
      // 鉴权
      this.getAuthorEdit(this.$route)
    },
    // 获取角色字典
    getDictRole() {
      this.tableLoading = true
      dictGet({ id: -2 }).then(res => {
        if (!res.status.error) {
          this.tableData = res.data.dictionaries
        } else {
          this.$message.error(res.status.msg)
        }
        this.tableLoading = false
      })
    }
  }
}
</script>
