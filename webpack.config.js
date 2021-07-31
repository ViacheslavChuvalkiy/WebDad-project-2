const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  mode: 'development',

  module: {
    rules: [

      //////////JS/////////////////
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },

      /////////styles/////////////
      { test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      { test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },

      /////// images////////////
      { test: /\.png$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'images',
            name: '[name]-[sha1:hash:7].[ext]'
          }
        }
        ]
      },

      ///////////audio////////////
      { test: /\.mp3$/,
        use: 'file-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin(
      {template: './src/index.html'}
    )
  ],

  devServer: {
    open:true,
    watchContentBase: true,
    port: 3000,
  }

};
