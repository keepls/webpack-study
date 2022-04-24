const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
// require("webpack-dev-server")
const path=require("path")

console.log("process.env.NODE_ENV=",process.env.NODE_ENV) //打印环境变量

const config={
    // mode:"development", //模式
    entry:"./src/index.js", //打包入口地址
    output:{
        filename:"bundle.js", //输出文件名
        path:path.join(__dirname,'dist') //输出文件目录
    },
    module:{
        rules:[ //转换规则
            {
                test:/\.css$/, //匹配所有的css文件
                use:["style-loader","css-loader"] //use:对应loader的名称
            }
        ]
    },
    plugins:[ //配置插件
        new HtmlWebpackPlugin({
            template:"./src/index.html"
        }),
        new CleanWebpackPlugin() // 引入插件
    ],
    devServer:{
        contentBase:path.resolve(__dirname,"public"), //静态文件目录
        compress:true, //是否启动压缩gzip
        port:8080, // 端口号
    }
}

module.exports=(env,argv)=>{
    console.log("argv.mode=",argv.mode) //打印mode(模式)值
    // 这里可以通过不同的模式修改config配置
    return config
}