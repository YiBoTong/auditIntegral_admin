import { numberConvertToUppercase } from '../filters'
// 菜单id的读写对应关系(控制台、引导页、个人中心)
const menuIdObj = { 2: 1, 4: 3, 6: 5 }
const util = {
  data() {
    return {
      // 以下都是对当前菜单的操作
      authorEdit: false, // 是否可用编辑
      authorAdminEdit: false, // 领导是否可用编辑

      writeRoules: [], // 可写的角色集

      tableLoading: true, // 表格加载中
      showLoading: true, // 显示加载ing
      hasDepTree: true, // 是否显示部门树

      department: null // 当前点击的部门信息
    }
  },
  activated() {
    if (this.listData !== null && typeof this['getListData'] === 'function') {
      this.getListData()
    }
  },
  methods: {
    // 鉴权
    getAuthorEdit(route) {
      if (route && route.meta) {
        const id = route.meta.id
        const rbac = this.$store.getters['rbac'](menuIdObj[id] || id) || { isWrite: [], isRead: [] }
        this.authorEdit = rbac.isWrite.length > 0
        this.writeRoules = rbac.isWrite
        console.log(JSON.stringify(rbac), id)
      }
    },
    // 小写数字转换成大写, 只处理到[0 ~ 99]
    numberConvertToUppercase(num) {
      return numberConvertToUppercase(num)
    },
    // 首字母大写
    firstUpperCase([first, ...rest]) {
      return first.toUpperCase() + rest.join('')
    },
    // 获取头像
    getUserPic() {
      const info = this.$store.state.user.userInfo
      let imageUrl = '/static/img/at.jpg'
      if (info.portraitId && info.portraitFile.id) {
        imageUrl = '/file/' + info.portraitFile.path + info.portraitFile.fileName + '.' + info.portraitFile.suffix
      }
      return imageUrl
    },
    // 加载部门后如果无数据则隐藏部门树并请求列表数据
    loadDep(arr, userDep) {
      this.department = userDep
      console.log(userDep)
      if (!arr.length && this.hasDepTree) {
        this.hasDepTree = false
      }
      if (this.listData === null) {
        this.getListData()
      }
    },
    departmentClick(data) {
      this.department = data
      if (typeof this['getListData'] === 'function') {
        this.getListData()
      }
    }
  }
}

export default util
