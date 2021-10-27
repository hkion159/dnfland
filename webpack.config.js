module.exports = {
  externals: {
    _http_common: 'commonjs2 _http_common',
  },
  module: {
    rules: [
      {
        test: /\.(gif|svg|jpg|png)$/,
        use: 'file-loader',
      },
    ],
  },
};
