let webpack = require('webpack');
let path = require('path');
let inProduction = process.env.NODE_ENV === 'production';
//let BuildManifestPlugin = require('./build/plugins/BuildManifestPlugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
    entry : {
        main : './src/js/main.js',
        vendor: ['jquery']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: './dist/',
        filename: 'js/[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test :/\.css$/,
                use: [
                    { 
                        loader: 'style-loader',
                    },
                    { 
                        loader: 'css-loader'
                    }
                ],
            },
            {
                test: /\.(eot|woff|ttf|wof2)$/,
                use: 'file-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[hash].[ext]'
                        }
                    },
                    'img-loader'
                ]
            },
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader"
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: __dirname,
            verbose: true,
            dry: false
        }),
        new webpack.LoaderOptionsPlugin({
            minimize : inProduction
        }), 
        //new BuildManifestPlugin(),
    ]
};

if (inProduction) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
}

