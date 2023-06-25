const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	// режим разработки 'development', 'production', 'none'
	mode: 'development',
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
				test: /\.(jpe?g|png|webp|gif|svg)$/i,
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
				use: ['style-loader', 'css-loader', 'sass-loader'],
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
		// Плагин создания HTML на основе шаблона
		new HtmlWebpackPlugin({
			title: 'My webpack!',
			template: path.resolve(__dirname, './src/template.html'), // шаблон
			filename: 'index.html', // название выходного файла
			meta: {
				// <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
				'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
			},
		}),
		new HtmlWebpackPlugin({
			title: '404',
			template: path.resolve(__dirname, './src/template.html'), // шаблон
			filename: '404.html', // название выходного файла
			meta: {
				// <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
				'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
			},
		})
	],
	devServer: {
		static: {
			directory: path.join(__dirname, '../dist'),
		},
		hot: true,
		port: 3000,
	},
}