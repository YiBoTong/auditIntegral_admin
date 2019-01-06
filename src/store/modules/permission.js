// import { asyncRouterMap, constantRouterMap } from '@/router'
// import { asyncRouterMap } from '@/router'
import { getMenu } from '../../api/login'

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
let menuIds = []
function filterAsyncRouter(routes) {
  let res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children)
      }
      res.push(tmp)
    }
  })
  res = res.filter(item => (item.hasChild && item.children) || item.id)
  return res
}

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(route) {
  return !!~menuIds.indexOf(route.id)
}

// 获取首屏路径
function getIndexRouter(arr) {
  const firstMenu = arr[0] || {}
  const path = [firstMenu.path]
  if (firstMenu.children) {
    if (!path.length) {
      path.push('/')
    }
    for (let i = 0; i < firstMenu.children.length; i++) {
      if (firstMenu.children[i].path) {
        path.push(firstMenu.children[i].path)
        break
      }
    }
  }
  return path.join('/')
}

const permission = {
  state: {
    routers: [],
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
    }
  },
  actions: {
    GenerateRoutes({ commit }, menuIdArr) {
      // 追加的三个数分别是个人中心、引导页和控制台的子菜单id
      menuIds = menuIdArr.concat(2, 4, 6)
      return new Promise(resolve => {
        getMenu().then(res => {
          // 有权限访问的菜单
          const accessedRouters = filterAsyncRouter(res.data)
          // 入口路径
          const indexRouter = getIndexRouter(accessedRouters)
          commit('SET_ROUTERS', accessedRouters)
          resolve(indexRouter)
        })
      })
    }
  }
}

export default permission
