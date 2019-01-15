import request from '@/utils/request'
// 稽核管理

// 审计方案
// 方案list
export function programmeList(data) {
  return request({
    url: '/api/audit/programme/list',
    method: 'post',
    data
  })
}
// 添加方案
export function programmeAdd(data) {
  return request({
    url: '/api/audit/programme/add',
    method: 'post',
    data
  })
}
// 修改方案
export function programmeEdit(data) {
  return request({
    url: '/api/audit/programme/edit',
    method: 'put',
    data
  })
}
// 删除方案
export function programmeDelete(params) {
  return request({
    url: '/api/audit/programme/delete',
    method: 'delete',
    params
  })
}
// 获取方案
export function programmeGet(params) {
  return request({
    url: '/api/audit/programme/get',
    method: 'get',
    params
  })
}
// 上报方案
export function programmeState(data) {
  return request({
    url: '/api/audit/programme/state',
    method: 'put',
    data
  })
}
// 部门负责人审核
export function programmeDepExamine(data) {
  return request({
    url: '/api/audit/programme/dep_examine',
    method: 'put',
    data
  })
}
// 分管领导审核
export function programmeAdminExamine(data) {
  return request({
    url: '/api/audit/programme/admin_examine',
    method: 'put',
    data
  })
}
// 获取方案选择列表
export function programmeSelectList(data) {
  return request({
    url: '/api/audit/programme/select',
    method: 'post',
    data
  })
}

// 工作底稿
// 获取工作底稿列表
export function getDraftList(data) {
  return request({
    url: '/api/audit/draft/list',
    method: 'post',
    data
  })
}
// 获取工作底稿
export function getDraft(params) {
  return request({
    url: '/api/audit/draft/get',
    method: 'get',
    params
  })
}
// 删除工作底稿
export function deleteDraft(params) {
  return request({
    url: '/api/audit/draft/delete',
    method: 'delete',
    params
  })
}
// 添加工作底稿
export function addDraft(data) {
  return request({
    url: '/api/audit/draft/add',
    method: 'post',
    data
  })
}
// 修改工作底稿
export function editDraft(data) {
  return request({
    url: '/api/audit/draft/edit',
    method: 'put',
    data
  })
}
// 发布工作底稿
export function changeStateDraft(data) {
  return request({
    url: '/api/audit/draft/state',
    method: 'put',
    data
  })
}

// 事实确认书
// 获取事实确认书列表
export function confirmationList(data) {
  return request({
    url: '/api/audit/confirmation/list',
    method: 'post',
    data
  })
}
// 获取事实确认书
export function getConfirmation(params) {
  return request({
    url: '/api/audit/confirmation/get',
    method: 'get',
    params
  })
}
// 确实书状态变更
export function changeStateConfirmation(data) {
  return request({
    url: '/api/audit/confirmation/state',
    method: 'put',
    data
  })
}
// 已读
export function changeReadConfirmation(data) {
  return request({
    url: '/api/audit/confirmation/read',
    method: 'put',
    data
  })
}
// 设置依据
export function editConfirmation(data) {
  return request({
    url: '/api/audit/confirmation/edit',
    method: 'put',
    data
  })
}

// 违规积分通知书
// 违规积分列表
export function punishNoticeList(data) {
  return request({
    url: '/api/audit/punishNotice/list',
    method: 'post',
    data
  })
}
// 获取违规积分通知书
export function getPunishNotice(params) {
  return request({
    url: '/api/audit/punishNotice/get',
    method: 'get',
    params
  })
}
// 填写分数
export function editPunishNoticeScore(data) {
  return request({
    url: '/api/audit/punishNotice/edit_score',
    method: 'put',
    data
  })
}
// 填写编号
export function editPunishNoticeNumber(data) {
  return request({
    url: '/api/audit/punishNotice/edit_number',
    method: 'put',
    data
  })
}
// 领导签署
export function editPunishNoticeAuthor(data) {
  return request({
    url: '/api/audit/punishNotice/edit_author',
    method: 'put',
    data
  })
}
// 问责
export function getAccountability(params) {
  return request({
    url: '/api/audit/punishNotice/get_accountability',
    method: 'get',
    params
  })
}
// 填写违规行为
export function fillingBehavior(data) {
  return request({
    url: '/api/audit/punishNotice/edit',
    method: 'put',
    data
  })
}

