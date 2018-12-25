<!--
****--@date     2018-12-24 10:20
****--@author   xxl
****--@describe 选择人员对话框
-->
<template>
  <div class="select-programme-container">
    <el-dialog
      :visible="visible"
      :title="title"
      :width="width"
      :form-index="formIndex"
      :before-close="headleClose"
      close-on-press-escape>
      <div class="programme-select">
        <div>
          <el-form
            v-model="search"
            :inline="true">
            <el-form-item label="审计方案">
              <el-input
                v-model="search.title"
                placeholder="请输入"
                prefix-icon="el-icon-search"
                clearable />
            </el-form-item>
            <el-button
              type="primary"
              plain
              @click="getListData">搜索
            </el-button>
          </el-form>
        </div>
        <div class="public-table">
          <el-table
            :data="listData"
            :cell-style="cellStyle"
            highlight-current-row
            @cell-click="cellClick">
            <el-table-column
              prop="title"
              label="方案标题"/>
          </el-table>
        </div>
        <div class="public-pagination">
          <pagination
            :total="paginationPage.total"
            :page="paginationPage.page"
            :limit="paginationPage.size"
            :page-sizes="pageSizes"
            @pagination="paginationEmit"/>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="headleClose">取消</el-button>
        <el-button type="primary" @click="headleClosed">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import OrgLayout from '@/components/OrgLayout/index'
import OrgTree from '@/components/OrgTree/index'
import Pagination from '@/components/Pagination/index'
import { programmeSelectList } from '@/api/auditManagement'

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
    }
  },
  data() {
    return {
      listData: [],
      department: null,
      programmeData: '',
      paginationPage: {
        total: 0,
        page: 1,
        size: 20
      },
      pageSizes: [10, 20, 30, 40, 50],
      search: {
        'title': ''
      }
    }
  },
  created() {
    this.init()
  },
  activated() {
    this.getListData()
  },
  methods: {
    // 初始化
    init() {
      this.getListData()
    },
    // 获取table数据
    getListData() {
      programmeSelectList({ page: this.paginationPage, search: this.search }).then(res => {
        this.listData = res.data || []
        this.paginationPage = res.page
      })
    },
    // 点击关闭dialog
    headleClose() {
      this.$emit('update:visible', false)
    },
    // 确定选择人员
    headleClosed() {
      console.log(this.programmeData)
      if (this.programmeData) {
        this.$emit('select', this.programmeData)
        this.$emit('update:visible', false)
      } else {
        this.$message({
          type: 'error',
          message: '请选择方案！'
        })
      }
    },
    // 分页子组件传递过来的信息
    paginationEmit(paginationInfo) {
      this.paginationPage.page = paginationInfo.page
      this.paginationPage.size = paginationInfo.limit
      this.getListData()
    },
    // 设置单元格style
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return 'color:#409EFF;cursor: pointer;'
      } else {
        return ''
      }
    },
    // 点击选择人
    cellClick(row, column, cell, event) {
      this.programmeData = row
    }
  }
}

</script>
<style lang="scss">
  .select-programme-container {
    .el-dialog {
      height: calc(100vh - 200px);
    }
    .el-dialog__body{
      max-height: calc(100vh - 200px - 54px - 66px);
    }
    .public-table{
      height: calc(100vh - 200px - 120px - 170px);
      width: 100%;
      .el-table {
        height: calc(100vh - 200px - 120px - 170px);
        min-height: calc(100vh - 200px - 120px - 170px);
      }
    }
  }
</style>
