var path = require('path')
var webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    vendor: ["vue", "jszip", "element-ui", "babel-polyfill", "axios"],
    login: './src/login',
    resume: './src/resume',
    management: './src/management',
    process: './src/process',
    welcome: './src/welcome',
    job: './src/job',
    resprin: './src/resprin'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
            'ts': 'babel-loader!ts-loader',
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.ts$/,
        loader: [
          { loader: 'babel-loader' },
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'vue-style-loader!css-loader'
      },
      {
        test: /\.(png|jpg|gif|svg|eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    proxy: {
      "/user": "http://202.114.18.67:6990",
      "/info": "http://202.114.18.67:6990",
      "/uploads": "http://202.114.18.67:6990",
      "/video": "http://202.114.18.67:6990",
    },
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      // filename: "vendor.js"
      // (Give the chunk a different name)

      minChunks: Infinity,
      // (with more entries, this ensures that no other module
      //  goes into the vendor chunk)
    })
  ],
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = module.exports.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      },
      '_DEBUG': 'false',
    }),
    new UglifyJSPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
} else {
  module.exports.plugins.push(
    new webpack.DefinePlugin({
      '_DEBUG': 'true',
    })
  )
}
