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
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }],
  code: [{ required: true, message: '请输入部门编码', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
  address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
  userName: [{ required: true, message: '请选择人员', trigger: 'blur' }],
  type: [{ required: true, message: '请选择角色', trigger: 'blur' }]
}
export {
  userRules,
  programmeRules,
  noticeRules,
  departmentRules
}
