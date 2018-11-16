<!--
****--@date     2018-11-09 10:49
****--@author   XXL
****--@describe 机构管理-通知公告
-->
<template>
  <div class="public-container">
    <keep-alive>
      <notice-list v-if="view==='list'"
                   @view="viewCall"
                   :paramsData="paramsData"></notice-list>
    </keep-alive>
    <notice-input v-if="view==='input'"
                  @view="viewCall"
                  :paramsData="paramsData"></notice-input>
    <notice-view v-if="view==='view'"
                 @view="viewCall"
                 :paramsData="paramsData"></notice-view>
  </div>
</template>
<script>
import NoticeInput from './input';
/* 当前组件必要引入 */
import NoticeList from './list';
import NoticeView from './view';
import Axios from 'axios';

export default {
  name: 'notice',
  props: [],
  data() {
    return {
      view: 'list',
      paramsData: null
    };
  },
  methods: {
    // 初始化
    init: function() {
      Axios.get('../../static/mock/tableData.json').then(this.getTableData);
    },
    viewCall(view, data = null) {
      this.view = view;
      this.paramsData = data;
    },
    getTableData(res) {
      this.paramsData = res.data.noticeBulletinData;
      console.log(this.paramsData);
    }
  },
  created() {
    this.init();
  },
  mounted() {
  },
  components: { NoticeView, NoticeInput, NoticeList }
};

</script>
