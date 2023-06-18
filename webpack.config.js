const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	// режим разработки 'development', 'production', 'none'
	mode: 'production',
	// точка входа
	entry: {
		main: path.resolve(__dirname, './src/index.js'),
	},
	// точка выхода
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].bundle.js',
	},
	// модули и загрузчики
	module: {
		rules: [
			// JavaScript
			{
					test: /\.js$/,
					exclude: /node_modules/,
					use: ['babel-loader'],
			},
		],
	},
	// плагины
	plugins: [
		// Плагин очистки директории dist при каждой сборке
		new CleanWebpackPlugin(),
		// Плагин создания HTML на основе шаблона
		new HtmlWebpackPlugin({
			title: 'Заголовок страницы',
			template: path.resolve(__dirname, './src/template.html'), // шаблон
			filename: 'index.html', // название выходного файла
		}),
	],
}