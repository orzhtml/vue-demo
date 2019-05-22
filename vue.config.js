const path = require('path')
const pxtorem = require('postcss-pxtorem')

module.exports = {
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
