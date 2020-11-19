const TITLE = 'Events Calendar'

module.exports = {
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = TITLE
      return args
    })

    config.module.rule('js').exclude.add(/\.worker\.js$/i)
    config.module
      .rule('comlink-loader')
      .test(/\.worker\.js$/i)
      .use('comlink-loader')
      .loader('comlink-loader')
      .tap(() => ({
        singleton: true,
      }))
      .end()
  },
  devServer: { https: true, host: 'localhost' },
}
