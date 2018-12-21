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
      <org-tree :show-checkbox="showCheckbox" class="org-tree" @click="departmentClick" @checkChange="departmentClickChange"/>
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
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    selectOne: { // 单多选（默认多选）
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      departments: [],
      selectDep: {}
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
    getSelctDep() {
      const temp = []
      Object.keys(this.selectDep).map(id => temp.push(this.selectDep[id]))
      this.departments = temp
    },
    // 点击确定
    headleClosed() {
      this.getSelctDep()
      const len = this.departments.length
      let msg = '';
      (!len) && (msg = '请选择部门!');
      (!msg && this.selectOne && len !== 1) && (msg = '只能选择一个部门!')
      if (msg) {
        this.$message({
          type: 'success',
          message: msg
        })
      } else {
        this.$emit('select', this.selectOne ? this.departments[0] : this.departments)
        this.$emit('update:visible', false)
      }
    },
    // 点击树
    departmentClick(data) {
      this.department = data
    },
    // 复选部门
    departmentClickChange(data, checked, indeterminate) {
      // if (checked) {
      //   this.departments.push(data)
      // } else {
      //   this.departments.filter(item => {
      //     item.id !== data.id
      //   })
      // }
      if (!this.selectDep[data.id]) {
        this.selectDep[data.id] = data
      }
      if (!checked) {
        delete this.selectDep[data.id]
      }
      console.log(data)
      console.log(checked)
      console.log(indeterminate)
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
