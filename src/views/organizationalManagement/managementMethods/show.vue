<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 查看办法
-->
<template>
  <div class="show-container methods-show-container">
    <div class="show-header">
      <div class="header-left">
        <el-button @click="backList">返回列表</el-button>
      </div>
    </div>
    <el-card>
      <div slot="header" class="card-header">
        <span>管理办法属性</span>
      </div>
      <el-form
        ref="refForm"
        :model="formData"
        label-width="130px">
        <el-form-item
          label="状态"
          prop="state">{{ formData.state | typeText }}
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header" class="card-header">
        <span>管理内容</span>
      </div>
      <div class="content">
        <h1 align="center">{{ formData.title }}</h1>
        <el-row
          v-for="(content,index) in formData.content"
          :key="index">
          <el-col>
            <template v-if="content.isTitle">
              <h3 align="center">
                {{ content.content }}
              </h3>
            </template>
            <p v-else>
              {{ content.content }}
            </p>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { clauseGet } from '@/api/organizationalManagement'
export default {
  name: 'MMShow',
  components: {},
  props: {
    paramsData: {
      type: [Object],
      required: false,
      default: null
    }
  },
  data() {
    return {
      formData: {
        title: '',
        departmentId: '',
        titleLevel: '',
        isTitle: '',
        fileIds: '',
        content: []
      }
    }
  },
  created() {
    this.init()
  },
  mounted() { },
  methods: {
    // 初始化
    init() {
      clauseGet({ id: this.paramsData.id }).then(res => {
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
