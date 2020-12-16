const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: process.env.NODE_ENV,
	// entry
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		publicPath: '/',
		filename: 'bundle.js',
	},
	// module rules
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
					},
				},
			},
			{
				test: /\.s[ac]ss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|svg|gif|jpg)$/,
				use: ['file-loader'],
			},
		],
	},
	// plugins
	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.html',
		}),
	],
	devServer: {
		publicPath: '/',
		port: 8080,
		hot: true,
		compress: true,
		historyApiFallback: true,
		proxy: {
			'/': 'http://localhost:3000',
			'/build': 'http://localhost:3000',
		},
	},
};
