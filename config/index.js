// 开发地址
const dev = 'http://localhost:8080/'
const IP = 'http://118.31.112.206/'
const url = 'http://www.benzhou.com/'

/**
 * app配置文件， 判断环境的变量
 */
// 固定配置
const env = 'dev'

let hosts = {
  dev: dev, // 内网开发
  uat: IP, // UAT
  prod: url // 生产环境
}

export default {
  env: env,
  host: hosts[ env ],
  version: '1.0.0'
}
