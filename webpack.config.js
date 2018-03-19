// 存在bug
// @ 问题一 babel@7 对于 @babel/env
// @ ————diranme
const path = require('path')
const fs = require('fs')
const  nodeModules = {}
fs.readdirSync('node_modules')
	.filter(function(x) {
		return ['.bin'].indexOf(x) === -1;
	})
	.forEach(function(mod) {
		nodeModules[mod] = 'commonjs ' + mod;
	})
module.exports  = {
	entry: './index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: "index.js",
		libraryTarget: 'commonjs'
	},
	module: {
		rules: [
			{
				test: /\.js/,
				exclude: '/node_modules',
				use: {
					loader: 'babel-loader'
				}
			}
		]
	},
	target: "node",
	externals: nodeModules
}