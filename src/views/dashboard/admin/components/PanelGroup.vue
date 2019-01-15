<template>
  <el-row
    :gutter="40"
    class="panel-group">
    <el-col
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col">
      <div
        v-loading="integralLoading"
        :class="{'active':viewType==='integral'}"
        class="card-panel"
        @click="handleSetLineChartData('integral')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon
            icon-class="people"
            class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">我的积分</div>
          <count-to
            :start-val="0"
            :end-val="integralSumNum"
            :duration="2600"
            class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col">
      <div
        v-loading="behaviorLoading"
        :class="{'active':viewType==='behavior'}"
        class="card-panel"
        @click="handleSetLineChartData('behavior')">
        <div class="card-panel-icon-wrapper icon-list">
          <svg-icon
            icon-class="list"
            class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">违规行为</div>
          <count-to
            :start-val="0"
            :end-val="behaviorSumNum"
            :duration="3000"
            class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col">
      <div
        v-loading="confirmationLoading"
        :class="{'active':viewType==='confirmation'}"
        class="card-panel"
        @click="handleSetLineChartData('confirmation')">
        <div class="card-panel-icon-wrapper icon-documentation">
          <svg-icon
            icon-class="documentation"
            class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">事实确认书</div>
          <count-to
            :start-val="0"
            :end-val="confirmationSumNum"
            :duration="3200"
            class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col">
      <div
        v-loading="noticeLoading"
        :class="{'active':viewType==='notice'}"
        class="card-panel"
        @click="handleSetLineChartData('notice')">
        <div class="card-panel-icon-wrapper icon-form">
          <svg-icon
            icon-class="form"
            class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">惩罚通知书</div>
          <count-to
            :start-val="0"
            :end-val="noticeSumNum"
            :duration="3600"
            class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import { getIntegralApi, getBehaviorApi, getConfirmationApi, getNoticeApi } from '@/api/worker'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      getIntegralApi, getBehaviorApi, getConfirmationApi, getNoticeApi,

      viewType: null,
      integral: null,
      behavior: null,
      confirmation: null,
      notice: null,

      integralLoading: true,
      behaviorLoading: true,
      confirmationLoading: true,
      noticeLoading: true,

      integralSumNum: 0,
      behaviorSumNum: 0,
      confirmationSumNum: 0,
      noticeSumNum: 0
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      ['integral', 'behavior', 'confirmation', 'notice'].map((key, index) => this.getData(key, index))
    },
    getData(type, index) {
      this['get' + (type.replace(/\w/, s => s.toUpperCase())) + 'Api']().then((res) => {
        let sum = 0
        this[type] = res.data;
        ((res.data[0] && res.data[0].info) || []).map(item => {
          sum += item.num
          item.num = this.numberFormat(item.num)
        })
        this[type + 'SumNum'] = this.numberFormat(sum)
        this[type + 'Loading'] = false
        if (!index) { // 默认加载第一个的数据渲染图表
          this.handleSetLineChartData(type)
        }
      })
    },
    handleSetLineChartData(type) {
      this.viewType = type
      this.$emit('handleSetLineChartData', type, this[type])
    },
    numberFormat(num, i = 1000) {
      return Number((num / i).toFixed(2))
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col {
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    &:hover,&.active {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
        background: #40c9c6;
      }
      .icon-list {
        background: #36a3f7;
      }
      .icon-documentation {
        background: #f4516c;
      }
      .icon-form {
        background: #34bfa3;
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-list {
      color: #36a3f7;
    }
    .icon-documentation {
      color: #f4516c;
    }
    .icon-form {
      color: #34bfa3;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      /*float: right;*/
      position: absolute;
      left: 94px;
      right: 0;
      text-align: center;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
