const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const NormalModuleReplacementPlugin = require('webpack').NormalModuleReplacementPlugin;
const ContextReplacementPlugin = require('webpack').ContextReplacementPlugin;
const path = require('path');

module.exports = {

    watch: true,

    target: 'electron-renderer',

    entry: [
      './app/src/renderer_process.js',
      './app/src/systemclock/startClockThread.js'
    ],

    output: {
        path: __dirname + '/app/build',
        publicPath: '/app/build/',
        filename: 'bundle.js'
    },

    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude:  /(node_modules|bower_components)/,
                options: {
                    presets: ['es2015', 'stage-0', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                  loader: 'css-loader',
                  options: {
                    modules: true
                  }
                })
            },
            {
                test: /\.scss$/,
                use: [
                  {
                    loader: "style-loader"
                  },
                  {
                    loader: "css-loader"
                  },
                  {
                    loader: "sass-loader"
                  }
                ]
            },
            {
              test: /\.(png|jpg|gif|svg)$/,
              loader: 'file-loader',
              query: {
                  name: '[name].[ext]?[hash]'
              }
            }
        ]
    },

    plugins: [
      new CopyWebpackPlugin([
        {
          from: `${__dirname}/node_modules/midi/build/Release/midi.node`,
          to: `${__dirname}/app/build`
        },
        {
          from: `${__dirname}/node_modules/shared-memory-disruptor/build/Release/disruptor.node`,
          to: `${__dirname}/app/build`
        }
      ]),
      new NormalModuleReplacementPlugin(
        /^bindings$/,
        `${__dirname}/app/bindings.js`
      ),
      new ExtractTextPlugin({
        filename: 'bundle.css',
        disable: false,
        allChunks: true
      })
    ],

    resolve: {
      extensions: ['.js', '.json', '.jsx', '.node']
    }

}
