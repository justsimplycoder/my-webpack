const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	// режим разработки 'development', 'production', 'none'
	mode: 'development',
	// точка входа
	entry: {
		main: {
			import: path.resolve(__dirname, './src/index.js'),
			dependOn: 'react-vendors'
		},
		'react-vendors': ['react', 'react-dom', 'react-router-dom'],
	},
	// точка выхода
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].js',
	},
	// модули и загрузчики
	module: {
		rules: [
			// JavaScript, React
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
					},
				},
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
	optimization: {
		// runtimeChunk: 'single'
		splitChunks: {
			chunks: 'all'
		}
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
			favicon: path.resolve(__dirname, './src/favicon.ico'),
		}),
	],
	devServer: {
		static: {
			directory: path.join(__dirname, '../dist'),
		},
		hot: true,
		port: 3000,
	},
}