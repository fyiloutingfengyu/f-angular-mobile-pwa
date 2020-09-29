console.log('webpack.config.js配置文件执行了...')
// postcss插件
const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    syntax: 'postcss-scss',
    plugins: () => [
      require('postcss-import')({
        path: ['src']
      }),
      require('precss')(),
      require('postcss-px-to-viewport')({
        viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
        // viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
        unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数
        viewportUnit: "vw", //指定需要转换成的视窗单位，建议使用vw
        selectorBlackList: ['.ignore'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
        minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
        mediaQuery: false // 允许在媒体查询中转换`px`
      }),
      // angular-cli自带的已经.browserslistrc已经集成了autoprefixer
      // https://angular.cn/guide/build
      /*require('autoprefixer')({
        overrideBrowserslist: [
          "Android 4.1",
          "iOS 7.1",
          "Chrome > 31",
          "ff > 31",
          "ie >= 8"
        ],
        grid: true
      }),*/
    ]
  }
};

module.exports = (config, options) => {
  // config就是系统的webpack配置
  // 第一步过滤掉系统的css和sass处理
  config.module.rules = config.module.rules.filter(
    rule => rule.test.toString() !== '/\\.scss$|\\.sass$/' && rule.test.toString() !== '/\\.css$/'
  );

  // 配置自定义的css处理
  config.module.rules.push({
    test: /\.(css)$/,
    use: [
      'style-loader',
      'css-loader',
      'sass-loader',
      postcssLoader
    ]
  });

  // 配置自定义的sass处理
  config.module.rules.push({
    test: /\.(scss|sass)$/,
    use: [
      'to-string-loader',
      'css-loader',
      'sass-loader',
      postcssLoader
    ],
  });

  console.log('config ==>', config)
  return config
};
