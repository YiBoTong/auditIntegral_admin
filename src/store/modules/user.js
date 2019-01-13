import { logout, getUserInfo } from '@/api/login'
import { getToken, removeToken } from '@/utils/auth'
import { dictionaries } from '../../filters'

function getRbac(rbacArr) {
  const menu = {}
  rbacArr.map(item => {
    const { key, isRead, isWrite } = item
    if (!menu[item.menuId]) {
      menu[item.menuId] = {
        isRead: [],
        isWrite: []
      }
    }
    // 角色对菜单的读写配置
    isRead && menu[item.menuId].isRead.push(key)
    isWrite && menu[item.menuId].isWrite.push(key)
  })
  return menu
}

const user = {
  state: {
    user: '',
    userInfo: null,
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    },
    rbac: null
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_RBAC: (state, code) => {
      state.rbac = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USERINFO: (state, userInfo = null) => {
      state.userInfo = userInfo
    }
  },

  actions: {
    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(res => {
          const rbacObj = getRbac(res.data.rbacList)
          const ids = Object.keys(rbacObj).map(i => Number(i))
          commit('SET_USERINFO', res.data)
          // 生成菜单对应的读写权限配置
          commit('SET_RBAC', rbacObj)
          // 获取系统所需字典
          '1'.repeat(11).split('').map((_, index) => { dictionaries(this, '', '-' + (index + 1)) })
          // 加载系统配置：机构信息
          this.dispatch('GetCom')
          // 获取菜单
          // 动态修改权限后 重绘侧边菜单
          this.dispatch('GenerateRoutes', ids).then(index => resolve(index))
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
