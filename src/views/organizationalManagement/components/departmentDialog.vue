<!--
****--@date     2018-11-30 11:55
****--@author   XXL
****--@describe 部门对话框组件
-->
<template>
  <div class="department-dialog-container">
    <el-dialog
      :visible="visible"
      :title="title"
      :width="width"
      :before-close="headleClose"
      close-on-press-escape>
      <org-tree class="org-tree" @click="departmentClick"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="headleClose">取 消</el-button>
        <el-button type="primary" @click="headleClosed">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import OrgLayout from '@/components/OrgLayout/index'
import OrgTree from '@/components/OrgTree/index'
export default {
  name: 'DepartmentDialog',
  components: { OrgLayout, OrgTree },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '600px'
    }
  },
  data() {
    return {
      department: ''
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
    },
    // 关闭对话的回调
    headleClose() {
      this.$emit('update:visible', false)
    },
    // 点击确定
    headleClosed() {
      console.log(this.department)
      if (this.department) {
        this.$emit('yes', this.department)
        this.$emit('update:visible', false)
      } else {
        this.$message({
          type: 'error',
          message: '请选择部门！'
        })
      }
    },
    // 点击树
    departmentClick(data) {
      this.department = data
    }
  }
}

</script>

<style lang="scss">
  .department-dialog-container{
    .org-tree {
      min-height: calc(100vh - 400px);
      height: calc( 100vh - 500px );
    }
  }
</style>
