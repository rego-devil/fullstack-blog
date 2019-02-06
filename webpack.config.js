const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	context: path.resolve(__dirname, 'client/src'),

	devtool: 'source-map',
	mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',

	entry: {
		custom: ['./app'],		
	},

	output: {
		path: path.resolve(__dirname, 'client/public'),
    filename: './script/[name].bundle.js',
    // publicPath: '/',
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			}
		],
	},

	resolve: {
		extensions: ['.js', '.jsx'],
	},

	plugins: [

		// process.env.NODE_ENV === 'development' && new webpack.NamedModulesPlugin(),
		process.env.NODE_ENV === 'development' && new webpack.HotModuleReplacementPlugin(),

		new HtmlWebpackPlugin({
			title: 'Full stack app',
			template: './index.html',
    	}),
	].filter(Boolean),

	devServer: {  
    port: 5001,
    hot: true,
		compress: true,
		// contentBase: './',
		historyApiFallback: true
  }
  
};