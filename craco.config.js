const path = require('path')
const pxToViewport = require('process-px-to-viewport')
module.exports = {

    //webpack配置
    webpack: {
        //配置别名
        alias: {
            //约定：使用@表示src 文件所在路径
            '@': path.resolve(__dirname, 'src'),
            '@scss': path.resolve(__dirname, 'src', 'assets', 'styles')
        }
    },
    style: {
        postcss: {
            plugins: [
                //设计稿上实际宽度
                pxToViewport({ visualViewWidth: 375 })
            ]
        }
    }
}