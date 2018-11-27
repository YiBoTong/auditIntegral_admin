<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 创建修改
-->
<template>
  <div
    v-loading="listLoading"
    class="dict-container">
    <div class="form-header">
      <div class="header-left">
        <el-button @click="backList">返回列表</el-button>
      </div>
    </div>
    <br>
    <div class="dict-title">
      <span>查看字典</span>
      <hr>
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
    <div class="dict-title">
      <span>字典内容</span>
      <hr>
    </div>
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
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { dictAdd, dictEdit, dictGet } from '@/api/systemManagement'

export default {
  name: 'DictionaryManagementInput',
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
      dictAdd,
      dictEdit,
      self: this,
      listLoading: false,
      formData: {
        typeId: '-1',
        key: '',
        title: '',
        isUse: false,
        updateTime: '',
        describe: '',
        dictionaries: []
      },
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
      if (this.paramsData) {
        this.getDictionary()
      }
    },
    // 返回列表
    backList() {
      this.$emit('view', 'list')
    },
    // 获取字典
    getDictionary() {
      const { id } = this.paramsData
      dictGet({ id }).then(res => {
        if (!res.data.status.error) {
          this.formData = res.data.data
        } else {
          this.$message({
            type: 'error',
            message: res.data.status.msg + '!'
          })
        }
      })
    }
  }
}
</script>
