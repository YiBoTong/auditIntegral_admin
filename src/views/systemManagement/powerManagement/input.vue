<!--
****--@date     2018-12-04 16:08
****--@author   XXL
****--@describe 权限管理input
-->
<template>
  <el-card v-loading="showLoading" class="power-input-container">
    <div slot="header" class="card-header">
      <el-row>
        <el-col :span="8">
          <el-button type="text" disabled>权限管理（{{ this.$route.query.value }}）</el-button>
        </el-col>
        <el-col :span="16" align="right">
          <el-button @click="backList('powerManagement')">返回</el-button>
          <el-button type="primary" size="small" @click="holdPower">保存</el-button>
        </el-col>
      </el-row>
    </div>
    <el-tree
      :props="struct"
      :data="treeData"
      :expand-on-click-node="false"
      node-key="id"
      default-expand-all
    >
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <span>{{ $t(`route.${node.label}`) }}</span>
        <span>
          <el-checkbox
            :disabled="rabcKey==='admin' && !!~[18,19,20,21,22,23].indexOf(data.id)"
            :value="data.isRead"
            label="读"
            @input="value => limitChange(value, data, 'isRead')"/>
          <el-checkbox
            :disabled="rabcKey==='admin' && !!~[18,19,20,21,22,23].indexOf(data.id)"
            :value="data.isWrite"
            label="写"
            @input="value => limitChange(value, data, 'isWrite')"/>
        </span>
      </span>
    </el-tree>
  </el-card>
</template>
<script>
/* 当前组件必要引入 */
import { editRabc, getRabc } from '@/api/systemManagement'

export default {
  name: 'PowerManagementInput',
  components: {},
  // props: {},
  data() {
    return {
      treeData: [],
      struct: {
        label: 'title',
        children: 'children',
        isLeaf: 'leaf'
      },
      rabcKey: null,
      routerQuery: null
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
      const { key } = this.$route.query
      this.rabcKey = key
      this.routerQuery = this.decodeURI(this.$route.query)
      console.log(this.$route.query)
      this.getPowerMenu()
    },
    // 获取权限菜单
    getPowerMenu() {
      getRabc({ key: this.rabcKey }).then(res => {
        if (!res.status.error) {
          let data = res.data
          data = data.filter(item => item.children)
          data.map(res => {
            if (res.children.length === 1) {
              // res.id = res.children[0].id
              res.title = res.children[0].title
              delete res.children
            }
          })
          this.treeData = data
        } else {
          this.$message.error(res.status.msg)
        }
        this.showLoading = false
      })
    },
    limitChange(value, data, target) {
      console.log(data)
      if (data.children) { // 判断是否有子节点
        if (target === 'isWrite') { // 判断是写还是读 此为写
          if (value) { // 判断是选中还是取消 此为选中
            data.isRead = true
            data.children.map(res => {
              res.isRead = true
              res.isWrite = true
            })
          } else { // 此为取消
            data.isWrite = false
            data.children.map(res => {
              res.isWrite = false
            })
          }
        } else { // 读
          if (value) { // 判断是选中还是取消
            data.children.map(res => {
              res.isRead = true
            })
          } else {
            data.isWrite = false
            data.children.map(res => {
              res.isWrite = false
              res.isRead = false
            })
          }
        }
      } else { //  无子节点
        if (target === 'isWrite') { // 判断是写还是读 此为写
          if (value) { // 判断是选中还是取消 此为选中
            data.isRead = true
            data.isWrite = true
          } else { // 此为取消
            data.isWrite = false
          }
        } else { // 读
          if (value) { // 判断是选中还是取消 此为选中
            data.isRead = true
          } else { // 取消
            data.isRead = false
            data.isWrite = false
          }
        }
      }
      this.$set(data, target, value)
    },
    // 保存
    holdPower() {
      console.log(this.treeData)
      const data = this.treeData
      const editData = []
      data.map(item => {
        const { id: menuId, isRead, isWrite } = item
        editData.push({ menuId, isRead, isWrite })
        if (item.children) {
          item.children.map(sItem => {
            const { id: menuId, isRead, isWrite } = sItem
            editData.push({ menuId, isRead, isWrite })
          })
        }
      })
      console.log(editData)
      editRabc({ key: this.rabcKey, rbac: editData }).then(res => {
        if (!res.status.error) {
          this.$message({
            type: 'success',
            message: `${res.status.msg}!`
          })
          this.getPowerMenu()
        } else {
          this.$message({
            type: 'error',
            message: `${res.status.msg}!`
          })
        }
      })
    }
  }
}
</script>

