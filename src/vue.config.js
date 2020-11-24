const webpack = require('webpack');
 const path = require('path'); 
 module.exports={
    devServer:{
        host: "localhost",
        port: 8080, // 端口号
        https: false, // https:{type:Boolean}
        open: false, //配置后自动启动浏览器
        hotOnly: true, // 热更新
        proxy:{
          '/api':{
            target:'http://localhost:8080',
            changeOrigin:true,
            ws:true,  //代理webpack
            pathRewrite:{   //重定向 请求路径
                "^/api":"/"
            }
          }
        },
        overlay: {
          warnings: false,
          errors: false
      },
      lintOnSave: false
  
    }
 }