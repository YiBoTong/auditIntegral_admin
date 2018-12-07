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
        node-key="id"
        default-expand-all
      >
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <span>{{ $t(`route.${node.label}`) }}</span>
          <span>
            <el-checkbox :value="data.isRead" label="读" @input="value => limitChange(value, data, 'isRead')" />
            <el-checkbox :value="data.isWrite" label="写" @input="value => limitChange(value, data, 'isWrite')" />
          </span>
        </span>
      </el-tree>
    </el-card>
  </div>
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
      treeData: []
    }
  },
  created() {
    this.getPowerMenu()
    this.init()
  },
  mounted() {
  },
  methods: {
    // 初始化
    init() {
      console.log(this.paramsData)
    },
    // 根据角色权限默认选中
    // getTreeId(data) {
    //   // 循环树结构的最外层
    //   // console.log(data)
    //   for (let i = 0, length = data.length; i < length; i++) {
    //     // 判断是否有子节点
    //     if (data[i].children) {
    //       for (let n = 0, length = data[i].children.length; n < length; n++) {
    //         if (data[i].children[n].isRead || data[i].children[n].isWrite) {
    //           this.treeId.push(data[i].children[n].id)
    //         }
    //       }
    //     } else { // 没有则判断是否具有读或写的权限
    //       if (data[i].isRead || data[i].isWrite) {
    //         this.treeId.push(data[i].id)
    //       }
    //     }
    //   }
    //   // console.log(this.treeId)
    // },
    // 获取权限菜单
    getPowerMenu() {
      getRabc({ key: this.paramsData.key }).then(res => {
        const data = res.data
        console.log(data)
        data.map(res => {
          console.log(res)
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
      })
    },
    // 读写选择
    // handleCheck(data, node) {
    //   // console.log(node)
    //   // console.log(data)
    //   // 判断是选中还是取消
    //   if (node.checkedKeys.indexOf(data.id) === -1) {
    //     console.log('取消选中了！')
    //     if (data.children) {
    //       data.isRead = false
    //       data.isWrite = false
    //       data.children.map(res => {
    //         res.isRead = false
    //         res.isWrite = false
    //       })
    //     } else {
    //       data.isRead = false
    //       data.isWrite = false
    //     }
    //   } else {
    //     if (data.children) {
    //       data.isRead = true
    //       data.isWrite = true
    //       data.children.map(res => {
    //         res.isRead = true
    //         res.isWrite = true
    //       })
    //     } else {
    //       data.isRead = true
    //       data.isWrite = true
    //     }
    //     console.log('选中了！')
    //   }
    // },
    // 多选框
    limitChange(value, data, target) {
      // console.log(value)
      // console.log(data)
      // console.log(target)
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

