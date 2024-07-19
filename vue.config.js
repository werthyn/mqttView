// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}
// const port = process.env.port || process.env.npm_config_port || 85 // 端口
const port =  85 // 端口

module.exports = {
  // 选项...
  lintOnSave: true ,
  // 基本路径
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  // publicPath: process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/',
  // 输出文件目录
  outputDir: 'dist',
  // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: 'static',
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // 是否开启eslint保存检测，有效值：ture | false | 'error'
  lintOnSave: process.env.NODE_ENV === 'development',
  // CSS 相关选项
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false
  },
  // devServer 代理设置
  devServer: {
    host: '0.0.0.0',
    port: port,
    https: false,
    open: true,
    proxy: {
      // 配置跨域处理 可以设置你想要代理的接口
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        pathRewrite: {
          // '^/api': ''
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },
  // 插件选项
  pluginOptions: {
    // ...
  },
  // configureWebpack 或 chainWebpack 调整内部webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        if (process.env.NODE_ENV === 'production') {
          // 为生产环境修改配置...
        } else {
          // 为开发环境修改配置...
        }
        return args;
      });
  }
};
