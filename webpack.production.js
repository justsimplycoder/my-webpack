const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	// режим разработки 'development', 'production', 'none'
	mode: 'production',
	// точка входа
	entry: {
		// Точка входа для typescript
		main: path.resolve(__dirname, './src/index.ts'),
	},
	// точка выхода
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js',
	},
	// модули и загрузчики
	module: {
		rules: [
			// TypeScript
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
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
				test: /\.(sa|sc|c)ss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
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
	// Разрешения модулей
	resolve: {
		// Порядок разрешения
		extensions: ['.tsx', '.ts', '.js'],
	},
	// плагины
	plugins: [
		// Плагин очистки директории dist при каждой сборке
		new CleanWebpackPlugin(),
		// Создание минифицированного css файла
		new MiniCssExtractPlugin({
			filename: "css/main.bundle.css",
		}),
		// Плагин создания HTML на основе шаблона
		new HtmlWebpackPlugin({
			title: 'My webpack!',
			template: path.resolve(__dirname, './src/template.html'), // шаблон
			filename: 'index.html', // название выходного файла
			meta: {
				// <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
				'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
			},
			favicon: path.resolve(__dirname, './src/favicon.ico'),
		}),
		new HtmlWebpackPlugin({
			title: '404',
			template: path.resolve(__dirname, './src/template.html'), // шаблон
			filename: '404.html', // название выходного файла
			meta: {
				// <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
				'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
			},
			favicon: path.resolve(__dirname, './src/favicon.ico'),
		})
	],
}