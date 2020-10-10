## Installing ReactJS - Create the Root Folder:

Create a folder to nstall all the required files, using the mkdir command.

```JavaScript
C:\Users\username\Project>mkdir app
C:\Users\username\Project>cd app
```

To create any module, it is required to generate the package.json file. To do so we need to run the npm init command from the command prompt.

```JavaScript
C:\Users\username\Project\app>npm init
```

```JavaScript
{ 
   "name": "reactApp",
   "version": "1.0.0",
   "description": "",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
   },
   "keywords": [],
   "author": "",
   "license": "ISC"
}
```

## Install React and react dom:

```JavaScript
C:\Users\username\Project\app>npm install react --save
C:\Users\username\Project\app>npm install react-dom --save
```

## webpack.config.js:

```JavaScript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: './main.js',
   output: {
      path: path.join(__dirname, '/bundle'),
      filename: 'index_bundle.js'
   },
   devServer: {
      inline: true,
      port: 8001
   },
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   },
   plugins:[
      new HtmlWebpackPlugin({
         template: './index.html'
      })
   ]
}
```
