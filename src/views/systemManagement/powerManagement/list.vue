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
              @click="edit(scope.row)">管理
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
    this.getDictrole()
  },
  mounted() {
  },
  activated() {
    this.getDictrole()
  },
  methods: {
    // 初始化
    init() {
      // 鉴权
      this.getAuthorEdit(this.$route)
    },
    // 获取角色字典
    getDictrole() {
      dictGet({ id: -2 }).then(res => {
        console.log(res)
        this.tableData = res.data.dictionaries
      })
    },
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
