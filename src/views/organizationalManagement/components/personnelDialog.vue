<!--
****--@date     2018-12-01 10:04
****--@author   YC
****--@describe 选择人员对话框
-->
<template>
  <div>
    <el-dialog
      :visible="visible"
      :title="title"
      :width="width"
      :before-close="headleClose"
      close-on-press-escape
      @closed="headleClosed"
    >
      <el-table/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="headleClose">取 消</el-button>
        <el-button type="primary" @click="headleClosed">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
/* 当前组件必要引入 */
export default {
  name: 'PersonnelDialog',
  components: {},
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
    return {}
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
    // dialog 关闭动画结束时的回调
    headleClosed() {
      // this.$emit('closed')
    }
  }
}

</script>
