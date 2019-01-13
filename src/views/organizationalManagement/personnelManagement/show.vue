<template>
  <el-card>
    <div slot="header" class="card-header">
      <el-row>
        <el-col :span="12">
          <el-button type="text">查看人员</el-button>
        </el-col>
        <el-col :span="12" align="right">
          <el-button type="text" @click="backList">返回列表</el-button>
        </el-col>
      </el-row>
    </div>
    <show-user-info v-loading="dataLoading" :form-data="formData"/>
  </el-card>
</template>
<script>
/* 当前组件必要引入 */
import { userGet } from '@/api/organizationalManagement'
import ShowUserInfo from './showUserInfo'
export default {
  name: 'PersonnelManagementShow',
  components: { ShowUserInfo },
  props: {
    paramsData: {
      type: [Object, String, Array],
      required: false,
      default: ''
    }
  },
  data() {
    return {
      dataLoading: false,
      formData: {}
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
      this.dataLoading = true
      userGet({ id: this.paramsData.userId }).then(res => {
        if (!res.status.error) {
          this.formData = res.data
        } else {
          this.$message.error(res.status.msg)
        }
        this.dataLoading = false
      })
    },
    // 返回列表
    backList() {
      this.$emit('view', 'list')
    }
  }
}

</script>