// 整改通知
// 整改通知列表
export function rectifyList(data) {
  return request({
    url: '/api/audit/rectify/list',
    method: 'post',
    data
  })
}
// 获取整改通知
export function getRectify(params) {
  return request({
    url: '/api/audit/rectify/get',
    method: 'get',
    params
  })
}
// 填写意见
export function editRectify(data) {
  return request({
    url: '/api/audit/rectify/edit',
    method: 'put',
    data
  })
}
// 发布
export function editRectifyState(data) {
  return request({
    url: '/api/audit/rectify/state',
    method: 'put',
    data
  })
}

// 整改报告
// 获取
export function getRectifyReport(params) {
  return request({
    url: '/api/audit/rectifyReport/get',
    method: 'get',
    params
  })
}

// 填写
export function editRectifyReport(data) {
  return request({
    url: '/api/audit/rectifyReport/edit',
    method: 'put',
    data
  })
}

// 审计报告
// 审计报告列表
export function auditReportList(data) {
  return request({
    url: '/api/audit/auditReport/list',
    method: 'post',
    data
  })
}
// 获取审计报告
export function getAuditReport(params) {
  return request({
    url: '/api/audit/auditReport/get',
    method: 'get',
    params
  })
}
// 填写审计报告
export function editAuditReport(data) {
  return request({
    url: '/api/audit/auditReport/edit',
    method: 'put',
    data
  })
}

// 积分表
// 获取列表
export function integralList(data) {
  return request({
    url: '/api/audit/integral/list',
    method: 'post',
    data
  })
}
// 获取单个
export function getIntegral(params) {
  return request({
    url: '/api/audit/integral/get',
    method: 'get',
    params
  })
}
// 修改分数
export function editIntegral(data) {
  return request({
    url: '/api/audit/integral/edit',
    method: 'put',
    data
  })
}
// 审核意见
export function editAuthor(data) {
  return request({
    url: '/api/audit/integral/edit_author',
    method: 'put',
    data
  })
}

// 统计分析
// 统计分析列表
export function statisticalList(data) {
  return request({
    url: '/api/audit/statistical/list',
    method: 'post',
    data
  })
}
// 获取单个
export function getStatistical(params) {
  return request({
    url: '/api/audit/statistical/get',
    method: 'get',
    params
  })
}
// 获取明细
export function getStatisticalDetailed(data) {
  return request({
    url: '/api/audit/statistical/detailed',
    method: 'post',
    data
  })
}
// 获取明细统计
export function getDetailedTotal(data) {
  return request({
    url: '/api/audit/statistical/detailed_total',
    method: 'post',
    data
  })
}
// 获取明细统计
export function getStatisticalDraftTotal(params) {
  return request({
    url: '/api/audit/statistical/get_one_statistical_user',
    method: 'get',
    params
  })
}

// 介绍信
// 介绍信列表
export function introductionList(data) {
  return request({
    url: '/api/audit/introduction/list',
    method: 'post',
    data
  })
}
// 获取介绍信
export function getIntroduction(params) {
  return request({
    url: '/api/audit/introduction/get',
    method: 'get',
    params
  })
}
// 生成介绍信
export function createIntroduction(data) {
  return request({
    url: '/api/audit/introduction/create',
    method: 'put',
    data
  })
}

// 审计通知
// 审计通知列表
export function auditNoticeList(data) {
  return request({
    url: '/api/audit/auditNotice/list',
    method: 'post',
    data
  })
}
// 获取审计通知
export function getAuditNotice(params) {
  return request({
    url: '/api/audit/auditNotice/get',
    method: 'get',
    params
  })
}
