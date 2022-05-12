const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: [
    'webpack-dev-server/client?http://localhost:8081',
    'webpack/hot/dev-server',
    './src/index.jsx'
  ],
  output: {
    path: path.join(__dirname, '/build/aft'),
    publicPath: '/',
    filename: 'bundle.[fullhash].js'
  },
  devServer: {
    static: './build',
    hot: true,
    historyApiFallback: true
  },
  watchOptions: {
    poll: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.VERSION': JSON.stringify('development')
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/index.html'
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/img', to: 'aft/img' }
      ]
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
