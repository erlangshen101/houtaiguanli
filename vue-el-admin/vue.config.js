module.exports = {
    lintOnSave: false,
    devServer: {
        host: "localhost",
        port: "8080",   // 端口号
        https: false, //https: {type : Boolean}
        open: true, // 配置自动启动浏览器
        proxy: {
        '/admin': { // 代理api
            target: 'http://ceshi5.dishait.cn/admin', // 服务器api 地址
            ws: true, // proxy websockts
            changeOrigin: true, //是否跨域
            pathRewrite: {
                '^/admin' : ''
            }
        },
        }
    }
}