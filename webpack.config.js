// 自动清空dist目录
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

// js 或者 css 文件可以自动引入到 Html 中
const HtmlWebpackPlugin = require("html-webpack-plugin")
// CSS 文件的形式引入到页面上
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// require("webpack-dev-server")
const path = require("path")

console.log("process.env.NODE_ENV=", process.env.NODE_ENV) //打印环境变量

// 路径处理方法
function resolve(dir){
    return path.join(__dirname, dir);
  }

const config = {
    // mode:"development", //模式
    entry: "./src/index.js", //打包入口地址
    output: {
        filename: "bundle.js", //输出文件名
        path: path.join(__dirname, 'dist') //输出文件目录
    },
    // 从输出的 bundle 中排除依赖
    // externals: {
    //     jquery: 'jQuery',
    //   },

    // 解析自定义 loader
    // resolveLoader: {
    //     modules: ['node_modules',resolve('loader')]
    //   },
    resolve:{
        // 配置别名
        alias: {

          '@': path.join(__dirname, 'src')
        },
        // extensions:['',""]
        //  webpack 优先 src 目录下查找需要解析的文件
        modules: [resolve('src'), 'node_modules']
      },
    module: {
        // 不需要解析依赖的第三方大型类库
        // noParse:"",
        rules: [ //转换规则
            {
                test: /\.(s[ac]|c)ss$/i, //匹配所有的css/sass/scss文件
                // test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // "style-loader",
                    "css-loader",
                    // "postcss-loader",
                    "sass-loader"
                ] //use:对应loader的名称
            },
            {
                test: /\.(jpe?g|png|gif)$/i, // 匹配图片文件
                use: [
                    // webpack5
                    // {
                    //     test: /\.(jpe?g|png|gif)$/i,
                    //     type: 'asset',
                    //     generator: {
                    //       // 输出文件位置以及文件名
                    //       // [ext] 自带 "." 这个与 url-loader 配置不同
                    //       filename: "[name][hash:8][ext]"
                    //     },
                    //     parser: {
                    //       dataUrlCondition: {
                    //         maxSize: 50 * 1024 //超过50kb不转 base64
                    //       }
                    //     }
                    //   }
                    // 'file-loader', // 使用 file-loader
                    // {
                    //     loader: 'file-loader',
                    //     options: {
                    //         name: '[name][hash:8].[ext]'
                    //     }
                    // },
                    {
                        loader: 'url-loader',
                        options: {
                          name: '[name][hash:8].[ext]',
                          // 文件小于 50k 会转换为 base64，大于则拷贝文件
                          limit: 50 * 1024
                        }
                      }



                ]
            },
            {
                test: /\.js$/i,
                include: resolve('src'),
                exclude: /node_modules/,
                use: [
                  {
                    loader: 'babel-loader',
                    options: {
                      presets: [
                        '@babel/preset-env'
                      ],
                      cacheDirectory: true // 启用缓存
                    }
                  }
                ]
              }
        
        
        ]
    },
    devtool: 'source-map',
    plugins: [ //配置插件
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new CleanWebpackPlugin(), // 引入插件
        new MiniCssExtractPlugin({
            filename: "[name].[hash:8].css"
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "public"), //静态文件目录
        compress: true, //是否启动压缩gzip
        port: 8080, // 端口号
        //  open:true   是否自动打开浏览器
    }
}

module.exports = (env, argv) => {
    console.log("argv.mode=", argv.mode) //打印mode(模式)值
    // 这里可以通过不同的模式修改config配置
    return config
}