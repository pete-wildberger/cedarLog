const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = [
  {
    name: "dev",
    entry: "./src/client/index.tsx",
    mode: "development",
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    output: {
      path: path.join(__dirname, "/dist"),
      filename: "bundle.min.js",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "awesome-typescript-loader",
        },
      ],
    },
    plugins: [
      new BundleAnalyzerPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/client/index.html",
      }),
    ],
  },
  {
    name: "prod",
    entry: "./src/client/index.tsx",
    mode: "production",
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    output: {
      path: path.join(__dirname, "/dist"),
      chunkFilename: "[id].bundle.js",
      filename: "bundle.min.js",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "awesome-typescript-loader",
        },
      ],
    },
    plugins: [
      // new BundleAnalyzerPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/client/index.html",
        minify: true,
      }),
    ],
  },
];
