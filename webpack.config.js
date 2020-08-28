const path = require('path');

module.exports = {
    entry: './static/dist/main.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'static'),
    },
   module: {
     rules: [
       {
         test: /\.css$/,
         use: [
           'style-loader',
           'css-loader',
         ],
       },
     ],
   },
  };
