import axios from 'axios'
import { Message } from 'element-ui'

/**
 * 通用请求方法
 * @param type 请求类型
 * @param url 请求地址
 * @param data 请求数据
 * @return {Promise<AxiosResponse<any> | {}>}
 */
function requestURL ({ type = 'post', url, data }) {
  let options = {
    url: url,
    method: type,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    timeout: 60000
  }

  let __data__ = {
    // uuid: '550e8400-e29b-41d4-a716-446655440000' // global.UniqueID
  }

  if (data) {
    __data__ = Object.assign(__data__, data)
  }

  if (type === 'post') {
    options.data = JSON.stringify(__data__)
  }

  return axios(options)
    .then(result => {
      console.log('')
      console.log('============ 请求参数 ======================')
      console.log('url: ', url)
      console.log({ data })
      console.log({ options })
      console.log('============ 返回参数 ======================')
      console.log({ result })
      console.log('')
      return result.data || {}
    })
    .catch(error => {
      console.log('请求失败: ', 'url: ', url, options, error)
      let msg = '请确认您的网络连接正常'
      if (error.request && error.request.status >= 500) {
        console.log(error.request)
        console.log('error-response: ==================')
        console.log(error.response)
        msg = '系统错误，请重试'
      }
      Message.error(msg)
      // 返回空对象，防止旧代码没有非空验证 crash
      return {}
    })
}

export default {
  // requestURL的 快捷get请求
  get: function ({ url, data }) {
    return requestURL({ url, data, type: 'get' })
  },
  // requestURL的 快捷post请求
  post: function ({ url, data }) {
    return requestURL({ url, data, type: 'post' })
  },
  requestURL
}
