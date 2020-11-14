const TITLE = 'Events Calendar'

module.exports = {
  chainWebpack: (config) => {
    // Page Title
    config.plugin('html').tap((args) => {
      args[0].title = TITLE
      return args
    })

    // Worker Loader
    config.module.rule('js').exclude.add(/\.worker\.js$/)
    config.module
      .rule('worker')
      .test(/\.worker\.js$/)
      .use('worker-loader')
      .loader('worker-loader')
      .tap((options) => ({
        inline: 'fallback',
      }))
  },
  devServer: { https: true, host: 'localhost' },
}
