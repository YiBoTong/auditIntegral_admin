<template>
  <el-card v-loading="showLoading">
    <div slot="header" class="card-header">
      <el-row>
        <el-col :span="12">
          <el-button type="text" disabled>查看人员</el-button>
        </el-col>
        <el-col :span="12" align="right">
          <el-button type="text" @click="backList('personnelManagement')">返回列表</el-button>
        </el-col>
      </el-row>
    </div>
    <show-user-info :form-data="formData"/>
  </el-card>
</template>
<script>
/* 当前组件必要引入 */
import { userGet } from '@/api/organizationalManagement'
import ShowUserInfo from './showUserInfo'
export default {
  name: 'PersonnelManagementShow',
  components: { ShowUserInfo },
  // props: {},
  data() {
    return {
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
      console.log(this.$route.params)
      userGet({ id: this.$route.params.userId }).then(res => {
        if (!res.status.error) {
          this.formData = res.data
        } else {
          this.$message.error(res.status.msg)
        }
        this.showLoading = false
      })
    }
  }
}

</script>
