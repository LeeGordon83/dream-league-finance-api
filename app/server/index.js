const hapi = require('@hapi/hapi')
const config = require('../config')

const createServer = async () => {
  // Create the hapi server
  const server = hapi.server({
    port: config.port,
    routes: {
      validate: {
        options: {
          abortEarly: false
        }
      }
    },
    router: {
      stripTrailingSlash: true
    }
  })

  // Register the plugins
  await server.register(require('@hapi/inert'))
  await server.register(require('hapi-auth-jwt2'))
  await server.register(require('./plugins/router'))

  if (config.isDev) {
    await server.register(require('blipp'))
  }

  return server
}

module.exports = {
  createServer
}
