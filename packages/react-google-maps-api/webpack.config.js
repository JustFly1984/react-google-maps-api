module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js",
    path: __dirname +'/dist'
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.ts|\.tsx$/,
        loader: "awesome-typescript-loader"
      }
    ]
  }
}