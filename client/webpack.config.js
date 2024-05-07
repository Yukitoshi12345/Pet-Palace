const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");
const HotModuleReplacementPlugin =
  require("webpack").HotModuleReplacementPlugin;

module.exports = () => {
  return {
    mode: "development",
    //Entry points for the application
    entry: {
      bundle: "./src/main.jsx, ./src/data.jsx",
      install: "./src/install.js",
    },
    //Output for the application
    output: {
      filename: "[name][contenthash].js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
      assetModuleFilename: "[name][ext]",
    },
    devtool: "source-map",
    devServer: {
      static: {
        directory: path.resolve(__dirname, "dist"),
      },
      port: 9000,
      open: true,
      hot: "only",
      // hot: true,
      compress: true,
      historyApiFallback: true,
    },
    module: {
      rules: [
        //CSS loaders
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },

        //image loaders
        {
          test: /\.(png|svg|jpe?g|gif)$/i,
          type: "asset/resource",
        },

        //Babel loader to transpile ES6 to ES5
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-transform-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
    plugins: [
      //automatically let modules to be updated at runtime without the need to refresh the page
      new HotModuleReplacementPlugin(),
      //generates an HTML file for the application and injects the bundles
      new HtmlWebpackPlugin({
        filename: "index.html",
        title: "Pet Palace",
        template: "./index.html",
      }),
      //generates a service worker file for the application
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "dest-sw.js",
      }),
      //generates a manifest file for the application
      new WebpackPwaManifest({
        name: "Pet Palace",
        short_name: "Pet Palace",
        description:
          "Pet Palace is a web application that allows users to view and adopt pets from a local animal shelter.",
        display: "standalone",
        orientation: "any",
        background_color: "#272822",
        theme_color: "#A16207",
        start_url: "./",
        publicPath: "./",
        id: "/",
        fingerprints: false,
        icons: [
          {
            src: path.resolve("src/assets/images/icon.gif"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
            type: "image/gif",
            purpose: "any",
          },
        ],
        screenshots: [
          {
            src: "./screenshot.png",
            sizes: "636x617",
            type: "image/png",
            form_factor: "wide",
            label: "Pet Palace",
          },
          {
            src: "./screenshot.png",
            sizes: "636x617",
            type: "image/png",
            form_factor: "narrow",
            label: "Pet Palace",
          },
        ],
        display_override: ["window-controls-overlay"],
        /*
        protocol_handlers: [
          {
            protocol: "",
            url: "/",
          }
        ],
        */
      }),
    ],
  };
};
