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
        label="标题:"
        prop="title">
        <el-input
          v-model="formData.title"
          disabled/>
      </el-form-item>
      <el-form-item label="发布范围:">
        <el-input
          v-model="formData.notificationScope"
          disabled/>
      </el-form-item>
      <el-form-item label="状态:">
        <el-input
          v-model="formData.state"
          disabled/>
      </el-form-item>
      <el-form-item
        label="最后操作时间:"
        prop="finalOperationTime">
        <el-input
          v-model="formData.finalOperationTime"
          disabled/>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
/* 当前组件必要引入 */
export default {
  name: 'NoticeShow',
  components: {},
  props: {
    paramsData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      formData: {
        title: '',
        notificationScope: ''
      }
    }
  },
  created() {
    this.init()
  },
  mounted() {
    if (this.paramsData) this.formData = this.paramsData
    console.log(this.formData)
  },
  methods: {
    // 初始化
    init() {
    },
    // 返回列表
    backList() {
      this.$emit('view', 'list')
    }
  }
}

</script>
