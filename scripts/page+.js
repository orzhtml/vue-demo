const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')

let pageId = process.argv[2]
let indexVue = require('./template/indexVue')
let pagesPath = path.resolve(__dirname, '../src/pages')

if (pageId) {
  makeTemplate(pageId)
} else {
  inquirer
    .prompt([
      {
        name: 'id',
        message: '请输入页面名称',
        type: 'input'
      }
    ])
    .then(function (answers) {
      makeTemplate(answers.id)
    })
}

function makeTemplate (name) {
  let isName = /^([a-z])+(-[a-z]+)?$/.test(name)
  if (!isName) {
    console.warn('页面id 格式不正确: ' + name + '， 请检查! eg: login news-list')
    return
  }
  let pageName = transformStr(name)
  if (fs.existsSync(path.join(pagesPath, pageName))) {
    console.log('该页面已经存在， 添加失败:', path.join(pagesPath, pageName))
    return
  }
  fs.mkdirSync(path.join(pagesPath, pageName))
  fs.writeFileSync(path.join(pagesPath, pageName, 'index.vue'), indexVue)
  console.log('页面添加成功')
}
/** 转换驼峰 */
function transformStr (str) {
  var newStr = ''
  var arr = str.split('-')// split是分隔字符串
  for (var i = 0; i < arr.length; i++) {
    var s = arr[i]
    newStr += s.substr(0, 1).toLocaleUpperCase()
    newStr += s.substr(1, s.length - 1)
  }
  return newStr
}
