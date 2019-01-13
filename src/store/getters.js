const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs,
  userInfo: state => state.user.userInfo,
  rbac: (state, getters) => (menuId) => { return state.user.rbac && (menuId ? state.user.rbac[menuId] : state.user.rbac) || false },
  // 获取com中的name（值不存在返回null）：this.$store.getters["com"]('name')
  com: (state, getters) => (key) => { return state.config.com && (key ? state.config.com[key] : state.config.com) || null }
}
export default getters
