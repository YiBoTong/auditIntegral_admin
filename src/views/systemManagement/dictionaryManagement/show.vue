<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 查看字典
-->
<template>
  <div class="show-container">
    <div class="show-header">
      <div class="header-left">
        <el-button @click="backList">返回列表</el-button>
      </div>
    </div>
    <el-form
      :model="formData"
      label-width="120px">
      <el-form-item
        label="类型标题:"
        prop="title">
        <el-input
          v-model="formData.title"
          disabled />
      </el-form-item>
      <el-form-item label="是否启用:">
        <el-input
          v-model="formData.isUse"
          disabled />
      </el-form-item>
      <el-form-item label="描述:">
        <el-input
          v-model="formData.describe"
          disabled />
      </el-form-item>
      <el-form-item
        label="字典内容:"
        prop="finalOperationTime">
        <el-input
          v-model="formData.dictionaries"
          disabled />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { dictGet } from '@/api/systemManagement'
export default {
  name: 'DictionaryManagementShow',
  components: {},
  props: {
    paramsData: {
      type: [Object, String],
      required: false,
      default: ''
    }
  },
  data() {
    return {
      listLoading: false,
      formData: {
        title: '',
        isUse: '',
        updateTime: '',
        describe: '',
        dictionaries: []
      }
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
      if (!this.paramsData) {
        dictGet().then(res => {

        })
      }
    },
    // 返回列表
    backList() {
      this.$emit('view', 'list')
    }
  }
}

</script>
