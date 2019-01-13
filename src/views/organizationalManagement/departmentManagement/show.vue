<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 创建修改
-->
<template>
  <el-card v-loading="listLoading">
    <div slot="header" class="card-header">
      <el-row>
        <el-col :span="12">
          <el-button type="text">查看部门</el-button>
        </el-col>
        <el-col :span="12" align="right">
          <el-button type="text" @click="backList">返回列表</el-button>
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="10">
      <el-form
        v-loading="dataLoading"
        ref="refForm"
        :model="formData"
        label-width="120px"
        class="dict-add">
        <el-col>
          <el-form-item label="部门/网点名称">
            {{ formData.name }}
          </el-form-item>
        </el-col>
        <el-col
          :xs="{span: 24}"
          :sm="{span: 12}"
          :md="{span: 12}"
          :lg="{span: 8}"
          :xl="{span: 8}">
          <el-form-item label="上级部门/网点">
            {{ formData.parentDepName }}
          </el-form-item>
        </el-col>
        <el-col
          :xs="{span: 24}"
          :sm="{span: 12}"
          :md="{span: 12}"
          :lg="{span: 8}"
          :xl="{span: 8}">
          <el-form-item label="部门/网点编码">
            {{ formData.code || '—' }}
          </el-form-item>
        </el-col>
        <el-col
          :xs="{span: 24}"
          :sm="{span: 12}"
          :md="{span: 12}"
          :lg="{span: 8}"
          :xl="{span: 8}">
          <el-form-item label="联系方式">
            {{ formData.phone || '—' }}
          </el-form-item>
        </el-col>
        <el-col
          :xs="{span: 24}"
          :sm="{span: 12}"
          :md="{span: 12}"
          :lg="{span: 8}"
          :xl="{span: 8}">
          <el-form-item label="更新时间">
            {{ formData.updateTime }}
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="地址">
            {{ formData.address || '—' }}
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <hr>
    <br>
    <h3>相关人员</h3>
    <br>
    <el-table :data="formData.userList" border style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="100" />
      <el-table-column
        prop="userName"
        label="用户姓名" />
      <el-table-column
        prop="type"
        label="角色分类" >
        <template slot-scope="scope">
          {{ scope.row.type | dictionaries(self,-2) }}
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
/* 当前组件必要引入 */
import { departmentGet } from '@/api/organizationalManagement'

export default {
  name: 'DepartmentManagementShow',
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
      self: this,
      dataLoading: false,
      formData: {
        id: '',
        parentId: '',
        parentDepName: '',
        code: '',
        level: '',
        address: '',
        phone: '',
        updateTime: '',
        userList: []
      },
      autosize: { minRows: 4, maxRows: 6 }
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
      if (this.paramsData) {
        this.departmentGet()
      }
    },
    // 返回列表
    backList() {
      this.$emit('view', 'list')
    },
    // 获取部门
    departmentGet() {
      this.dataLoading = true
      const { id } = this.paramsData
      departmentGet({ id }).then(res => {
        if (!res.status.error) {
          const data = res.data
          if (data.parentId === -1) {
            data.parentDepName = '根部门/网点'
          }
          this.formData = data
        } else {
          this.$message.error(res.status.error)
        }
        this.dataLoading = false
      })
    }
  }
}
</script>
