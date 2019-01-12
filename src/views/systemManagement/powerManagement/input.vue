<!--
****--@date     2018-12-04 16:08
****--@author   XXL
****--@describe 权限管理input
-->
<template>
  <el-card class="power-input-container">
    <div slot="header" class="card-header">
      <el-row>
        <el-col :span="8">
          <el-button type="text">权限管理（{{ paramsData.value }}）</el-button>
        </el-col>
        <el-col :span="16" align="right">
          <el-button @click="backList">返回</el-button>
          <el-button type="primary" size="small" @click="holdPower">保存</el-button>
        </el-col>
      </el-row>
    </div>
    <el-tree
      v-loading="treeLoading"
      :data="treeData"
      :expand-on-click-node="false"
      node-key="id"
      default-expand-all
    >
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <span>{{ $t(`route.${node.label}`) }}</span>
        <span>
          <el-checkbox :disabled="paramsData.key==='admin' && !!~[18,19,20,21,22,23].indexOf(data.id)" :value="data.isRead" label="读" @input="value => limitChange(value, data, 'isRead')" />
          <el-checkbox :disabled="paramsData.key==='admin' && !!~[18,19,20,21,22,23].indexOf(data.id)" :value="data.isWrite" label="写" @input="value => limitChange(value, data, 'isWrite')" />
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
  props: {
    paramsData: {
      type: [Object, String],
      required: false,
      default: ''
    }
  },
  data() {
    return {
      treeLoading: false,
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
      this.getPowerMenu()
    },
    // 获取权限菜单
    getPowerMenu() {
      this.treeLoading = true
      getRabc({ key: this.paramsData.key }).then(res => {
        if (!res.status.error) {
          let data = res.data
          data = data.filter(item => item.children)
          data.map(res => {
            if (res.children.length > 1) {
              res.id = res.menuId
              delete res.key
              res.label = res.title
              for (const v in res.children) {
                res.children[v].label = res.children[v].title
                res.children[v].id = res.children[v].menuId
                delete res.children[v].key
              }
            } else {
              res.id = res.menuId
              for (const v in res.children) {
                res.label = res.children[v].title
              }
              delete res.key
              delete res.children
            }
          })
          this.treeData = data
          this.treeLoading = false
        } else {
          this.$message.error(res.status.msg)
          this.treeLoading = false
        }
      })
    },
    limitChange(value, data, target) {
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
    // 返回列表
    backList() {
      this.$emit('view', 'list')
    },
    // 保存
    holdPower() {
      console.log(this.treeData)
      const data = this.treeData
      const editData = []
      for (const v in data) {
        if (data[v].children) {
          editData.push({ menuId: data[v].menuId, isRead: data[v].isRead, isWrite: data[v].isWrite })
          for (const c in data[v].children) {
            editData.push({ menuId: data[v].children[c].menuId, isRead: data[v].children[c].isRead, isWrite: data[v].children[c].isWrite })
          }
        } else {
          editData.push({ menuId: data[v].menuId, isRead: data[v].isRead, isWrite: data[v].isWrite })
        }
      }
      console.log(editData)
      editRabc({ key: this.paramsData.key, rbac: editData }).then(res => {
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

