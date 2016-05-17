var path = require('path')

module.exports = {
    entry: "./src/EventManager.js",
    output: {
        path: path.join(__dirname, process.env.NODE_ENV === 'production' ? 'dist' : 'dev'),
        filename: "index.js",
        library: "evnt",
        libraryTarget: "umd"
    },
    module: {
        loaders: [
            { test: /\.js?$/, exclude: /node_modules/, loaders: ["babel"] },
        ]
    },
    resolve: {
        extensions: ['', '.js'],
        modulesDirectories: ["node_modules"]
    },
    devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : null
};
