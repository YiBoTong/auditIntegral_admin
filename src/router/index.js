import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  // 登录
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  // 404
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  // 401
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  // 控制台
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  },
  // 引导页
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'guide', icon: 'guide', noCache: true }
      }
    ]
  },
  // 个人中心
  {
    path: '/personal',
    component: Layout,
    redirect: '/personal/index',
    children: [
      // 个人信息
      {
        path: 'index',
        component: () => import('@/views/personal/index'),
        name: 'Personal',
        meta: { title: 'personal', icon: 'user', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  // 机构管理
  {
    path: '/organization',
    component: Layout,
    redirect: '/organization/notice',
    name: 'organization',
    meta: {
      title: 'organization',
      icon: 'component'
    },
    children: [
      // 通知通告
      {
        path: 'notice',
        component: () =>
          import('@/views/organizationalManagement/notice/index'),
        name: 'notice',
        meta: { title: 'notice', noCache: true }
      },
      // 部门管理
      {
        path: 'departmentManagement',
        component: () =>
          import('@/views/organizationalManagement/departmentManagement/index'),
        name: 'departmentManagement',
        meta: { title: 'departmentManagement', noCache: true }
      },
      // 人员管理
      {
        path: 'personnelManagement',
        component: () =>
          import('@/views/organizationalManagement/personnelManagement/index'),
        name: 'personnelManagement',
        meta: { title: 'personnelManagement', noCache: true }
      },
      // 管理办法
      {
        path: 'managementMethods',
        component: () =>
          import('@/views/organizationalManagement/managementMethods/index'),
        name: 'managementMethods',
        meta: { title: 'managementMethods', noCache: true }
      }
    ]
  },
  // 稽核管理
  {
    path: '/audit',
    component: Layout,
    redirect: '/auditManagement/workManuscript',
    name: 'audit',
    meta: {
      title: 'audit',
      icon: 'international'
    },
    children: [
      // 工作底稿
      {
        path: 'workManuscript',
        component: () =>
          import('@/views/auditManagement/workManuscript/index'),
        name: 'workManuscript',
        meta: { title: 'workManuscript', noCache: true }
      },
      // 确认书
      {
        path: 'confirmation',
        component: () =>
          import('@/views/auditManagement/confirmation/index'),
        name: 'confirmation',
        meta: { title: 'confirmation', noCache: true }
      },
      // 处罚通知
      {
        path: 'punishNotice',
        component: () =>
          import('@/views/auditManagement/punishNotice/index'),
        name: 'punishNotice',
        meta: { title: 'punishNotice', noCache: true }
      },
      // 积分表
      {
        path: 'integralTable',
        component: () =>
          import('@/views/auditManagement/integralTable/index'),
        name: 'integralTable',
        meta: { title: 'integralTable', noCache: true }
      },
      // 统计分析
      {
        path: 'statisticalAnalysis',
        component: () =>
          import('@/views/auditManagement/statisticalAnalysis/index'),
        name: 'statisticalAnalysis',
        meta: { title: 'statisticalAnalysis', noCache: true }
      }
    ]
  },
  // 系统管理
  {
    path: '/system',
    component: Layout,
    redirect: '/system/dictionaryManagement',
    name: 'system',
    meta: {
      title: 'system',
      icon: 'example'
    },
    children: [
      // 字典管理
      {
        path: 'dictionaryManagement',
        component: () =>
          import('@/views/systemManagement/dictionaryManagement/index'),
        name: 'dictionaryManagement',
        meta: { title: 'dictionaryManagement', noCache: true }
      },
      // 登录管理
      {
        path: 'loginManagement',
        component: () =>
          import('@/views/systemManagement/loginManagement/index'),
        name: 'loginManagement',
        meta: { title: 'loginManagement', noCache: true }
      },
      // 系统日志
      {
        path: 'systemLog',
        component: () =>
          import('@/views/systemManagement/systemLog/index'),
        name: 'systemLog',
        meta: { title: 'systemLog', noCache: true }
      }
    ]
  },
  // icon
  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/svg-icons/index'),
        name: 'Icons',
        meta: { title: 'icons', icon: 'icon', noCache: true }
      }
    ]
  },

  /** When your routing table is too long, you can split it into small modules**/

  { path: '*', redirect: '/404', hidden: true }
]
