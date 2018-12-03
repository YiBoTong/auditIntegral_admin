<!--
****--@date     2018-11-21 11:27
****--@author   XXL
****--@describe 树组件
-->
<template>
  <div class="tree-container">
    <div class="search">
      <el-input
        v-model="department"
        placeholder="请输入"
        clearable>
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="handleSearchClick" />
      </el-input>
    </div>
    <el-scrollbar>
      <el-tree
        :props="propsData"
        :data="treeData"
        @node-click="handleNodeClick" />
    </el-scrollbar>
  </div>
</template>

<script>
/* 当前组件必要引入 */
export default {
  name: 'Tree',
  components: {},
  props: {
    treeData: {
      type: [Object, Array, String],
      required: false,
      default: ''
    },
    propsData: {
      type: [Object, Array, String],
      required: false,
      default: ''
    }
  },
  data() {
    return {
      department: ''
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
    // 获取节点
    handleNodeClick(val) {
      console.log(val)
      this.$emit('tree', { id: val.id, value: val.children })
    },
    // 搜索
    handleSearchClick() {
      console.log(this.department)
      this.$emit('tree', { value: this.department })
    }
  }
}
</script>

<style lang="scss">
.tree-container {
  .el-scrollbar__wrap {
    overflow-x: hidden !important;
    height: calc(100vh - 174px);
  }
  .el-tree-node__content {
    width: 96%;
  }
}
</style>

<style lang="scss" scoped>
.tree-container {
  width: 100%;
  height: 100%;
  .search {
    display: flex;
    width: 100%;
    padding-bottom: 10px;
  }
  .el-input {
    width: 99%;
  }
}
</style>

