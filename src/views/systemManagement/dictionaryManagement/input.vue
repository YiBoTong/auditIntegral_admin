<template>
  <div class="form-container">
    <div v-if="paramsData === 'add'">
      <div class="form-header">
        <div class="header-left">
          <el-button @click="backList">返回列表</el-button>
        </div>
        <div class="header-right">
          <el-button type="primary"
                     @click="submitForm(formData)">添加</el-button>
          <el-button @click="resetForm('refForm')">重置</el-button>
        </div>
      </div>
      <el-form :model="formData"
               ref="refForm"
               label-width="100px">
        <el-form-item label="类型标题"
                      prop="title">
          <el-input type="text"
                    v-model="formData.title"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="是否启用"
                      prop="notificationScope">
          <el-input type="text"
                    v-model="formData.notificationScope"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="更新时间"
                      prop="notificationScope">
          <el-input type="text"
                    v-model="formData.notificationScope"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="描述"
                      prop="notificationScope">
          <el-input type="text"
                    v-model="formData.notificationScope"
                    clearable></el-input>
        </el-form-item>
      </el-form>
      <div class="dict-title"><span>字典</span></div>
      <div class="dict-form">
        <el-form :model="formData.dictionaries"
                 ref="form"
                 label-width="80px">
          <el-form-item label="键">
            <el-input v-model="formData.dictionaries.key"></el-input>
          </el-form-item>
          <el-form-item label="值">
            <el-input v-model="formData.dictionaries.value"></el-input>
          </el-form-item>
          <el-form-item label="顺序">
            <el-input v-model="formData.dictionaries.order"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="formData.dictionaries.describe"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="text"
                       size="medium"><i class="el-icon-edit"></i>修改</el-button>
            <el-button type="text"
                       size="medium"><i class="el-icon-delete"></i>删除</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-else>
      <div class="form-header">
        <div class="header-left">
          <el-button @click="backList">返回列表</el-button>
        </div>
        <div class="header-right">
          <el-button type="primary"
                     @click="submitForm(formData)">修改</el-button>
          <el-button @click="resetForm('refForm')">重置</el-button>
        </div>
      </div>
      <el-form :model="formData"
               ref="refForm"
               label-width="100px">
        <el-form-item label="标题"
                      prop="title">
          <el-input type="text"
                    v-model="formData.title"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="发布范围"
                      prop="notificationScope">
          <el-input type="text"
                    v-model="formData.notificationScope"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="状态"
                      prop="state">
          <el-input type="text"
                    v-model="formData.state"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="最后操作时间"
                      prop="finalOperationTime">
          <el-input type="text"
                    v-model="formData.finalOperationTime"
                    clearable></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
/* 当前组件必要引入 */
export default {
  name: 'dictionaryManagementInput',
  props: {
    paramsData: String
  },
  data() {
    return {
      formData: {
        title: '',
        isUse: '',
        updateTime: '',
        describe: '',
        dictionaries: [
          {
            key: ''
          },
          {
            value: ''
          },
          {
            order: ''
          },
          {
            describe: ''
          }
        ]
      }
    };
  },
  methods: {
    // 初始化
    init() {
    },
    // 返回列表
    backList() {
      this.$emit('view', 'list');
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 提交表单
    submitForm(data) {
      console.log(data);
    }
  },
  created() {
    this.init();
  },
  mounted() {
  },
  components: {}
};

</script>
