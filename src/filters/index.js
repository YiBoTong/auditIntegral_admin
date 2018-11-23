// set function parseTime,formatTime to filter
import { parseDate, formatDate } from './date'

export { parseTime, formatTime } from '@/utils'

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
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
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
    'false': '否',
    'true': '是',
    'Add': '创建',
    'Edit': '编辑',
  }
  return typeText[value] || value
}
