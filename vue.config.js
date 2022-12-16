const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    disableHostCheck: true,
    allowedHosts: [
      'https://todo-list-app-gurdian.up.railway.app/'
    ]
  }
})
