<!--
****--@date     2018-11-30 16:13
****--@author   YC
****--@describe 部门树组件
-->
<template>
  <div class="orgTree">
    <div v-if="showSearch" class="otSearch">
      <el-input v-model="searchName" clearable placeholder="输入名称进行筛选"/>
    </div>
    <el-tree
      ref="orgTree"
      :data="treeData"
      :props="struct"
      :show-checkbox="showCheckbox"
      :filter-node-method="filterNode"
      :load="loadNode"
      lazy
      class="otTree"
      @check-change="handleCheckChange"
      @node-click="handleNodeClick">
      <el-button slot-scope="{ node, data }" type="text">
        <span :class="['aiOrgTree-'+(node.data.hasChild ? 'point':'group')]" class="aiOrgTree"/>
        <span>{{ node.label }}</span>
      </el-button>
    </el-tree>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import { departmentTree } from '@/api/organizationalManagement'
export default {
  name: 'OrgTree',
  props: {
    showCheckbox: {
      type: Boolean,
      default: false
    },
    showSearch: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      treeData: [],
      searchName: '',
      selectData: {},
      struct: {
        label: 'name',
        children: 'children',
        isLeaf: 'leaf'
      }
    }
  },
  watch: {
    searchName(val) {
      this.$refs.orgTree.filter(val)
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
    },
    filterNode(value, data) {
      if (!value) return true
      return data[this.struct.label].indexOf(value) !== -1
    },
    loadNode(node, resolve) {
      let id = -1
      if (node.level !== 0) {
        id = node.data.id
      }
      this.getDepartmentTree(id).then(treeData => {
        setTimeout(() => resolve(treeData), 500)
      })
    },
    // 获取部门树
    getDepartmentTree(parentId) {
      const data = {
        parentId: parentId || this.parentId
      }
      return new Promise((resolve, reject) => {
        departmentTree(data).then(res => {
          const treeData = res.data || []
          treeData.map(v => {
            v.leaf = !v.hasChild
          })
          resolve(treeData)
        })
      })
    },
    handleCheckChange(data, checked, indeterminate) {
      this.$emit('checkChange', data, checked, indeterminate)
    },
    handleNodeClick(data) {
      this.$emit('click', data)
    }
  }
}

</script>
