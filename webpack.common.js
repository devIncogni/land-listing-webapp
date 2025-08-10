const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.js",
    about: "./src/about.js",
    contact: "./src/contact.js",
    listings: "./src/listings.js",
    plotdetails: "./src/plotdetails.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/template.htm",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      filename: "about.html",
      template: "./src/about.htm",
      chunks: ["about"],
    }),
    new HtmlWebpackPlugin({
      filename: "contact.html",
      template: "./src/contact.htm",
      chunks: ["contact"],
    }),
    new HtmlWebpackPlugin({
      filename: "listings.html",
      template: "./src/listings.htm",
      chunks: ["listings"],
    }),
    new HtmlWebpackPlugin({
      filename: "plotdetails.html",
      template: "./src/plotdetails.htm",
      chunks: ["plotdetails"],
    }),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(html|htm)$/i,
        use: "html-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            targets: "defaults",
            presets: [["@babel/preset-env"]],
          },
        },
      },
    ],
  },
};
