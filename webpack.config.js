switch (process.env.NODE_ENV) {
  case 'test':
    module.exports = require('./webpack/test.config')
    break

  case 'prod':
  case 'production':
    module.exports = require('./webpack/prod.config')
    break

  default:
    module.exports = require('./webpack/dev.config')
    break
}
