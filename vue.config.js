const path = require('path')
const fs = require('fs')
const pxtorem = require('postcss-pxtorem')
let pagesPath = path.resolve(__dirname, './src/pages')
let pagesDir = fs.readdirSync(pagesPath)
// 按目录结构配置多入口
let pages = {}
// console.log('pagesDir: ', pagesDir)
for (let dir of pagesDir) {
  let subPagePath = path.join(pagesPath, dir)
  if (fs.statSync(subPagePath).isDirectory()) {
    let indexJs = path.resolve(subPagePath, 'index.vue')
    // console.log('indexJs: ', indexJs)
    if (fs.existsSync(indexJs)) {
      pages[dir] = 'src/pages/' + dir + '/index.vue'
    }
  }
}
// 是否生产环境
let prod = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: prod ? '/vue/' : 'http://localhost:8080/',
  // pages: pages,
  // filenameHashing: false,
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, './src'))
      .set('@assets', path.resolve(__dirname, './src/assets'))
      .set('@api', path.resolve(__dirname, './src/api'))
      .set('@components', path.resolve(__dirname, './src/components'))
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/styles/_variables.scss";
        `
      },
      postcss: {
        plugins: [
          pxtorem({
            rootValue: 75,
            unitPrecision: 5,
            propList: ['*'],
            selectorBlackList: ['van-']
          })
        ]
      }
    }
  },
  devServer: {
    // port: 8081,
    proxy: 'http://www.benzhou.com',
    open: true
  }
}
