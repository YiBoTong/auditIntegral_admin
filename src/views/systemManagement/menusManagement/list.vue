<!--
****--@date     2018-12-03 21:52
****--@author   XXL
****--@describe 菜单list
-->
<template>
  <div class="menus-list-container">
    <el-card>
      <div slot="header">
        菜单管理
      </div>
      <el-tree
        :data="treeData"
        :expand-on-click-node="false"
        show-checkbox
        node-key="id"
        default-expand-all>
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <span>{{ node.label }}</span>
          <span>
            <el-button
              type="text"
              size="mini"
              @click="() => changeState(data)">
              启用
            </el-button>
          </span>
        </span>
      </el-tree>
    </el-card>
  </div>
</template>
<script>
/* 当前组件必要引入 */
export default {
  name: 'MenusManagementList',
  components: {},
  // props: [],
  data() {
    const data = [
      { id: 20, label: '控制台' }, { id: 21, label: '引导页' }, { id: 22, label: '个人中心' },
      {
        id: 1,
        label: '机构管理',
        children: [
          { id: 2,
            label: '通知管理' },
          { id: 3,
            label: '部门管理' },
          {
            id: 4,
            label: '人员管理' },
          {
            id: 5,
            label: '管理办法' }]
      }, {
        id: 6,
        label: '稽核管理',
        children: [
          { id: 7,
            label: '工作底稿' },
          { id: 8,
            label: '确认书' },
          {
            id: 9,
            label: '处罚通知' },
          {
            id: 10,
            label: '积分表' },
          {
            id: 11,
            label: '统计分析' }]
      }, {
        id: 12,
        label: '系统管理',
        children: [
          { id: 16,
            label: '字典管理' },
          { id: 13,
            label: '登录管理' },
          {
            id: 14,
            label: '系统日志' },
          {
            id: 15,
            label: '菜单管理' },
          {
            id: 17,
            label: '权限管理' }]
      }]
    return {
      treeData: JSON.parse(JSON.stringify(data))
    }
  },
  created() {
    this.init()
  },
  mounted() {
  },
  activated() {},
  methods: {
    // 初始化
    init() {},
    changeState(data) {
      console.log('I need a API')
    }
  }
}
</script>
