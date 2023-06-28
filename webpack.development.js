const path = require('path');
const PugPlugin = require('pug-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	// режим разработки 'development', 'production', 'none'
	mode: 'development',
	// точка входа
	entry: {
		index: path.resolve(__dirname, './src/pug/index.pug'),
		// about: path.resolve(__dirname, './src/pug/about.pug'),
	},
	// точка выхода
	output: {
		path: path.resolve(__dirname, 'dist/'),
		publicPath: '/',
		filename: '[name].bundle.js',
	},
	// модули и загрузчики
	module: {
		rules: [
			// pug
			{
				test: /\.pug$/,
				loader: PugPlugin.loader,
			},
			// JavaScript
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			// Изображения
			{
				test: /\.(jpe?g|png|webp|gif|svg|ico)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'img/[name][ext]'
				},
				// Исключить папку со шрифтами
				exclude: [
					path.resolve(__dirname, 'src/fonts'),
				]
			},
			// CSS, PostCSS, Stylus
			{
				test: /\.(styl|css)$/,
				use: ['css-loader', 'stylus-loader'],
			},
			// Шрифты
			{
				test: /\.(woff2?|eot|ttf|otf|svg)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name][ext]'
				},
				// Исключить папку с картинками
				exclude: [
					path.resolve(__dirname, 'src/img'),
				]
			},
		],
	},
	// плагины
	plugins: [
		// Плагин очистки директории dist при каждой сборке
		new CleanWebpackPlugin(),
		// Плагин создания HTML на основе шаблона
		new PugPlugin({
			pretty: true, // форматирование HTML
			css: {
				filename: 'css/[name].bundle.css'
			},
			js: {
				filename: 'js/main.bundle.js',
			},
		})
	],
	devServer: {
		watchFiles: {
			paths: ['src/**/*.*'],
			//☝🏽 Enables HMR in these folders
			options: {
				usePolling: true
			}
		},
		static: {
			directory: path.join(__dirname, '../dist'),
		},
		hot: true,
		port: 3000,
	},
}