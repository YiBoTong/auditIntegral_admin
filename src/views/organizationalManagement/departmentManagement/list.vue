<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 部门列表
-->
<template>
  <div class="department-list-container">
    <div class="left-tree-container">
      <tree
        :tree-data="treeData"
        @tree="treeEmit" />
    </div>
    <div class="right-table-container">
      <el-button
        type="primary"
        @click="handelAddOrEdit(null)">添加部门</el-button>
      <div class="public-table">
        <el-table
          :data="paramsData"
          height="100%">
          <el-table-column
            prop="title"
            label="部门编码" />
          <el-table-column
            prop="title"
            label="部门编码" />
          <el-table-column
            prop="notificationScope"
            label="部门级别" />
          <el-table-column
            prop="state"
            label="地址" />
          <el-table-column
            prop="finalOperationTime"
            label="联系方式" />
          <el-table-column
            prop="finalOperationTime"
            label="更新时间" />
          <el-table-column
            prop="date"
            label="操作"
            align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="handleDelete(scope.row)">删除</el-button>
              <el-button
                type="text"
                size="small"
                @click="handelAddOrEdit(scope.row)">管理</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import Axios from 'axios'
import Pagination from '@/components/Pagination/index'
import Tree from '@/components/Tree/index'
import { orgList, orgDelete } from '@/api/organizationalManagement'

export default {
  name: 'LoginManagementList',
  // props: [],
  components: { Pagination, Tree },
  data() {
    return {
      paramsData: [],
      treeData: [{
        label: '部门管理',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }, {
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }, {
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }, {
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }, {
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }, {
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }, {
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }, {
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }, {
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }, {
          label: '二级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '二级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }, {
              label: '三级 3-2-1'
            }, {
              label: '三级 3-2-1'
            }, {
              label: '三级 3-2-1'
            }, {
              label: '三级 3-2-1'
            }, {
              label: '三级 3-2-1'
            }, {
              label: '三级 3-2-1'
            }, {
              label: '三级 3-2-1'
            }, {
              label: '三级 3-2-1'
            }, {
              label: '三级 3-2-1'
            }, {
              label: '三级 3-2-1'
            }, {
              label: '三级 3-2-1'
            }, {
              label: '三级 3-2-1'
            }]
          }]
        }]
      }]
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
      Axios.get('../../static/mock/tableData.json').then(this.getTableData)
      orgList().then(res => {

      })
    },
    // 获取table数据
    getTableData(res) {
      this.paramsData = res.data.noticeBulletinData
    },
    // 发布
    handlePublish() {
    },
    // 修改 或 创建
    handelAddOrEdit(obj) {
      this.publishSubscribe('input', obj)
      console.log(obj)
    },
    // 向父组件传递信息
    publishSubscribe(type, obj) {
      this.$emit('view', type, obj)
    },
    // 删除
    handleDelete(row) {
      this.$confirm('确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用删除接口
        orgDelete({ id: 1 }).then(res => {
          if (res) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.$message({
              type: 'error',
              message: '删除失败，请重试!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // tree子组件传递过来的数据
    treeEmit(label, value) {
      console.log(label, value)
    }
  }
}

</script>
