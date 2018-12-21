<template>
  <div class="personnel-show-container">
    <div class="show-header">
      <div class="header-left">
        <el-button @click="backList">返回列表</el-button>
      </div>
    </div>
    <el-card>
      <div slot="header" class="card-header">
        <span>查看人员</span>
      </div>
      <el-row :gutter="10">
        <el-form
          ref="refForm"
          :model="formData"
          label-width="100px"
          class="dict-add">
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 6}">
            <el-form-item label="姓名">
              {{ formData.userName }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 6}">
            <el-form-item label="员工号">
              {{ formData.code | typeText }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 6}">
            <el-form-item label="所属部门">
              {{ formData.departmentName }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 6}">
            <el-form-item label="性别">
              {{ formData.sex | userChange }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 6}">
            <el-form-item label="名族">
              {{ formData.class }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 6}">
            <el-form-item label="联系方式">
              {{ formData.phone }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 6}">
            <el-form-item label="身份证号">
              {{ formData.idCard }}
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { userGet } from '@/api/organizationalManagement'
export default {
  name: 'PersonnelManagementShow',
  components: {},
  props: {
    paramsData: {
      type: [Object, String, Array],
      required: false,
      default: ''
    }
  },
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
      console.log(this.paramsData)
      userGet({ id: this.paramsData.userId }).then(res => {
        this.formData = res.data
      })
    },
    // 返回列表
    backList() {
      this.$emit('view', 'list')
    }
  }
}

</script>
