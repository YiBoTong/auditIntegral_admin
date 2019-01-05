<!--
****--@date     2019-01-05 18:27
****--@author   YC
****--@describe 查看人员基本信息组件
-->
<template>
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
          {{ formData.userName || '—' }}
        </el-form-item>
      </el-col>
      <el-col
        :xs="{span: 24}"
        :sm="{span: 12}"
        :md="{span: 12}"
        :lg="{span: 8}"
        :xl="{span: 6}">
        <el-form-item label="员工号">
          {{ formData.code || '—' }}
        </el-form-item>
      </el-col>
      <el-col
        :xs="{span: 24}"
        :sm="{span: 12}"
        :md="{span: 12}"
        :lg="{span: 8}"
        :xl="{span: 6}">
        <el-form-item label="所属部门">
          {{ formData.departmentName || '—' }}
        </el-form-item>
      </el-col>
      <el-col
        :xs="{span: 24}"
        :sm="{span: 12}"
        :md="{span: 12}"
        :lg="{span: 8}"
        :xl="{span: 6}">
        <el-form-item label="性别">
          {{ (formData.sex || '—') | userChange }}
        </el-form-item>
      </el-col>
      <el-col
        :xs="{span: 24}"
        :sm="{span: 12}"
        :md="{span: 12}"
        :lg="{span: 8}"
        :xl="{span: 6}">
        <el-form-item label="名族">
          {{ formData.class || '—' }}
        </el-form-item>
      </el-col>
      <el-col
        :xs="{span: 24}"
        :sm="{span: 12}"
        :md="{span: 12}"
        :lg="{span: 8}"
        :xl="{span: 6}">
        <el-form-item label="联系方式">
          {{ formData.phone || '—' }}
        </el-form-item>
      </el-col>
      <el-col
        :xs="{span: 24}"
        :sm="{span: 12}"
        :md="{span: 12}"
        :lg="{span: 8}"
        :xl="{span: 6}">
        <el-form-item label="身份证号">
          {{ formData.idCard || '—' }}
        </el-form-item>
      </el-col>
    </el-form>
  </el-row>
</template>
<script>
/* 当前组件必要引入 */
export default {
  name: 'ShowUserInfo',
  components: {},
  props: {
    formData: {
      type: Object,
      default: () => ({})
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
    }

  }
}

</script>
