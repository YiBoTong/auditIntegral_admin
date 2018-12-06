<!--
****--@date     2018-12-04 16:08
****--@author   XXL
****--@describe 权限管理input
-->
<template>
  <div class="power-input-container">
    <div class="input-header">
      <div class="header-left">
        <el-button @click="backList">返回列表</el-button>
      </div>
    </div>
    <el-card>
      <div slot="header" class="card-header">
        <div class="header-left">
          角色
        </div>
        <div class="header-right">
          <el-button type="primary" size="small" @click="holdPower">保存</el-button>
        </div>
      </div>
      <el-tree
        :data="treeData"
        :expand-on-click-node="false"
        :default-checked-keys="treeId"
        node-key="id"
        default-expand-all
        @check="handleCheck"
      >
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <span>{{ node.label }}</span>
          <span>
            <el-checkbox :value="data.isread" label="读" @input="value => limitChange(value, data, 'isread')" />
            <el-checkbox :value="data.iswrite" label="写" @input="value => limitChange(value, data, 'iswrite')" />
          </span>
        </span>
      </el-tree>
    </el-card>
  </div>
</template>
<script>
/* 当前组件必要引入 */
export default {
  name: 'PowerManagementInput',
  components: {},
  props: {
    paramsData: {
      type: [Object, String],
      required: false,
      default: ''
    }
  },
  data() {
    const data = [
      { id: 20, label: '控制台', isread: true, iswrite: false },
      { id: 21, label: '引导页', isread: true, iswrite: false },
      { id: 22, label: '个人中心', isread: true, iswrite: false },
      {
        id: 1,
        label: '机构管理',
        isread: true,
        iswrite: false,
        children: [
          { id: 2,
            label: '通知管理',
            isread: true,
            iswrite: false },
          { id: 3,
            label: '部门管理',
            isread: true,
            iswrite: false },
          {
            id: 4,
            label: '人员管理',
            isread: true,
            iswrite: false },
          {
            id: 5,
            label: '管理办法',
            isread: true,
            iswrite: false }]
      }, {
        id: 6,
        label: '稽核管理',
        isread: true,
        iswrite: false,
        children: [
          { id: 7,
            label: '工作底稿',
            isread: true,
            iswrite: false },
          { id: 8,
            label: '确认书',
            isread: true,
            iswrite: false },
          {
            id: 9,
            label: '处罚通知',
            isread: true,
            iswrite: false },
          {
            id: 10,
            label: '积分表',
            isread: true,
            iswrite: false },
          {
            id: 11,
            label: '统计分析',
            isread: true,
            iswrite: false }]
      }, {
        id: 12,
        label: '系统管理',
        isread: true,
        iswrite: false,
        children: [
          { id: 16,
            label: '字典管理',
            isread: true,
            iswrite: false },
          { id: 13,
            label: '登录管理',
            isread: true,
            iswrite: false },
          {
            id: 14,
            label: '系统日志',
            isread: true,
            iswrite: false },
          {
            id: 15,
            label: '菜单管理',
            isread: true,
            iswrite: false },
          {
            id: 17,
            label: '权限管理',
            isread: true,
            iswrite: false }]
      }]
    return {
      treeId: [],
      treeData: JSON.parse(JSON.stringify(data))
    }
  },
  created() {
    // console.log(this.paramsData)
    this.init()
  },
  mounted() {
  },
  methods: {
    // 初始化
    init() {
      this.getTreeId(this.treeData)
      console.log(this.treeId)
    },
    // 根据角色权限默认选中
    getTreeId(data) {
      // 循环树结构的最外层
      console.log(data)
      for (let i = 0, length = data.length; i < length; i++) {
        // 判断是否有子节点
        if (data[i].children) {
          for (let n = 0, length = data[i].children.length; n < length; n++) {
            if (data[i].children[n].isread || data[i].children[n].iswrite) {
              this.treeId.push(data[i].children[n].id)
            }
          }
        } else { // 没有则判断是否具有读或写的权限
          if (data[i].isread || data[i].iswrite) {
            this.treeId.push(data[i].id)
          }
        }
      }
      console.log(this.treeId)
    },
    handleCheck(data, node) {
      console.log(node)
      console.log(data)
      // 判断是选中还是取消
      if (node.checkedKeys.indexOf(data.id) === -1) {
        console.log('取消选中了！')
        if (data.children) {
          data.isread = false
          data.iswrite = false
          data.children.map(res => {
            res.isread = false
            res.iswrite = false
          })
        } else {
          data.isread = false
          data.iswrite = false
        }
      } else {
        if (data.children) {
          data.isread = true
          data.iswrite = true
          data.children.map(res => {
            res.isread = true
            res.iswrite = true
          })
        } else {
          data.isread = true
          data.iswrite = true
        }
        console.log('选中了！')
      }
    },
    limitChange(value, data, target) {
      console.log(value)
      console.log(data)
      console.log(target)
      if (data.children) { // 判断是否有子节点
        if (target === 'iswrite') { // 判断是写还是读 此为写
          if (value) { // 判断是选中还是取消 此为选中
            data.children.map(res => {
              res.isread = true
              res.iswrite = true
            })
          } else { // 此为取消
            data.iswrite = false
            data.children.map(res => {
              res.iswrite = false
            })
          }
        } else { // 读
          if (value) { // 判断是选中还是取消
            data.children.map(res => {
              res.isread = true
            })
          } else {
            data.iswrite = false
            data.children.map(res => {
              res.iswrite = false
              res.isread = false
            })
          }
        }
      } else { //  无子节点
        if (target === 'iswrite') { // 判断是写还是读 此为写
          if (value) { // 判断是选中还是取消 此为选中
            data.isread = true
            data.iswrite = true
          } else { // 此为取消
            data.iswrite = false
            data.isread = false
          }
        } else { // 读
          if (value) { // 判断是选中还是取消 此为选中
            data.isread = true
          } else { // 取消
            data.isread = false
            data.iswrite = false
          }
        }
      }
      this.$set(data, target, value)
    },
    // 返回列表
    backList() {
      this.$emit('view', 'list')
    },
    //
    holdPower() {

    }
  }
}
</script>

