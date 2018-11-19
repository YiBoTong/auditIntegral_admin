<template>
  <div class="public-container">
    <keep-alive>
      <notice-list v-if="view==='list'"
                   @view="viewCall"
                   :paramsData="paramsData"></notice-list>
    </keep-alive>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import NoticeList from './list';

export default {
  name: 'systemLog',
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
    },
    // 接受子组件传递过来的信息
    viewCall(view, data) {
      console.log(data);
      this.view = view;
      this.paramsData = data;
    }
  },
  created() {
    this.init();
  },
  mounted() {
  },
  components: { NoticeList }
};

</script>
