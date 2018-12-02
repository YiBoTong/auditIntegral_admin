<!--
****--@date     2018-11-30 16:13
****--@author   YC
****--@describe 部门树组件
-->
<template>
  <div class="orgTree">
    <org-tree-item v-for="item in treeData" :key="item.id"/>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import OrgTreeItem from './item'
import { departmentTree } from '@/api/organizationalManagement'
export default {
  name: 'OrgTree',
  components: { OrgTreeItem },
  props: {
    parentId: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      treeData: []
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
      this.getdepartmentTree()
    },
    // 获取部门树
    getdepartmentTree() {
      const data = {
        parentId: this.parentId
      }
      departmentTree(data).then(res => {
        const treeData = res.data || []
        treeData.map(v => {
          v.children = []
        })
        console.log(treeData)
        this.treeData = treeData
      })
    }
  }
}

</script>
