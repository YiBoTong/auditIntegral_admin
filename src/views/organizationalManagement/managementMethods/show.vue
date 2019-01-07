<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 查看办法
-->
<template>
  <el-card>
    <div slot="header" class="card-header">
      <el-row>
        <el-col :span="20">
          {{ formData.updateTime }}
        </el-col>
        <el-col :span="4" align="right">
          <el-button type="text" @click="backList">返回列表</el-button>
        </el-col>
        <el-col>
          <h1 align="center">{{ formData.title }}</h1>
          <template v-if="formData.number">
            <br>
            <h3 align="center">{{ formData.number }}</h3>
          </template>
        </el-col>
      </el-row>
    </div>
    <el-row class="managementMethodsShowContent" >
      <el-col
        v-for="(content,index) in formData.content"
        :key="index">
        <template v-if="content.isTitle">
          <h3 v-if="content.titleLevel==='h1'" align="center">
            {{ content.content }}
          </h3>
          <p v-else><b>{{ content.content }}</b></p>
        </template>
        <p v-else>
          {{ content.content }}
        </p>
      </el-col>
    </el-row>
  </el-card>
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
