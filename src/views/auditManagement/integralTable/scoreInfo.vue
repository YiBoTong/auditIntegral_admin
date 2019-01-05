<!--
****--@date     2019-01-05 23:21
****--@author   YC
****--@describe 分数详情
-->
<template>
  <div>
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
            {{ formData.sumScore / 1000 }}
          </el-form-item>
        </el-col>
        <el-col
          :xs="{span: 24}"
          :sm="{span: 12}"
          :md="{span: 12}"
          :lg="{span: 8}"
          :xl="{span: 8}">
          <el-form-item label="分数">
            {{ formData.score / 1000 }}
          </el-form-item>
        </el-col>
        <el-col
          v-if="formData.changeScore && formData.changeScore.id"
          :xs="{span: 24}"
          :sm="{span: 12}"
          :md="{span: 12}"
          :lg="{span: 8}"
          :xl="{span: 8}">
          <el-form-item label="修改分数">
            {{ formData.changeScore.score / 1000 }}
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
        <div v-if="!formData.behaviorList || !formData.behaviorList.length">暂无违规行为</div>
      </el-row>
    </div>
    <template v-if="formData.changeScore && formData.changeScore.id">
      <br>
      <br>
      <span>修改原因</span>
      <hr>
      <br>
      <p>{{ formData.changeScore.describe }}</p>
    </template>
    <template v-if="formData.changeScore && formData.changeScore.id && !!~['reject','adopt'].indexOf(formData.changeScore.state)">
      <br>
      <br>
      <span>审核结果 <b>（{{ formData.changeScore.state | auditStateChange }}）</b></span>
      <hr>
      <br>
      <p>{{ formData.changeScore.suggestion }}</p>
    </template>
  </div>
</template>
<script>
/* 当前组件必要引入 */
export default {
  name: 'ShowScoreInfo',
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
