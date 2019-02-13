<!--
****--@date     2018-11-22 11:27
****--@author   XXL
****--@describe 添加 or 编辑
-->
<template>
  <div v-loading="showLoading">
    <el-card class="editMainBox">
      <div slot="header" class="card-header">
        <el-row>
          <el-col :span="12">
            <el-button type="text" disabled>{{ todoType | typeText }}部门/网点</el-button>
          </el-col>
          <el-col :span="12" align="right">
            <el-button type="text" @click="backList('departmentManagement')">返回列表</el-button>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-form
          ref="refForm"
          :model="formData"
          :rules="departmentRules"
          label-width="120px"
          class="department-form">
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 8}">
            <el-form-item
              label="上级部门/网点"
              prop="parentDepName">
              <el-input
                v-model="formData.parentDepName"
                type="text"
                clearable
                placeholder="请点击选择部门"
                @focus="selectDepartment"/>
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 8}">
            <el-form-item
              label="部门/网点名称"
              prop="name">
              <el-input
                v-model="formData.name"
                type="text"
                placeholder="请输入部门/网点名称"
                clearable />
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 8}">
            <el-form-item
              label="部门编码"
              prop="code">
              <el-input
                v-model="formData.code"
                type="text"
                placeholder="请输入部门编码"
                clearable />
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 12}"
            :md="{span: 12}"
            :lg="{span: 8}"
            :xl="{span: 8}">
            <el-form-item
              label="联系方式"
              prop="phone">
              <el-input
                v-model="formData.phone"
                type="text"
                placeholder="请输入联系方式"
                clearable />
            </el-form-item>
          </el-col>
          <el-col
            :xs="{span: 24}"
            :sm="{span: 24}"
            :md="{span: 24}"
            :lg="{span: 16}"
            :xl="{span: 16}">
            <el-form-item
              label="地址"
              prop="address">
              <el-input
                v-model="formData.address"
                type="text"
                placeholder="请输入地址"
                clearable />
            </el-form-item>
          </el-col>

        </el-form>
      </el-row>
      <hr>
      <br>
      <h3>相关人员</h3>
      <br>
      <el-row>
        <el-form
          v-for="(user,index) in formData.userList"
          :key="index"
          :ref="'departmentForm'+index"
          :model="user"
          :rules="departmentRules"
          label-width="100px"
          class="person-form">
          <el-col>
            <el-col
              :xs="{span: 24}"
              :sm="{span: 12}"
              :md="{span: 12}"
              :lg="{span: 8}"
              :xl="{span: 8}">
              <el-form-item
                label="姓名"
                prop="userName">
                <el-input
                  v-model="user.userName"
                  :disabled="user.userId<0"
                  clearable
                  placeholder="点击选择人员"
                  @focus="selectPersonnel(index)"/>
              </el-form-item>
            </el-col>
            <el-col
              :xs="{span: 24}"
              :sm="{span: 12}"
              :md="{span: 12}"
              :lg="{span: 8}"
              :xl="{span: 8}">
              <el-form-item
                label="角色"
                prop="type">
                <el-select :disabled="user.userId<0" v-model="user.type" placeholder="请选择角色" clearable>
                  <el-option
                    v-for="item in dictRoles"
                    :key="item.id"
                    :label="item.describe"
                    :value="item.key"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              :xs="{span: 24}"
              :sm="{span: 12}"
              :md="{span: 12}"
              :lg="{span: 8}"
              :xl="{span: 8}">
              <el-form-item>
                <el-button
                  type="text"
                  size="medium"
                  @click="addPerson"><i class="el-icon-plus" />添加
                </el-button>
                <el-button
                  :disabled="formData.userList.length === 1 || user.userId<0"
                  type="text"
                  size="medium"
                  @click="delPerson(index)"><i class="el-icon-delete" />删除
                </el-button>
              </el-form-item>
            </el-col>
          </el-col>
        </el-form>
      </el-row>
      <div align="center">
        <el-button type="primary" @click="submitForm(formData)">保存</el-button>
      </div>
    </el-card>
    <personnel-dialog v-if="PerVisible" :select-one="true" :visible.sync="PerVisible" :width="width" :title="title" :form-index="formIndex" @personnel="onPersonnel"/>
    <department-dialog v-if="depVisible" :select-one="true" :visible.sync="depVisible" :width="width" :title="title" :show-checkbox="true" @department="onDepartment"/>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import PersonnelDialog from '@/components/PersonnelDialog/personnelDialog'
