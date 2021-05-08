# vue-demo
  - vue-demo 超简单 demo

## 目录结构
  - dist 打包后的目录
  - public 静态资源存放， 会copy到dist
  - scripts 项目开发与打包相关脚本命令
  - src 源码文件
    - api 封装的网络请求与接口地址 (已挂载到 vue 的prototype上, 使用 this.$xxxApi 可以访问)
      - api.js 网络请求接口
      - index.js 导出各个模块接口地址
      - authApi.js 接口
    - asset 资源文件（img）
    - constants 常量
    - components 公用组件
    - pages 业务对应的页面
    - router 路由地址管理
    - styles 内部自定义样式
    - util 公用函数（已挂载到 vue 的 prototype 上）
      - index.js 总导出文件
      - util.js 公用函数
      - filters.js 过滤器（已注册为全局的）
    - main.js 初始化 vue 相关配置
  - theme elemtn-ui 主题色 css
  - vue.config.js vue-cli3 自定义webpack相关配置

## 启动
  - 在 vue 目录 执行以下命令
  - 启动 vue 服务 端口在 8080, 会自动在浏览器打开开发页面

```
  // please yarn install or npm instlal first
  yarn start
  // or
  npm start
```

## 开发
  - 添加新页面,执行一下命令 自动生成对应模板代码
```
  // 执行该命令根据提示输入页面名称
  npm run page+
  // 或者直接带参输入页面id
  npm run page+ news-list
  // 需要重新启动服务 才会生效
  yarn start
  // or
  npm start
```
  - 执行 npm run page+  输入页面名字 自动生成对应模板代码
  - 该脚本会在vue/src/pages 目录下 新建一个以页面名字命名的文件夹
  - 在 index.vue 文件进行页面开发

## 自定义组件
  - 在scr/components 目录下新建一个文件 .vue 或者 .js 文件
  - 会自动注册到全局的 vue.component 上，不需要额外手动注册，页面直接使用既可

## 打包
  - 执行一下命令后 svn提交
```
  yarn build
  // or
  npm run build
```
  - vue-cli 需要高版本node v8.10.0 +

## 对应页面
- Home 首页
- Login 登录

## 修改接口服务地址
  - 在 vue.config.js 里面修改 devServer 的 proxy
  - 在 constants 修改对应的 hosts 地址 和 环境

## 打包
  - 在根目录输入命令

```
  yarn build
  // 根据提示执行
  // or 不选环境
  // yarn vbuild
```
