<!--
****--@date     2018-11-30 11:55
****--@author   XXL
****--@describe 部门对话框组件
-->
<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      title="提示"
      width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
/* 当前组件必要引入 */
export default {
  name: 'DepartmentDialog',
  components: {},
  props: { state: {
    type: Boolean,
    default: false
  }},
  data() {
    return {
      dialogVisible: false
    }
  },
  created() {
    this.dialogVisible = this.state
    this.init()
  },
  mounted() {
  },
  methods: {
    // 初始化
    init() {
    }

  }
}

</script>