import DepartmentDialog from '@/components/DepartmentDialog/departmentDialog'
import { departmentAdd, departmentEdit, departmentGet } from '@/api/organizationalManagement'
import { dictGet } from '@/api/systemManagement'
import { departmentRules } from '@/utils/rules'

export default {
  name: 'DepartmentManagementInput',
  components: { PersonnelDialog, DepartmentDialog },
  // props: {},
  data() {
    return {
      departmentRules,
      depVisible: false,
      PerVisible: false,
      formIndex: '',
      width: '',
      title: '',
      todoType: 'Add',
      formData: {
        parentId: '',
        parentDepName: '',
        name: '',
        code: '',
        level: '',
        address: '',
        phone: '',
        userList: []
      },
      dictRoles: []
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
      this.getDcitole()
      const data = this.decodeURI(this.$route.query)
      console.log(data)
      // 判断是添加 还是 修改
      if (data && data.updateTime) { // 修改
        console.log('修改')
        this.todoType = 'Edit'
        const { id } = this.$route.query
        this.departmentGet(id)
      } else { // 选择部门后进入添加
        if (data.leaf) {
          console.log('选择部门进入添加')
          this.formData.parentDepName = data.name
          this.formData.parentId = data.id
          this.addPerson()
          this.showLoading = false
        } else { // 没选择部门进入添加
          console.log('没选择部门进入添加')
          this.formData.parentDepName = data.name
          this.formData.parentId = -1
          this.addPerson()
          this.showLoading = false
        }
      }
    },
    // 选择人员
    selectPersonnel(value) {
      this.PerVisible = true
      this.width = '900px'
      this.title = '选择人员'
      this.formIndex = value.toString()
    },
    // 获取角色
    getDcitole() {
      dictGet({ id: -2 }).then(res => {
        this.dictRoles = res.data.dictionaries
      })
    },
    // 选择部门dialog
    selectDepartment() {
      this.depVisible = true
      this.width = '600px'
      this.title = '选择部门'
    },
    // dialog获取的指定部门
    onDepartment(data) {
      this.formData.parentDepName = data.name
      this.formData.parentId = data.id
    },
    // dialog获取的人员
    onPersonnel(data) {
      this.formData.userList[data.index].userName = data[0].userName
      this.formData.userList[data.index].userId = data[0].userId
    },
    // 获取部门
    departmentGet(id) {
      departmentGet({ id: id }).then(res => {
        const data = res.data || []
        if (!res.status.error) {
          if (data.parentId === -1) {
            data['parentDepName'] = '根部门/网点'
          }
          this.formData = data
          if (!data.userList.length) {
            this.addPerson()
          }
        } else {
          this.$message({
            type: 'error',
            message: res.status.msg + '!'
          })
        }
        this.showLoading = false
      })
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 提交表单
    submitForm() {
      // this.listLoading = true
      console.log(this.formData)
      this.$refs.refForm.validate(valid => {
        if (!valid) return false
        const data = Object.assign({}, this.formData)
        // data.dictionaries.map((item, index) => item.order = index + 1)
        data.userList.map(function(item, index) {
          item.order = index + 1
          return item.order
        })
        this[this.todoType.toLocaleLowerCase() + 'Dictionaries'](data)
      })
    },
    // 创建
    addDictionaries(data) {
      departmentAdd(data).then((res) => {
        this.$message({
          type: res.status.error ? 'error' : 'success',
          message: res.status.msg + '!'
        })
        if (!res.status.error) {
          this.backList('departmentManagement')
        }
      })
    },
    // 编辑
    editDictionaries(data) {
      departmentEdit(data).then((res) => {
        this.$message({
          type: res.status.error ? 'error' : 'success',
          message: res.status.msg + '!'
        })
        if (!res.status.error) {
          this.backList('departmentManagement')
        }
      })
    },
    // 添加负责人
    addPerson() {
      this.formData.userList.push({
        userName: '',
        userId: '',
        type: ''
      })
    },
    // 删除负责人
    delPerson(index) {
      this.formData.userList.splice(index, 1)
    }
  }
}

</script>
