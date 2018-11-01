module.exports = {
  baseUrl: './',
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          <% if(includeRem) { %>
          require('postcss-pxtorem')({
            rootValue: 100
          })<% } %>
        ]
      }
    }
  },
  configureWebpack: {
    devServer: {
      disableHostCheck: true
    }
  }
}
