<template>
  <div class="dictionary-management-container">
    <div class="dictionary-management-top">
      <div class="top-create">
        <el-button type="primary"
                   plain
                   @click="handelUpdateOrCreate('add')">添加</el-button>
      </div>
      <div class="top-form">
        <el-form>
          <el-form-item label="字典:">
            <el-input placeholder="请输入字典"
                      prefix-icon="el-icon-search"></el-input>
            <el-button type="primary"
                       plain>搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="public-table">
      <el-table :data="paramsData"
                style="width: 100%"
                :cell-style="cellStyle"
                @cell-click="cellClick">
        <el-table-column prop="date"
                         label="字典类型名称">
        </el-table-column>
        <el-table-column prop="title"
                         label="是否启用">
        </el-table-column>
        <el-table-column prop="notificationScope"
                         label="最后更新时间">
        </el-table-column>
        <el-table-column prop="state"
                         label="字典类型描述">
        </el-table-column>
        <el-table-column prop="finalOperationTime"
                         label="更新人姓名">
        </el-table-column>
        <el-table-column prop="date"
                         label="操作"
                         align="center">
          <template slot-scope="scope">
            <el-button @click="handlePublish(scope.row)"
                       type="text"
                       size="small">发布</el-button>
            <el-button type="text"
                       size="small"
                       @click="handelUpdateOrCreate('edit')">修改</el-button>
            <el-button @click="handleDelete(scope.row)"
                       type="text"
                       size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="public-pagination">
      <pagination :total="400"
                  @pagination="paginationEmit"></pagination>
    </div>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import Axios from 'axios';
import Pagination from '@/components/Pagination/index';
import { loginList, loginAdd, loginEdit, loginDelete } from '@/api/systemManagement'
export default {
  name: 'dictionaryManagementList',
  props: [],
  data() {
    return {
      paramsData: undefined
    };
  },
  methods: {
    // 初始化
    init() {
      Axios.get('../../static/mock/tableData.json').then(this.getTableData);
    },
    // 获取table数据
    getTableData(res) {
      this.paramsData = res.data.noticeBulletinData;
    },
    // 发布
    handlePublish() {
    },
    // 修改 或 创建
    handelUpdateOrCreate(obj) {
      this.publishSubscribe('input', obj);
    },
    // 向父组件传递信息
    publishSubscribe(type, obj) {
      this.$emit('view', type, obj);
    },
    // 删除
    handleDelete(row) {
      this.$confirm('确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用删除接口
        logDelete({ id: 1 }).then(res => {
          if (res) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          } else {
            this.$message({
              type: 'error',
              message: '删除失败，请重试!'
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 设置单元格style
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return 'color:#409EFF;cursor: pointer;';
      } else {
        return '';
      }
    },
    // 点击查看
    cellClick(row, column, cell, event) {
      if (column.property === 'title') {
        this.publishSubscribe('show', row);
      } else {
        return '';
      }
    },
    // 分页子组件传递过来的信息
    paginationEmit(page, limit) {
      console.log(page, limit)
    }
  },

  created() {
    this.init();
  },
  mounted() {
  },
  components: { Pagination }
};

</script>
