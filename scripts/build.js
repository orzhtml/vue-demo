let Promise = require('es6-promise').Promise
let inquirer = require('inquirer')
let fs = require('fs')
let path = require('path')
let { spawn } = require('child_process')

const defaultCodeDesc = `bug 修复及功能优化 ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
let questions = [
  {
    name: 'env',
    message: '请选择要打包的环境',
    type: 'list',
    choices: [
      {
        name: 'dev 开发环境',
        value: 'dev'
      },
      {
        name: 'uat 测试环境',
        value: 'uat'
      },
      {
        name: 'prod 生产环境',
        value: 'prod'
      }
    ]
  },
  {
    name: 'desc',
    message: '请输入更新描述',
    type: 'input'
  },
  {
    name: 'label',
    message: '请输入更新对应的版本号,默认为当前版本号（选填 e.g 1.1.x ~1.1.2 ^1.1.0）',
    type: 'input'
  }
]
inquirer
  .prompt(questions)
  .then(function (answers) {
    console.log('answers: ', answers)
    console.log(defaultCodeDesc)
    if (answers.desc === '') {
      answers.desc = defaultCodeDesc
    }
    console.log('answers: ', answers)
    updateConfigFile(answers)
  })

function updateConfigFile (config) {
  let { env } = config
  return new Promise((resolve, reject) => {
    let filePath = path.resolve(__dirname, '../config/index.js')
    let configStr = fs.readFileSync(filePath, { encoding: 'utf8' })
    configStr = configStr.replace(/env = '.*'/, 'env = ' + "'" + env + "'")

    fs.writeFileSync(filePath, configStr)

    serviceBuild()
    resolve()
  })
}
/** 运行 vue 打包 */
function serviceBuild () {
  const ls = spawn('vue-cli-service', ['build'])

  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
  })

  ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`)
  })

  ls.on('close', (code) => {
    console.log(`子进程退出码：${code}`)
  })
}
