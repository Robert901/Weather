const path = require("path");
const entryPath = "./js";
const entryFile = "app.js";

module.exports = {
  entry: [`${entryPath}/${entryFile}`, "./scss/main.scss"],
  output: {
    filename: "out.js",
    path: path.resolve(__dirname, `${entryPath}/build`)
  },
  devServer: {
    contentBase: `./`,
    publicPath: "/build/",
    port: 3005
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?url=false']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader?url=false', 'sass-loader']
      }
    ]
  }
};
