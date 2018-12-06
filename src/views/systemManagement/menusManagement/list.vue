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
        :data="menuTreeData"
        :expand-on-click-node="false"
        node-key="id"
        default-expand-all>
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <!--原数据-->
          <!--<span>{{ node.label }}</span>-->
          <!--国际化-->
          <!--<span>{{ $t('route'+'.'+node.label) }}</span>-->
          <!--用反引号实现-->
          <span>{{ $t(`route.${node.label}`) }}</span>
          <span>
            <el-button
              type="text"
              size="mini"
              @click="() => changeState(data)">
              <!--{{ node.isUse | menuIsUse }}-->
              <!--撤销-->
              <!--{{ node.isUse | menuIsUse }}-->
              {{ data.isUse | menuIsUse }}
            </el-button>
          </span>
        </span>
      </el-tree>
    </el-card>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { getAllMenu, menuIsuse } from '@/api/systemManagement'
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
      menuTreeData: [],
      treeData: JSON.parse(JSON.stringify(data))
    }
  },
  created() {
    this.init()
    this.getMenu()
  },
  mounted() {
  },
  activated() {},
  methods: {
    // 初始化
    init() {},
    // 获取菜单
    getMenu() {
      getAllMenu().then(res => {
        this.menuTreeData = []
        const data = res.data
        for (const v in data) {
          if (data[v].children.length > 1) {
            const children = []
            for (const c in data[v].children) {
              children.push({ id: data[v].children[c].id, label: data[v].children[c].meta.title, isUse: data[v].children[c].isUse })
            }
            this.menuTreeData.push({ id: data[v].id, label: data[v].meta.title, isUse: data[v].isUse, children })
          } else {
            this.menuTreeData.push({ id: data[v].children[0].id, label: data[v].children[0].meta.title, isUse: data[v].children[0].isUse })
          }
        }
        console.log(res)
        console.log(this.menuTreeData)
      })
    },
    changeState(data) {
      console.log(data)
      const messageStr = data.isUse ? '撤销' : '启用'
      this.$confirm(`确定${messageStr}？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用接口
        menuIsuse({ id: data.id, isUse: !data.isUse }).then(res => {
          if (res) {
            this.$message({
              type: res.status.error ? 'error' : 'success',
              message: `已成功${messageStr}!`
            })
            this.getMenu()
          } else {
            this.$message({
              type: 'error',
              message: `${messageStr}请重试!`
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: `已取消${messageStr}`
        })
      })
    }
  }
}
</script>
