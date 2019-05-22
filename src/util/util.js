export function getStorageData (key) {
  let value = sessionStorage[key]
  if (value) {
    try {
      value = JSON.parse(value)
    } catch (e) {
      console.log(e)
    }
  }
  return value
}
export function setStorageData (key, value) {
  if (value && key) {
    try {
      sessionStorage[key] = JSON.stringify(value)
    } catch (e) {
      console.log(e)
    }
  }
}
// convert 20190101 =>>> 2019-01-01
export function cbpDate (date, separate = '-') {
  if (typeof date !== 'string') return ''
  let y = date.substr(0, 4)
  let m = date.substr(4, 2)
  let d = date.substr(6, 2)
  if (date.length === 8) {
    return `${y}${separate}${m}${separate}${d}`
  }
  if (date.length === 14) {
    let h = date.substr(8, 2)
    let mm = date.substr(10, 2)
    let s = date.substr(12, 2)
    return `${y}${separate}${m}${separate}${d} ${h}:${mm}:${s}`
  }
  return date
}
// convert 2019-01-01 =>>> 20190101
export function toCBPDate (date) {
  if (typeof date !== 'string') return date
  return date.replace(/[-/]/g, '')
}

export function random (length) {
  var str = Math.random()
    .toString(36)
    .substr(2)
  if (str.length >= length) {
    return str.substr(0, length)
  }
  str += random(length - str.length)
  return str
}

export function noop () {}

export function isValidNumber (n) {
  if (typeof n === 'number') return true
  if (typeof n !== 'string') return false
  n = n.trim()
  if (n === '') return false
  n = Number(n)
  return Number.isNaN(n) === false
}

export function getCdName (value = '', options = []) {
  if (!value || options.length === 0) return ''
  for (let item of options) {
    // eslint-disable-next-line eqeqeq
    if (item.cd == value) return item.cdNm
  }
  return ''
}

/**
 * 小数相加 (解决精度问题)
 * @param  {...any} arg 相加的数
 */
export function add (...args) {
  let d = 0
  let sum = 0
  // 循环所有的参数
  for (let number of args) {
    number = '' + number
    if (number.indexOf('.') !== -1) {
      var temp = number.split('.')[1].length
      d = d < temp ? temp : d
    }
  }
  let m = Math.pow(10, d)
  for (let number of args) {
    sum += number * m
  }
  return sum / m
}
