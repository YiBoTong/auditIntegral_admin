<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 创建修改
-->
<template>
  <el-card v-loading="showLoading">
    <div slot="header" class="card-header">
      <el-row>
        <el-col :span="12">
          <el-button type="text" disabled>查看字典</el-button>
        </el-col>
        <el-col :span="12" align="right">
          <el-button type="text" @click="backList">返回列表</el-button>
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="10">
      <el-form
        ref="refForm"
        :model="formData"
        label-width="100px"
        class="dict-add">
        <el-col
          :xs="{span: 24}"
          :sm="{span: 24}"
          :md="{span: 24}"
          :lg="{span: 12}"
          :xl="{span: 12}"
        >
          <el-form-item
            label="字典类型"
            prop="title">
            {{ formData.title }}
          </el-form-item>
        </el-col>
        <el-col
          :xs="{span: 24}"
          :sm="{span: 12}"
          :md="{span: 12}"
          :lg="{span: 6}"
          :xl="{span: 6}"
        >
          <el-form-item label="是否启用">
            {{ formData.isUse | typeText }}
          </el-form-item>
        </el-col>
        <el-col
          :xs="{span: 24}"
          :sm="{span: 12}"
          :md="{span: 12}"
          :lg="{span: 6}"
          :xl="{span: 6}"
        >
          <el-form-item label="字典分类">
            {{ formData.key | dictionaries(self,-1) }}
          </el-form-item>
        </el-col>
        <el-form-item
          label="描述"
          prop="describe"
          class="describe">
          {{ formData.describe || "暂无描述" }}
        </el-form-item>
      </el-form>
    </el-row>
    <hr>
    <br>
    <h3>字典内容</h3>
    <br>
    <el-table
      :data="formData.dictionaries"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="100"/>
      <el-table-column
        prop="key"
        label="键"/>
      <el-table-column
        prop="value"
        label="值"/>
      <el-table-column
        prop="describe"
        label="描述"/>
    </el-table>
  </el-card>
</template>
<script>
/* 当前组件必要引入 */
import { dictAdd, dictEdit, dictGet } from '@/api/systemManagement'

export default {
  name: 'DictionaryManagementInput',
  components: {},
  // props: {},
  data() {
    return {
      dictAdd,
      dictEdit,
      self: this,
      // formData: {
      //   typeId: '-1',
      //   key: '',
      //   title: '',
      //   isUse: false,
      //   updateTime: '',
      //   describe: '',
      //   dictionaries: []
      // },
      formData: {},
      dictionaries: [],
      todoType: 'Add',
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
      const { id } = this.$route.params
      if (id) {
        this.getDictionary()
      }
    },
    // 返回列表
    backList() {
      this.$router.push({ name: 'dictionaryManagement' })
    },
    // 获取字典
    getDictionary() {
      const { id } = this.$route.params
      dictGet({ id }).then(res => {
        if (!res.status.error) {
          this.formData = res.data
        } else {
          this.$message({
            type: 'error',
            message: res.status.msg + '!'
          })
        }
        this.showLoading = false
      })
    }
  }
}
</script>
