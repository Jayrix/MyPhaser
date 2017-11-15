
module.exports = {
    entry: ["./js/app.js"],
    output: { filename: "./js/out.js" },
    devServer: {
        inline: true,
        contentBase: './',
        port: 3002
    },
    watch: true,

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: { presets: ['es2015', 'stage-2'] }
            },
            {
                test: /\.(png|jpg|gif)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            }
        ]
    },
    plugins: [

    ]
};