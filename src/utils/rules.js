const userRules = {
  name: [
    { required: true, message: '请输入活动名称', trigger: 'blur' },
    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
  ],
  region: [
    { required: true, message: '请选择活动区域', trigger: 'change' }
  ],
  date1: [
    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
  ],
  date2: [
    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
  ],
  type: [
    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
  ],
  resource: [
    { required: true, message: '请选择活动资源', trigger: 'change' }
  ],
  desc: [
    { required: true, message: '', trigger: 'blur' }
  ]
}
const programmeRules = {
  name: [
    { required: true, message: '请输入活动名称', trigger: 'blur' },
    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
  ],
  region: [
    { required: true, message: '请选择活动区域', trigger: 'change' }
  ],
  date1: [
    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
  ],
  date2: [
    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
  ],
  type: [
    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
  ],
  resource: [
    { required: true, message: '请选择活动资源', trigger: 'change' }
  ],
  title: [
    { required: true, message: '请输入方案标题', trigger: 'blur' }
  ]
}
// 机构管理
// 通知管理
const noticeRules = {
  title: [{ required: true, message: '请输入通知标题', trigger: 'blur' },
    { min: 3, max: 200, message: '长度在 2 到 200 个字符', trigger: 'blur' }]
}
// 部门管理
const departmentRules = {
  parentDepName: [{ required: true, message: '请选择跟部门/网点', trigger: 'blur' }],
  name: [{ required: true, message: '请输入部门/网点', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }],
  code: [{ required: false, message: '请输入部门编码', trigger: 'blur' },
    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }],
  phone: [{ required: false, message: '请输入联系方式', trigger: 'blur' }],
  address: [{ required: false, message: '请输入地址', trigger: 'blur' }],
  userName: [{ required: false, message: '请选择人员', trigger: 'blur' }],
  type: [{ required: false, message: '请选择角色', trigger: 'blur' }]
}
// 人员管理
const personnelRules = {
  userName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  userCode: [{ required: true, message: '请输入员工号', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }],
  departmentName: [{ required: true, message: '请选择农商行', trigger: 'blur' }]
}
// 管理办法
const methodsRules = {
  title: [{ required: true, message: '请输入文件标题', trigger: 'blur' },
    { min: 3, max: 200, message: '长度在 2 到 200 个字符', trigger: 'blur' }],
  number: [{ max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur' }],
  content: [{ required: true, message: '请至少输入一条', trigger: 'blur' }]
}
// 工作台待办
const todoRules = {
  title: [{ required: true, message: '请输入待办名称', trigger: 'blur' }]
}

export {
  userRules,
  programmeRules,
  noticeRules,
  departmentRules,
  personnelRules,
  methodsRules,
  todoRules
}
