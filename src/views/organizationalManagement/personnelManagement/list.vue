<!--
****--@date     2018-11-09 10:49
****--@author   XXL
****--@describe 机构管理-通知公告
-->
<template>
  <div class="notice-container">
    <div class="notice-top">
      <div class="top-create">
        <el-button type="primary" plain @click="inputNotice(null)">创建</el-button>
      </div>
      <div class="top-form">
        <el-form>
          <el-form-item label="标题:">
            <el-input placeholder="请输入公告标题"></el-input>
            <el-button type="primary" plain>搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="public-table">
      <el-table
        :data="paramsData"
        style="width: 100%">
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
            <el-button @click="handleClick(scope.row)" type="text" size="small">发布</el-button>
            <el-button type="text" size="small" @click="inputNotice(scope.row)">修改</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
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
    <div class="notice-pagination">
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
  export default {
    name: 'noticeList',
    props: {
      paramsData: Array
    },
    data () {
      return {};
    },
    methods: {
      // 初始化
      init () {
        console.log(this.paramsData);
      },
      inputNotice (obj) {
        this.todoNotice('input', obj);
      },
      todoNotice (type, obj) {
        this.$emit('view', type, obj);
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
