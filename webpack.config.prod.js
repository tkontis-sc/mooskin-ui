const path = require('path');
const { merge } = require('webpack-merge');
const distFolder = 'lib';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const commonWebpackConfig = require('./webpack.config.common');

// const glob = require('glob');
// const entries = glob
//     .sync('./components/*/index.ts', { ignore: ['./stories/*.tsx', './legacy/*.tsx', '**/*.spec.tsx', '**/*.spec.ts'] })
//     .map(function (entry) {
//         //gets the module paths in components containing index.ts and assigns them to an object
//         var obj = {};
//         var key = entry.split('/');
//         key = key[key.length - 2];

//         obj[key] = entry;

//         return obj;
//     })
//     .reduce(function (acc, curr) {
//         for (var i in curr) {
//             acc[i] = curr[i];
//         }

//         return acc;
//     }, {});

// var entries['index'] = './index/index.ts';

const prodWebPackConfig = merge(commonWebpackConfig, {
	mode: 'production',
	entry: './components/index/index.ts',
	output: {
		path: path.resolve(__dirname, distFolder),
		filename: 'index/index.js',
		library: {
			name: 'mooskin',
			type: 'umd',
			umdNamedDefine: true
		},
		globalObject: 'this',
		publicPath: '../'
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: [
					'babel-loader',
					{
						loader: 'ts-loader',
						options: {
							compilerOptions: {
								declaration: true,
								declarationDir: path.resolve(__dirname, distFolder)
							}
						}
					}
				]
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: true
						}
					},
					'postcss-loader'
				]
			},
			{
				test: /\.css$/,
				include: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({ filename: 'index/style.css' })
	],
	externals: {
		react: 'react',
		'react-dom': 'react-dom'
	}
});

module.exports = prodWebPackConfig;
