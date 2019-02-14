import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

// noinspection JSAnnotator
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
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true, id: 2 }
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
        meta: { title: 'guide', icon: 'guide', noCache: true, id: 4 }
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
        meta: { title: 'personal', icon: 'user', noCache: true, id: 6 }
      }
    ]
  },
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
        meta: { title: 'notice', noCache: true, id: 8 },
        children: [
          // 添加
          {
            path: 'add',
            component: () =>
              import('@/views/organizationalManagement/notice/input'),
            name: 'noticeAdd',
            meta: { title: 'noticeAdd', noCache: true, id: 8 }
          },
          // 编辑
          {
            path: 'edit/:id',
            component: () =>
              import('@/views/organizationalManagement/notice/input'),
            name: 'noticeEdit',
            meta: { title: 'noticeEdit', noCache: true, id: 8 }
          },
          // 查看
          {
            path: 'view/:id',
            component: () =>
              import('@/views/organizationalManagement/notice/show'),
            name: 'noticeView',
            meta: { title: 'noticeView', noCache: true, id: 8 }
          }
        ]
      },
      // 部门管理
      {
        path: 'departmentManagement',
        component: () =>
          import('@/views/organizationalManagement/departmentManagement/index'),
        name: 'departmentManagement',
        meta: { title: 'departmentManagement', noCache: true, id: 9 },
        children: [
          // 添加
          {
            path: 'add',
            component: () =>
              import('@/views/organizationalManagement/departmentManagement/input'),
            name: 'departmentManagementAdd',
            meta: { title: 'departmentManagementAdd', noCache: true, id: 9 }
          },
          // 编辑
          {
            path: 'edit/:id',
            component: () =>
              import('@/views/organizationalManagement/departmentManagement/input'),
            name: 'departmentManagementEdit',
            meta: { title: 'departmentManagementEdit', noCache: true, id: 9 }
          },
          // 查看
          {
            path: 'view/:id',
            component: () =>
              import('@/views/organizationalManagement/departmentManagement/show'),
            name: 'departmentManagementView',
            meta: { title: 'departmentManagementView', noCache: true, id: 9 }
          }
        ]
      },
      // 人员管理
      {
        path: 'personnelManagement',
        component: () =>
          import('@/views/organizationalManagement/personnelManagement/index'),
        name: 'personnelManagement',
        meta: { title: 'personnelManagement', noCache: true, id: 10 },
        children: [
          // 添加
          {
            path: 'add',
            component: () =>
              import('@/views/organizationalManagement/personnelManagement/input'),
            name: 'personnelManagementAdd',
            meta: { title: 'personnelManagementAdd', noCache: true, id: 10 }
          },
          // 编辑
          {
            path: 'edit/:userId',
            component: () =>
              import('@/views/organizationalManagement/personnelManagement/input'),
            name: 'personnelManagementEdit',
            meta: { title: 'personnelManagementEdit', noCache: true, id: 10 }
          },
          // 查看
          {
            path: 'view/:userId',
            component: () =>
              import('@/views/organizationalManagement/personnelManagement/show'),
            name: 'personnelManagementView',
            meta: { title: 'personnelManagementView', noCache: true, id: 10 }
          }
        ]
      },
      // 相关文件
      {
        path: 'managementMethods',
        component: () =>
          import('@/views/organizationalManagement/managementMethods/index'),
        name: 'managementMethods',
        meta: { title: 'managementMethods', noCache: true, id: 11 }
      }
    ]
  },
  // 稽核管理
  {
    path: '/audit',
    component: Layout,
    redirect: '/audit/auditPlan',
    name: 'audit',
    meta: {
      title: 'audit',
      icon: 'international'
    },
    children: [
      // 审计方案
      {
        path: 'auditPlan',
        component: () =>
            import('@/views/auditManagement/auditPlan/index'),
        name: 'auditPlan',
        meta: { title: 'auditPlan', noCache: true, id: 24 },
        children: [
          // 添加
          {
            path: 'add',
            component: () =>
              import('@/views/auditManagement/auditPlan/input'),
            name: 'auditPlanAdd',
            meta: { title: 'auditPlanAdd', noCache: true, id: 24 }
          },
          // 编辑
          {
            path: 'edit/:id',
            component: () =>
              import('@/views/auditManagement/auditPlan/input'),
            name: 'auditPlanEdit',
            meta: { title: 'auditPlanEdit', noCache: true, id: 24 }
          },
          // 查看
          {
            path: 'view/:id',
            component: () =>
              import('@/views/auditManagement/auditPlan/show'),
            name: 'auditPlanView',
            meta: { title: 'auditPlanView', noCache: true, id: 24 }
          },
          // 审核
          {
            path: 'audit/:id',
            component: () =>
              import('@/views/auditManagement/auditPlan/audit'),
            name: 'auditPlanAudit',
            meta: { title: 'auditPlanAudit', noCache: true, id: 24 }
          },
          // 复制
          {
            path: 'copy/:id',
            component: () =>
              import('@/views/auditManagement/auditPlan/input'),
            name: 'auditPlanCopy',
            meta: { title: 'auditPlanCopy', noCache: true, id: 24 }
          }
        ]
      },
      // 工作底稿
      {
        path: 'workManuscript',
        component: () =>
            import('@/views/auditManagement/workManuscript/index'),
        name: 'workManuscript',
        meta: { title: 'workManuscript', noCache: true, id: 13 },
        children: [
          // 添加
          {
            path: 'add',
            component: () =>
              import('@/views/auditManagement/workManuscript/input'),
            name: 'workManuscriptAdd',
            meta: { title: 'workManuscriptAdd', noCache: true, id: 13 }
          },
          // 编辑
          {
            path: 'edit/:id',
            component: () =>
              import('@/views/auditManagement/workManuscript/input'),
            name: 'workManuscriptEdit',
            meta: { title: 'workManuscriptEdit', noCache: true, id: 13 }
          },
          // 查看
          {
            path: 'view/:id',
            component: () =>
              import('@/views/auditManagement/workManuscript/show'),
            name: 'workManuscriptView',
            meta: { title: 'workManuscriptView', noCache: true, id: 13 }
          },
          // 复制
          {
            path: 'copy/:id',
            component: () =>
              import('@/views/auditManagement/workManuscript/input'),
            name: 'workManuscriptCopy',
            meta: { title: 'workManuscriptCopy', noCache: true, id: 13 }
          }
        ]
      },
      // 事实确认书
      {
        path: 'confirmation',
        component: () =>
        import('@/views/auditManagement/confirmation/index'),
        name: 'confirmation',
        meta: { title: 'confirmation', noCache: true, id: 14 }
      },
      // 违规积分通知书
      {
        path: 'punishNotice',
        component: () =>
        import('@/views/auditManagement/punishNotice/index'),
        name: 'punishNotice',
        meta: { title: 'punishNotice', noCache: true, id: 15 }
      },
      // 整改通知
      {
        path: 'rectifyNotice',
        component: () =>
        import('@/views/auditManagement/rectifyNotice/index'),
        name: 'rectifyNotice',
        meta: { title: 'rectifyNotice', noCache: true, id: 16 }
      },
      // 整改报告
      {
        path: 'rectifyReport',
        component: () =>
        import('@/views/auditManagement/rectifyReport/index'),
        name: 'rectifyReport',
        meta: { title: 'rectifyReport', noCache: true, id: 25 }
      },
      // 审计报告
      {
        path: 'auditReport',
        component: () =>
        import('@/views/auditManagement/auditReports/main'),
        name: 'auditReport',
        meta: { title: 'auditReport', noCache: true, id: 26 }
      },
      // 积分表
      {
        path: 'integralTable',
        component: () =>
        import('@/views/auditManagement/integralTable/index'),
        name: 'integralTable',
        meta: { title: 'integralTable', noCache: true, id: 27 }
      },
      // 统计分析
      {
        path: 'statisticalAnalysis',
        component: () =>
        import('@/views/auditManagement/statisticalAnalysis/index'),
        name: 'statisticalAnalysis',
        meta: { title: 'statisticalAnalysis', noCache: true, id: 17 }
      },
      // 介绍信
      {
        path: 'introduction',
        component: () =>
          import('@/views/auditManagement/introduction/main'),
        name: 'introduction',
        meta: { title: 'introduction', noCache: true, id: 28 },
        children: [
          // 查看
          {
            path: 'view/:id',
            component: () =>
              import('@/views/auditManagement/introduction/show'),
            name: 'introductionView',
            meta: { title: 'introductionView', noCache: true, id: 28 }
          }
        ]
      },
      // 后续检查
      {
        path: 'track',
        component: () =>
          import('@/views/auditManagement/track/main'),
        name: 'track',
        meta: { title: 'track', noCache: true, id: 29 }
      },
      // 审计通知
      {
        path: 'auditNotice',
        component: () =>
          import('@/views/auditManagement/auditNotice/index'),
        name: 'auditNotice',
        meta: { title: 'auditNotice', noCache: true, id: 30 }
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
        meta: { title: 'dictionaryManagement', noCache: true, id: 19 },
        children: [
          // 添加
          {
            path: 'add',
            component: () =>
              import('@/views/systemManagement/dictionaryManagement/input'),
            name: 'dictionaryManagementAdd',
            meta: { title: 'dictionaryManagementAdd', noCache: true, id: 19 }
          },
          // 编辑
          {
            path: 'edit/:id',
            component: () =>
              import('@/views/systemManagement/dictionaryManagement/input'),
            name: 'dictionaryManagementEdit',
            meta: { title: 'dictionaryManagementEdit', noCache: true, id: 19 }
          },
          // 查看
          {
            path: 'view/:id',
            component: () =>
              import('@/views/systemManagement/dictionaryManagement/show'),
            name: 'dictionaryManagementView',
            meta: { title: 'dictionaryManagementView', noCache: true, id: 19 }
          }
        ]
      },
      // 登录管理
      {
        path: 'loginManagement',
        component: () =>
          import('@/views/systemManagement/loginManagement/index'),
        name: 'loginManagement',
        meta: { title: 'loginManagement', noCache: true, id: 20 },
        children: [
          // 添加
          {
            path: 'add',
            component: () =>
              import('@/views/systemManagement/loginManagement/input'),
            name: 'loginManagementAdd',
            meta: { title: 'loginManagementAdd', noCache: true, id: 20 }
          }
        ]
      },
      // 系统日志
      {
        path: 'systemLog',
        component: () =>
          import('@/views/systemManagement/systemLog/index'),
        name: 'systemLog',
        meta: { title: 'systemLog', noCache: true, id: 23 }
      },
      // 菜单管理
      {
        path: 'menusManagement',
        component: () =>
          import('@/views/systemManagement/menusManagement/index'),
        name: 'menusManagement',
        meta: { title: 'menusManagement', noCache: true, id: 21 }
      },
      // 权限管理
      {
        path: 'powerManagement',
        component: () =>
          import('@/views/systemManagement/powerManagement/index'),
        name: 'powerManagement',
        meta: { title: 'powerManagement', noCache: true, id: 22 },
        children: [
          // 编辑
          {
            path: 'edit/:id',
            component: () =>
              import('@/views/systemManagement/powerManagement/input'),
            name: 'powerManagementEdit',
            meta: { title: 'powerManagementEdit', noCache: true, id: 22 }
          }
        ]
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
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// export const asyncRouterMap = [
//   // 控制台
//   {
//     path: '',
//     redirect: 'dashboard',
//     children: [
//       {
//         path: 'dashboard',
//         name: 'Dashboard',
//         meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
//       }
//     ]
//   },
//   // 引导页
//   {
//     path: '/guide',
//     redirect: '/guide/index',
//     children: [
//       {
//         path: 'index',
//         name: 'Guide',
//         meta: { title: 'guide', icon: 'guide', noCache: true }
//       }
//     ]
//   },
//   // 个人中心
//   {
//     path: '/personal',
//     redirect: '/personal/index',
//     children: [
//       // 个人信息
//       {
//         path: 'index',
//         name: 'Personal',
//         meta: { title: 'personal', icon: 'user', noCache: true }
//       }
//     ]
//   },
//   // 机构管理
//   {
//     path: '/organization',
//     redirect: '/organization/notice',
//     name: 'organization',
//     meta: {
//       title: 'organization',
//       icon: 'component'
//     },
//     children: [
//       // 通知通告
//       {
//         path: 'notice',
//         name: 'notice',
//         meta: { title: 'notice', noCache: true }
//       },
//       // 部门管理
//       {
//         path: 'departmentManagement',
//         name: 'departmentManagement',
//         meta: { title: 'departmentManagement', noCache: true }
//       },
//       // 人员管理
//       {
//         path: 'personnelManagement',
//         name: 'personnelManagement',
//         meta: { title: 'personnelManagement', noCache: true }
//       },
//       // 相关文件
//       {
//         path: 'managementMethods',
//         name: 'managementMethods',
//         meta: { title: 'managementMethods', noCache: true }
//       }
//     ]
//   },
//   // 稽核管理
//   {
//     path: '/audit',
//     redirect: '/auditManagement/workManuscript',
//     name: 'audit',
//     meta: {
//       title: 'audit',
//       icon: 'international'
//     },
//     children: [
//       // 稽核方案
//       {
//         path: 'auditPlan',
//         name: 'auditPlan',
//         meta: { title: 'auditPlan', noCache: true }
//       },
//       // 工作底稿
//       {
//         path: 'workManuscript',
//         name: 'workManuscript',
//         meta: { title: 'workManuscript', noCache: true }
//       },
//       // 确认书
//       {
//         path: 'confirmation',
//         name: 'confirmation',
//         meta: { title: 'confirmation', noCache: true }
//       },
//       // 违规积分通知书
//       {
//         path: 'punishNotice',
//         name: 'punishNotice',
//         meta: { title: 'punishNotice', noCache: true }
//       },
//       // 整改通知
//       {
//         path: 'rectifyNotice',
//         name: 'rectifyNotice',
//         meta: { title: 'rectifyNotice', noCache: true }
//       },
//       // 整改报告
//       {
//         path: 'rectifyReport',
//         name: 'rectifyReport',
//         meta: { title: 'rectifyReport', noCache: true }
//       },
//       // 审计报告
//       {
//         path: 'auditReport',
//         name: 'auditReport',
//         meta: { title: 'auditReport', noCache: true }
//       },
//       // 积分表
//       {
//         path: 'integralTable',
//         name: 'integralTable',
//         meta: { title: 'integralTable', noCache: true }
//       },
//       // 统计分析
//       {
//         path: 'statisticalAnalysis',
//         name: 'statisticalAnalysis',
//         meta: { title: 'statisticalAnalysis', noCache: true }
//       }
//     ]
//   },
//   // 系统管理
//   {
//     path: '/system',
//     redirect: '/system/dictionaryManagement',
//     name: 'system',
//     meta: {
//       title: 'system',
//       icon: 'example'
//     },
//     children: [
//       // 字典管理
//       {
//         path: 'dictionaryManagement',
//         name: 'dictionaryManagement',
//         meta: { title: 'dictionaryManagement', noCache: true }
//       },
//       // 登录管理
//       {
//         path: 'loginManagement',
//         name: 'loginManagement',
//         meta: { title: 'loginManagement', noCache: true }
//       },
//       // 系统日志
//       {
//         path: 'systemLog',
//         name: 'systemLog',
//         meta: { title: 'systemLog', noCache: true }
//       },
//       // 菜单管理
//       {
//         path: 'menusManagement',
//         name: 'menusManagement',
//         meta: { title: 'menusManagement', noCache: true }
//       },
//       // 权限管理
//       {
//         path: 'powerManagement',
//         name: 'powerManagement',
//         meta: { title: 'powerManagement', noCache: true }
//       }
//     ]
//   }
//   // icon
//   // {
//   //   path: '/icon',
//   //   children: [
//   //     {
//   //       path: 'index',
//   //       name: 'Icons',
//   //       meta: { title: 'icons', icon: 'icon', noCache: true }
//   //     }
//   //   ]
//   // }
//
//   /** When your routing table is too long, you can split it into small modules**/
//   //
//   // { path: '*', redirect: '/404', hidden: true }
// ]
