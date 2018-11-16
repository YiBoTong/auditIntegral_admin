<!--
****--@date     2018-11-09 10:49
****--@author   XXL
****--@describe 机构管理-通知公告
-->
<template>
  <div class="system-log-container">
    <div class="system-log-top">
      <div class="top-create">
        <el-button type="primary" plain @click="handelUpdateOrCreate(null)">创建</el-button>
      </div>
      <div class="top-form">
        <el-form>
          <el-form-item label="系统日志:">
            <el-input placeholder="请输入" prefix-icon="el-icon-search"></el-input>
            <el-button type="primary" plain>搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="public-table">
      <el-table
        :data="paramsData"
        style="width: 100%"
        :cell-style="cellStyle"
        @cell-click="cellClick">
        <el-table-column
          prop="date"
          label="序号"
          type="index"
          width="180">
        </el-table-column>
        <el-table-column
          prop="date"
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-button @click="handlePublish(scope.row)" type="text" size="small">发布</el-button>
            <el-button type="text" size="small" @click="handelUpdateOrCreate(scope.row)">修改</el-button>
            <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="notificationScope"
          label="通知范围">
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态">
        </el-table-column>
        <el-table-column
          prop="finalOperationTime"
          label="最后操作日期">
        </el-table-column>
      </el-table>
    </div>
    <div class="system-log-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  /* 当前组件必要引入 */
  import Axios from 'axios';

  export default {
    name: 'systemLogList',
    props: [],
    data () {
      return {
        paramsData: undefined
      };
    },
    methods: {
      // 初始化
      init () {
        Axios.get('../../static/mock/tableData.json').then(this.getTableData);
      },
      // 获取table数据
      getTableData (res) {
        this.paramsData = res.data.noticeBulletinData;
      },
      // 发布
      handlePublish () {
      },
      // 修改 或 创建
      handelUpdateOrCreate (obj) {
        this.publishSubscribe('input', obj);
      },
      // 向父组件传递信息
      publishSubscribe (type, obj) {
        this.$emit('view', type, obj);
      },
      // 删除
      handleDelete (row) {
        // 调用删除接口
        this.$confirm('确定删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 设置单元格style
      cellStyle ({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 2) {
          return 'color:#409EFF;cursor: pointer;';
        } else {
          return '';
        }
      },
      // 点击查看
      cellClick (row, column, cell, event) {
        if (column.property === 'title') {
          this.publishSubscribe('show', row);
        } else {
          return '';
        }
      }
    },
    created () {
      this.init();
    },
    mounted () {
    },
    components: {}
  };

</script>
