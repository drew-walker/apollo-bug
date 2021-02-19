const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    plugins: [new HtmlWebpackPlugin()],
    devtool: false,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(graphqls?|gql)$/,
                exclude: /node_modules/,
                loader: 'graphql-tag/loader',
            },
        ],
    },
};
