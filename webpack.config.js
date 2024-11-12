//webpack.config.js
const path = require('path');

module.exports = {
    mode: "production",
    target: "node", // Specify the target environment as Node.js
    entry: {
        main: "./src/index.ts",
    },
    output: {
        path: path.resolve(__dirname, './prod'),
        filename: "raycast-bundle.js" // <--- Will be compiled to this single file
    },
    resolve: {
        extensions: [".ts"],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    externals: {
        // Exclude node_modules from the bundle
        // This is useful for Node.js applications
        // where you want to keep the node_modules separate
        // and not bundle them into the output file
        'fs': 'commonjs fs',
        'path': 'commonjs path'
    }
};