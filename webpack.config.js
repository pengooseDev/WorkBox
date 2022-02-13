//상대경로를 사용하면 오류가남. 따라서 path를 사용한 절대경로를 써줘야함.
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
console.log(path.resolve(__dirname, ""));
module.exports = {
    entry: "./src/client/js/main.js",
    mode: "development",
    watch: true,
    //아래는 CSS플러그인이기 때문에, 위에서 해준 js 설정과 같이 css설정은 new MiniCssExtractPlugin() 안에서 해줌.
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/styles.css",
        }),
    ],
    output: {
        filename: "js/main.js",
        path: path.resolve(__dirname, "assets"),
        clean: true, //이걸하면 output이 생길 때 clean해줌. 이전에 파일 삭제하고 새파일 설치
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
            {
                test: /\.scss$/,
                //1.scss->css loader : npm i sass-loader sass webpack --save-dev
                //2. font loader : npm i --save-dev css-loader
                //3. css to html loader : npm i --save-dev style-loader
                //webpack의 use에서 리스트는 가장 뒤에서부터 시작하기 때문에 역순으로 써줘야한다.
                //아래처럼.
                //"style-loader"를 쓰면 CSS와 JS의 구분이 없지만, MiniCssExtractPlugin.loader를 사용하면
                // CSS와 JS를 구분해 사용할 수 있음
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
        ],
    },
};
