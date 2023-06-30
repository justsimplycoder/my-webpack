const path = require('path');
const PugPlugin = require('pug-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	// режим разработки 'development', 'production', 'none'
	mode: 'production',
	// под какие браузеры собирать на продакшен
	target: 'browserslist',
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
				use: [
					{
						// Оптимизация изображений
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								progressive: true,
							},
							// optipng.enabled: false will disable optipng
							optipng: {
								enabled: false,
							},
							pngquant: {
								quality: [0.65, 0.90],
								speed: 4
							},
							gifsicle: {
								interlaced: false,
							},
							// the webp option will enable WEBP
							webp: {
								quality: 75
							}
						}
					}
				],
				type: 'asset/resource',
				generator: {
					filename: 'img/[name][ext]'
				},
				// Исключить папку со шрифтами
				exclude: [
					path.resolve(__dirname, 'src/fonts'),
				]
			},
			// CSS, PostCSS, Sass
			{
				test: /\.(styl|css)$/,
				use: ['css-loader', 'postcss-loader', 'stylus-loader'],
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
			css: {
				filename: 'css/[name].[contenthash:10].css'
			},
			js: {
				filename: 'js/[name].[contenthash:10].js',
			},
		})
	],
}