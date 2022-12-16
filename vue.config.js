const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    allowedHosts: [
      'https://todo-list-app-gurdian.up.railway.app/'
    ]
  }
})
