const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  devtool: 'source-map',
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'public' }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
    ]
  },
  resolve: {
    alias: {
      Sourse: path.resolve(__dirname, 'src'),
      Model: path.resolve(__dirname, 'src/model/'),
      View: path.resolve(__dirname, 'src/view/'),
      Presenter: path.resolve(__dirname, 'src/presenter/'),
      Framework: path.resolve(__dirname, 'src/framework/'),
    },
  },
};
