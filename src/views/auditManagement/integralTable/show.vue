<!--
****--@date     2018-11-20 10:48
****--@author   XXL
****--@describe 创建修改
-->
<template>
  <div class="integral-show-container">
    <div class="show-top">
      <div class="top-left">
        <el-button @click="backList">返回列表</el-button>
      </div>
    </div>
    <!--积分表-->
    <el-card>
      <div slot="header" class="card-header">
        <span>分数详情</span>
      </div>
      <el-row :gutter="10">
        <el-form
          ref="refForm"
          :model="formData"
          label-width="100px">
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 6}"
            :xl="{span: 6}">
            <el-form-item label="认定人姓名">
              {{ formData.cognizanceUserName }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 8}">
            <el-form-item label="责任人姓名">
              {{ formData.userName }}
            </el-form-item>
          </el-col>

          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 8}">
            <el-form-item label="生效日期">
              {{ formData.time }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 8}">
            <el-form-item label="总分">
              {{ formData.sumScore }}
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 12}"
            :xl="{span: 12}">
            <el-form-item label="分数">
              {{ formData.score }}
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <br>
      <span>违规行为</span>
      <hr>
      <br>
      <div class="card-behavior">
        <el-row>
          <el-form
            v-for="(behavior,index) in formData.behaviorList"
            :key="index"
            :ref="'behaviorForm'+index"
            :model="behavior"
            label-width="60px"
            class="behavior-form">
            <el-col
              :xs="{span: 24}"
              :sm="{span: 24}"
              :md="{span: 24}"
              :lg="{span: 24}"
              :xl="{span: 24}">
              <el-form-item
                :label="(index+1).toString()">
                {{ behavior.content }}
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { getIntegral } from '@/api/auditManagement'
export default {
  name: 'IndexEdit',
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
      listLoading: false,
      programmeData: [],
      fileList: [],
      formData: {
        'projectName': '',
        'departmentName': '',
        'reviewName': '',
        'inspectName': '',
        'checkName': '',
        'programmeId': '',
        'queryDepartmentId': '',
        'departmentId': '',
        'number': '',
        'public': false,
        'type': '',
        'time': '',
        'state': 'draft',
        'queryUsers': '',
        'adminUsers': '',
        'inspectUsers': '',
        'fileIds': '',
        'contentList': [],
        'behaviorList': []
      },
      todoType: 'Add'
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
      this.getIntegralData(this.paramsData.id)
    },
    // 返回列表
    backList() {
      this.$emit('view', 'list')
    },
    // 获取积分通知书
    getIntegralData() {
      const id = this.paramsData.id
      getIntegral({ id }).then(res => {
        if (!res.status.error) {
          this.formData = res.data
        } else {
          this.$message({
            type: 'error',
            message: res.status.msg + '!'
          })
        }
      })
    }
  }
}
</script>
