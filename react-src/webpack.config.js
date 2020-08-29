const webpack = require('webpack');
const path = require('path');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, arg) => {
    console.log("env:", env, " arg:", arg);

    var node_env = env || "development";
    var config = {};
    let version = new Date().getTime();

    var isProduction = node_env === 'production';

    //Lấy config theo NODE_ENV
    try {
        config = require('./configs/config.' + node_env + '.js') || {};
    } catch (ex) {
        throw new Error('Config is not exist in ' + node_env + ' mode');
    }

    return {
        entry: {
            'login': path.join(__dirname, '/login/app.jsx'),
            'question-manager': path.join(__dirname, '/question-manager/app.jsx'),
            'list-account': path.join(__dirname, '/listaccount/app.jsx')

        },
        output: {
            filename: '[name].js',
            path: path.join(__dirname, "../public/js"),
            pathinfo: false,
            pathinfo: (node_env === 'development')
        },
        devServer: {
            historyApiFallback: true,
        },
        plugins: [
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: '[name].css',
                chunkFilename: '[name].[id].css',
            }),
            new webpack.DefinePlugin({
                'NODE_ENV': JSON.stringify(node_env),
                'STATIC_PATH': JSON.stringify(config.staticPath || ""),
                'VERSION': JSON.stringify(version),
                //'EDITOR_CONFIG_PATH': JSON.stringify(config.editorConfigPath || "")
                'EDITOR_CONFIG_PATH': JSON.stringify(config.editorPath || "")
            }),
            new MinifyPlugin({
                removeDebugger: true,
                removeConsole: isProduction
            })
        ],
        module: {
            rules: [{
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: ['latest', 'stage-0', "react"],
                        }
                    }]
                },
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader'],
                },
                {
                    test: /\.svg$/,
                    loader: 'svg-inline-loader'
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    loader: 'file-loader',
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [{
                        loader: 'file-loader?name=fonts/[name].[ext]'
                    }],
                },
            ]
        },
    };
};