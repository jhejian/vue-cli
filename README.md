# vue-cli

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



vue项目构建、打包、发布三部曲
    <!-- 1、大家都知道使用npm run build进行打包，这个时候你直接打开dist/下的index.html,会发现文件可以打开，但是所有的js，css，img等路径有问题是指向根目录的， -->
    <!-- 此时需要修改config/index.js里的assetsPublicPath的字段，初始项目是/他是指向项目根目录的也是为什么会出现错误，这时改为./ -->