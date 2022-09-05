module.exports = {
    publicPath: "./",
    devServer: {
        open: false,
        host: '0.0.0.0', //服务器域名ip ,设置为0.0.0.0则所有的地址均能访问
        port: 8080,
        https: false,
        disableHostCheck: true,
        proxy: {
            '/api': {
                target:'http://localhost:9003/',
                ws: true,//允许跨域
                changOrigin: true,//允许跨域
                pathRewrite: {
                    '^/api': ''//请求的时候使用这个api就可以
                }
            },
        }
    },
}
