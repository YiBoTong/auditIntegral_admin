<!--
****--@date     2018-11-30 16:13
****--@author   YC
****--@describe 部门树组件
-->
<template>
  <div v-loading="orgTreeLoading" class="orgTree">
    <div v-if="showSearch" class="otSearch">
      <el-input v-model="searchName" clearable placeholder="输入名称进行筛选"/>
    </div>
    <el-tree
      :ref="'orgTree'+orgTreeRnd"
      :data="treeData"
      :props="struct"
      :show-checkbox="showCheckbox"
      :filter-node-method="filterNode"
      :load="loadNode"
      lazy
      highlight-current
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
    },
    // 是否属于管理
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      orgTreeRnd: Math.random().toString(),
      orgTreeLoading: true,
      treeData: [],
      searchName: '',
      selectData: {},
      struct: {
        label: 'name',
        children: 'children',
        isLeaf: 'leaf'
      },
      userDepartment: {
        departmentId: -1,
        departmentName: ''
      }
    }
  },
  watch: {
    searchName(val) {
      this.$refs['orgTree' + this.orgTreeRnd].filter(val)
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
      this.orgTreeLoading = true
      const { departmentId: id, departmentName } = this.$store.getters.userInfo
      this.userDepartment = { id, departmentName }
    },
    filterNode(value, data) {
      if (!value) return true
      return data[this.struct.label].indexOf(value) !== -1
    },
    loadNode(node, resolve) {
      let id = this.isAdmin ? -1 : this.userDepartment.id
      let time = 0
      const _this = this
      if (node.level !== 0) {
        id = node.data.id
        time = 500
      }
      this.getDepartmentTree(id).then(treeData => {
        const data = treeData
        if (node.level === 0 && !this.isAdmin) {
          data.unshift({
            leaf: true,
            level: 0,
            hasChild: !!treeData.length,
            id: _this.userDepartment.id,
            name: _this.userDepartment.departmentName
          })
        }
        this.$emit('load', data, this.userDepartment)
        setTimeout(() => {
          resolve(data)
          this.orgTreeLoading = false
        }, time)
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
