<!--
****--@date     2019-02-18 13:55
****--@author   XXL
****--@describe 添加待办
-->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="card-header">
        <span>添加待办</span>
      </div>
      <div class="card-content">
        <el-form ref="form" :model="todoFormData" :rules="todoRules" label-width="80px">
          <el-form-item label="待办名称" prop="title">
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
      </div>
      <div class="footer">
        <el-button type="primary" @click="handleClick(todoFormData)">保存</el-button>
        <el-button @click="handleClick(null)">返回</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import { todoRules } from '@/utils/rules'
/* 当前组件必要引入 */
export default {
  name: 'AddTodo',
  components: {},
  // props: {},
  data() {
    return {
      todoRules,
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
    handleClick(value) {
      this.$emit('handleClick', value)
    }
  }
}
</script>

<style lang="scss" scoped>
  .card-header{
    span{
      font-size: 20px;
    }
  }
  .footer{
    display: flex;
    justify-content: center;
  }
</style>
