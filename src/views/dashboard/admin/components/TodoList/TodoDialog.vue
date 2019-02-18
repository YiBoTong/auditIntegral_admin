<!--
****--@date     2019-02-18 15:50
****--@author   XXL
****--@describe 待办对话框
-->
<template>
  <div>
    <el-dialog
      :visible="visible"
      :width="width"
      :title="title"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="todoFormData" label-width="80px">
        <el-form-item label="待办名称">
          <el-input v-model="todoFormData.title"/>
        </el-form-item>
        <el-form-item label="优先级">
          <el-select v-model="todoFormData.level" placeholder="请选择">
            <el-option
              v-for="v in levelData"
              :key="v.value"
              :lable="v.value"
              :value="v.label"/>
          </el-select>
        </el-form-item>
        <el-form-item label="起止时期">
          <el-date-picker
            v-model="todoFormData.time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"/>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="todoFormData.checked">私人事务</el-checkbox>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <!--<el-button type="primary">确 定</el-button>-->
      </span>
    </el-dialog>
  </div>
</template>
<script>
/* 当前组件必要引入 */
export default {
  name: 'TodoDialog',
  components: {},
  props: {
    width: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    }
    // todoFormData: {
    //   type: Object,
    //   default: null
    // }
  },
  data() {
    return {
      todoFormData: {
        title: '',
        level: '',
        time: '',
        checked: false
      },
      levelData: [
        {
          label: '一般',
          value: '0'
        }, {
          label: '最低',
          value: '1'
        }, {
          label: '较高',
          value: '2'
        }, {
          label: '最高',
          value: '3'
        }]
    }
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
    // 关闭对话框
    handleClose() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
