<!--
****--@date     2018-12-01 10:04
****--@author   YC
****--@describe 选择人员对话框
-->
<template>
  <div class="personnel-container">
    <el-dialog
      :visible="visible"
      :title="title"
      :width="width"
      :form-index="formIndex"
      :before-close="headleClose"
      close-on-press-escape>
      <div class="personnel-select">
        <div class="department-tree">
          <org-tree :is-admin="showAll" @click="departmentClick" @load="loadDep"/>
        </div>
        <div class="personnel-table">
          <div align="right">
            <el-form
              :model="paramsTable.search"
              :inline="true">
              <el-form-item label="姓名">
                <el-input
                  v-model="paramsTable.search.userName"
                  placeholder="请输入"
                  clearable/>
              </el-form-item>
              <el-button
                type="primary"
                plain
                @click="getListData">搜索
              </el-button>
            </el-form>
          </div>
          <el-table
            :data="listData"
            height="340px"
            highlight-current-row
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55"/>
            <el-table-column
              prop="userName"
              label="姓名"/>
            <el-table-column
              prop="sex"
              label="性别">
              <template slot-scope="scope">
                {{ scope.row.sex | userChange }}
              </template>
            </el-table-column>
            <el-table-column
              prop="userCode"
              label="员工号"/>
          </el-table>
          <div class="public-pagination">
            <pagination
              :total="paginationPage.total"
              :page="paginationPage.page"
              :limit="paginationPage.size"
              :page-sizes="pageSizes"
              @pagination="paginationEmit"/>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="headleClose">取 消</el-button>
        <el-button type="primary" @click="headleClosed">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import OrgLayout from '@/components/OrgLayout/index'
import OrgTree from '@/components/OrgTree/index'
import { userList } from '@/api/organizationalManagement'
import Pagination from '@/components/Pagination/index'

export default {
  name: 'PersonnelDialog',
  components: { OrgLayout, OrgTree, Pagination },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    },
    formIndex: {
      type: String,
      default: ''
    },
    selectOne: {
      // 单多选（默认多选）
      type: Boolean,
      default: false
    },
    showAll: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      listData: null,
      department: null,
      personnelData: '',
      paramsTable: {
        page: {
          page: 1,
          size: 20
        },
        search: {
          userName: '',
          userCode: '',
          departmentId: '',
          sex: ''
        }
      },
      paginationPage: {
        total: 0,
        page: 1,
        size: 20
      },
      pageSizes: [10, 20, 30, 40, 50]
    }
  },
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    // 初始化
    init() {
      // this.getListData()
    },
    // 获取table数据
    getListData() {
      userList({
        page: this.paginationPage,
        search: this.paramsTable.search
      }).then(res => {
        this.paginationPage = res.page
        this.listData = res.data || []
      })
    },
    // 关闭对话的回调
    headleClose() {
      this.$emit('update:visible', false)
    },
    // 确定选择人员
    headleClosed() {
      const len = this.personnelData.length
      console.log(this.personnelData)
      if (this.personnelData) {
        if (this.selectOne) {
          // 判断单多选 默认多选 true为单选
          if (len > 1) {
            // 只能选择一位
            this.$message({
              type: 'info',
              message: '只能选择一位人员！'
            })
          } else {
            this.$emit('personnel', this.personnelData)
            this.$emit('update:visible', false)
          }
        } else {
          // 多选
          this.$emit('personnel', this.personnelData)
          this.$emit('update:visible', false)
        }
      } else {
        this.$message({
          type: 'error',
          message: '请选择人员！'
        })
      }
    },
    // 分页子组件传递过来的信息
    paginationEmit(paginationInfo) {
      this.paginationPage.page = paginationInfo.page
      this.paginationPage.size = paginationInfo.limit
      this.getListData()
    },
    // 选择人
    handleSelectionChange(val) {
      if (this.formIndex) {
        // 判断是否多个form 如果多个加入索引区别
        val['index'] = this.formIndex
      }
      this.personnelData = val
    },
    // 选择部门
    departmentClick(data) {
      console.log(data)
      this.department = data
      this.paramsTable.search.departmentId = data.id
      this.getListData()
    }
  }
}
</script>
<style lang="scss" scoped>
.personnel-container {
  .org-tree {
    height: 330px;
  }
  .personnel-select {
    display: flex;
    width: 100%;
    height: 450px;
  }
  .department-tree {
    width: 30%;
  }
  .personnel-table {
    margin-left: 10%;
    width: 60%;
  }
}
</style>
