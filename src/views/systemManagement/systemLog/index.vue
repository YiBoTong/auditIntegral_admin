<!--
****--@date     2018-11-09 10:49
****--@author   XXL
****--@describe 机构管理-通知公告
-->
<template>
  <div class="container">
    <keep-alive>
      <notice-list v-if="view==='list'" @view="viewCall" :paramsData="paramsData"></notice-list>
    </keep-alive>
    <notice-input v-if="view==='input'" @view="viewCall" :paramsData="paramsData"></notice-input>
    <notice-view v-if="view==='show'" @view="viewCall" :paramsData="paramsData"></notice-view>
  </div>
</template>
<script>
  import NoticeInput from './input';
  /* 当前组件必要引入 */
  import NoticeList from './list';
  import NoticeView from './show';

  export default {
    name: 'systemLog',
    props: [],
    data () {
      return {
        view: 'list',
        paramsData: null
      };
    },
    methods: {
      // 初始化
      init: function () {
      },
      // 接受子组件传递过来的信息
      viewCall (view, data) {
        console.log(data);
        this.view = view;
        this.paramsData = data;
      }
    },
    created () {
      this.init();
    },
    mounted () {
    },
    components: {NoticeView, NoticeInput, NoticeList}
  };

</script>
