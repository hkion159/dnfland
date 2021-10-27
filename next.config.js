const withImages = require('next-images');
const nodeExternals = require('webpack-node-externals');

module.exports = /*withImages(*/ {
  reactStrictMode: true,
  images: {
    domains: ['img-api.neople.co.kr'],
    // disableStaticImages: true,
  },
  webpack5: true,
  webpack: (config) => {
    config.externals.push('_http_common');
    return config;
  },
  //   config.resolve.fallback = {
  //     fs: false,
  //     path: false,
  //     stream: false,
  //     constants: false,
  //     net: false,
  //     tls: false,
  //     os: false,
  //     events: false,
  //     //
  //     dns: false,
  //     http: false,
  //     https: false,
  //     readline: false,
  //   };
  //   config.module.rules.push({
  //     test: /\.(exe|md|apk|ps1|sh|html|ttf)$/,
  //     use: 'raw-loader',
  //   });
  //   config.target = 'electron-renderer';
  //   config.node = { __dirname: true };
  // config.plugins = [
  //   new ContextReplacementPlugin(
  //     'C:\\Users\\JSW\\Desktop\\project\\node_modules\\playwright\\node_modules\\playwright-core\\browsers.json',
  //   ),
  // ];
  // return config;
  // },
};
