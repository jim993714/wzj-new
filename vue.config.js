module.exports = {
  devServer: {
    open: true,
    port: 8080,
  },
  // 配置rem布局的postcss-px2rem插件
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 36,
          }),
        ],
      },
    },
  },
};
