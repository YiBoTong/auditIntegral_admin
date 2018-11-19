<template>
  <div class="system-log-container">
    <div class="system-log-top">
      <div class="top-form">
        <el-form>
          <el-form-item label="系统日志:">
            <el-input placeholder="请输入"
                      prefix-icon="el-icon-search"></el-input>
            <el-button type="primary"
                       plain>搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="public-table">
      <el-table :data="paramsData"
                style="width: 100%">
        <el-table-column prop="title"
                         label="日志分类key">
        </el-table-column>
        <el-table-column prop="title"
                         label="日志分类名称">
        </el-table-column>
        <el-table-column prop="notificationScope"
                         label="操作人姓名">
        </el-table-column>
        <el-table-column prop="state"
                         label="日志信息">
        </el-table-column>
        <el-table-column prop="finalOperationTime"
                         label="最后操作日期">
        </el-table-column>
        <el-table-column prop="date"
                         label="操作">
          <template slot-scope="scope">
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
import { logList, logDelete } from '@/api/systemManagement'

export default {
  name: 'systemLogList',
  props: [],
  data() {
    return {
      paramsData: undefined,
      logListData: {
        id: '',
        type: '',
        typeTitle: '',
        userId: '',
        userName: '',
        msg: '',
        time: ''
      }
    };
  },
  methods: {
    // 初始化
    init() {
      Axios.get('../../static/mock/tableData.json').then(this.getTableData);
      logList().then(res => {
      })
    },
    // 获取table数据
    getTableData(res) {
      this.paramsData = res.data.noticeBulletinData;
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
