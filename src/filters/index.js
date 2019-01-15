// set function parseTime,formatTime to filter
import { parseDate, formatDate } from './date'
import { dictGet } from '../api/systemManagement'

export { parseTime, formatTime } from '@/utils'

const dictionary = {}

function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/* 数字 格式化*/
export function numberFormatter(num, digits) {
  const si = [
    { value: 1e18, symbol: 'E' },
    { value: 1e15, symbol: 'P' },
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'G' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * 截取字符串
 * @param val 源字符串
 * @param len 截取长度
 * @param str 拼接字符
 * @returns {string}
 */
export function sliceText(val, len = 10, str = '') {
  const temp = val ? val.slice(0, len) : val
  return val.length > len ? temp + str : val
}

/**
 * 移除html标签（并替换对于的占位字符）
 * @param html 源html字符串
 * @param keepStyleText 是否需要保留占位字符
 * @returns {string}
 */
export function delHtmlTag(html, keepStyleText = false) {
  let resultStr = ''
  if (html) {
    if (keepStyleText) {
      resultStr = html.replace(/<img[^>]+>/g, '[图片]')
      resultStr = resultStr.replace(/<video[^>]*>/g, '[视频]')
      resultStr = resultStr.replace(/<audio[^>]+>/g, '[音频]')
    }
    resultStr = (resultStr || html).replace(/<[^>]+>/g, '')
    // 转换
    resultStr = resultStr.replace(/&nbsp;/g, ' ')
    // 多个空格转为一个空格
    resultStr = resultStr.replace(/\t+/g, ' ')
    // 去掉回车换行
    resultStr = resultStr.replace(/[\r\n]/g, '')
  }
  return resultStr
}

/**
 * 格式化日期
 * @param value  需要处理的时间数据
 * @param format 字符模版 yyyy-MM-dd HH:mm:ss.SSS
 * @returns {*}
 */
export function fmtDate(value, format) {
  return typeof date === 'string' ? parseDate(value, format) : formatDate(value, format)
}

/**
 * 过滤table数据
 * value 需要过滤的数据
 */

export function typeText(value) {
  const typeText = {
    '0': '否',
    '1': '是',
    false: '否',
    true: '是',
    Add: '创建',
    Edit: '编辑',
    Copy: '复制',
    draft: '草稿',
    publish: '已发布',
    report: '待审核'
  }
  return typeText[value] || value
}

export function startText(value) {
  const startText = {
    false: '启用',
    true: '禁用'
  }
  return startText[value] || value
}
// 菜单管理
export function menuIsUse(value) {
  const menuIsUse = {
    false: '启用',
    true: '撤销'
  }
  return menuIsUse[value] || value
}
export function userChange(value) {
  const userChange = {
    '': '—',
    '0': '保密',
    '1': '女',
    '2': '男'
  }
  return userChange[value] || value
}
export function rangeText(value) {
  const rangeText = {
    '1': '全部部门',
    '2': '指定部门'
  }
  return rangeText[value] || value
}

// 动态字典
export function dictionaries(value, vue, dictionaryTypeId) {
  if (!dictionary[dictionaryTypeId]) {
    dictionary[dictionaryTypeId] = {
      _load: true,
      data: {}
    }
  }
  if (dictionary[dictionaryTypeId]._load) {
    dictionary[dictionaryTypeId]._load = false
    dictGet({ id: dictionaryTypeId }).then(res => {
      if (!res.status.error && res.data.dictionaries) {
        res.data.dictionaries.map(item => (dictionary[dictionaryTypeId].data[item.key] = item.value))
      }
    })
  } else {
    return dictionary[dictionaryTypeId].data[value]
  }
}

// 实施步骤
export function auditStep(value) {
  const auditStep = {
    step: '步骤',
    title: '标题',
    content: '内容'
  }
  return auditStep[value] || value
}

// 状态
export function auditStateType(value) {
  const auditStep = {
    report: '部门负责人',
    dep_adopt: '分管领导'
  }
  return auditStep[value] || value
}
// list状态
export function auditStateChange(value) {
  const auditStateChange = {
    draft: '草稿',
    report: '待审核',
    dep_reject: '部门负责人驳回',
    admin_reject: '分管领导驳回',
    dep_adopt: '部门负责人通过',
    publish: '已通过',
    adopt: '通过',
    reject: '驳回'
  }
  return auditStateChange[value] || value
}

// 公用list状态
export function publicListState(value) {
  const state = {
    draft: '草稿',
    publish: '已发布'
  }
  return state[value] || value
}
// 是否已读
export function hasRead(value) {
  const hasRead = {
    0: '未读',
    1: '已读'
  }
  return hasRead[value] || value
}
// 是否公开
export function hasPublic(value) {
  const hasPublic = {
    0: '私有',
    1: '公开'
  }
  return hasPublic[value] || value
}

// check
export function checkChange(value) {
  const checkChange = {
    0: false,
    1: true
  }
  return checkChange[value] || value
}

// 违规积分通知书编辑的类型
export function punishEditType(value) {
  const punishEditType = {
    score: '保存分数',
    number: '保存编号',
    author: '签署'
  }
  return punishEditType[value]
}

// 小写数字转换成大写, 只处理到[0 ~ 99]
const chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
const chnUnitSection = ['', '万', '亿', '万亿', '亿亿']
const chnUnitChar = ['', '十', '百', '千']
function SectionToChinese(section) {
  var strIns = ''
  let chnStr = ''
  var unitPos = 0
  var zero = true
  while (section > 0) {
    var v = section % 10
    if (v === 0) {
      if (!zero) {
        zero = true
        chnStr = chnNumChar[v] + chnStr
      }
    } else {
      zero = false
      strIns = chnNumChar[v]
      strIns += chnUnitChar[unitPos]
      chnStr = strIns + chnStr
    }
    unitPos++
    section = Math.floor(section / 10)
  }
  return chnStr
}
export function numberConvertToUppercase(num) {
  var unitPos = 0
  var strIns = ''
  let chnStr = ''
  var needZero = false

  if (num === 0) {
    return chnNumChar[0]
  }

  while (num > 0) {
    var section = num % 10000
    if (needZero) {
      chnStr = chnNumChar[0] + chnStr
    }
    strIns = SectionToChinese(section)
    strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0]
    chnStr = strIns + chnStr
    needZero = (section < 1000) && (section > 0)
    num = Math.floor(num / 10000)
    unitPos++
  }
  return chnStr
}

// 获取数组中的指定属性的值
export function getArrText(arr, key) {
  const list = []
  if (arr && arr instanceof Array) {
    arr.map(item => list.push(item[key]))
  }
  return list.join('、') || '-'
}

// 数组转换（缩小1000倍保留两位小数）
export function numberConvert(num, i = 1000) {
  return Number((Number(num) / i).toFixed(2))
}
