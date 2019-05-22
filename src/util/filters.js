import * as util from './util'
/**
 * 格式化显示金额 加千分位逗号 1000000 => 1,000,000
 * @param {*} num 数字
 */
export function money (num) {
  if (num === null || num === undefined) return ''
  if (typeof num !== 'number' && typeof num !== 'string') return ''
  num = num + ''
  if (num === '') return ''
  if (num === 'NaN') return ''
  var regx = /(-?\d+)(\d{3})/
  var bExists = num.indexOf('.', 0)
  var strArr = num.split('.')
  while (regx.test(strArr[0])) {
    strArr[0] = strArr[0].replace(regx, '$1,$2')
  }
  if (bExists > -1) return strArr[0] + '.' + strArr[1]
  else return strArr[0]
}
// 格式化显示金额 保留2位小数
export function money2 (num) {
  num = Number(num).toFixed(2)
  return money(num)
}
// 格式化显示金额 保留4位小数
export function money4 (num) {
  num = Number(num).toFixed(4)
  return money(num)
}
// 格式化日期显示
export let cbpDate = util.cbpDate
export let date = util.cbpDate
