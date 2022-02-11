//상대경로를 사용하면 오류가남. 따라서 path를 사용한 절대경로를 써줘야함.
const path = require("path");
console.log(path.resolve(__dirname, ""));
module.exports = {
    entry: "./src/client/js/main.js",
    mode: "development",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "assets", "js"),
    },
    module: {
        rules: [
            {
                test: /\.js/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["@babel/preset-env", { targets: "defaults" }],
                        ],
                    },
                },
            },
        ],
    },
};
