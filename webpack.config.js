const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		main: path.resolve(__dirname, 'src/index.js'),
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	devtool: 'source-map',
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'dist'),
		},
		open: true,
		hot: true,
	},
	module: {
		rules: [
			{
				test: /\.(css|scss)$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,

				type: 'asset/resource',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,

				type: 'asset/resource',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'To Do Application',
			filename: 'index.html',
			template: './src/template.html',
		}),
	],
};
