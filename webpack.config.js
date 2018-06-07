const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader"
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader, 
            "css-loader",
            {
              loader: "sass-loader",
              query: {
                includePaths: [path.resolve(__dirname, "node_modules")]
              }
            }
          ]
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[path][name].[ext]',
                limit: 'assets/'
              }
            }
          ]
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [{
              loader: 'file-loader',
              options: {
                  name: '[name].[ext]',
                  outputPath: 'fonts/'
              }
          }]
      }
      ]
    },
    output: {
      publicPath: '/'
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      })
    ],
    externals: [
      'foundation-sites'
    ],
    devServer: {
      historyApiFallback: true,
      publicPath: '/'
    }
  };