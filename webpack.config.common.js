const path = require('path');

const commonWebpackConfig = {
	optimization: {
		splitChunks: {
			chunks: 'async',
			minSize: 30000,
			maxSize: 0,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '~',
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true
				}
			}
		}
	},
	module: {
		rules: [
			{
				test: /\.(woff|woff2)$/,
				type: 'asset/resource',
				generator: {
					filename: '[path][name][ext]'
				}
			},
			{
				test: /\.(ttf|eot|svg)$/,
				type: 'asset/resource',
				generator: {
					filename: '[path][name][ext]'
				}
			},
			{
				test: /\.(png|jpg|gif)$/,
				type: 'asset/resource',
				generator: {
					filename: '[path][name][ext]',
					mimetype: 'image/png'
				}
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		modules: [path.resolve('./'), 'node_modules']
	}
	// devtool: 'inline-source-map',
};

module.exports = commonWebpackConfig;
