import express from 'express'
import { apiRoutes } from './routes/routes'
import * as bodyParser from 'body-parser'

/**
 * Backend entry point.
 */
class Application {

  constructor () {
    this.app = express()

    this.app.use(bodyParser.json({limit: '50mb'}))

    this.app.use(apiRoutes)
  }

  /**
   * @description Starting application listen
   * When env 'ENABLE_SSL' is set and 'PRIVATE_KEY' 'CERTIFICATE' env variables
   * are set with path to certificates. Server starts in secure mode.
   *
   * @param port default 3000
   */
  listen (port = 3000) {
    this.port = port

    // not tested because no time, but should works ;)
    if (process.env.ENABLE_SSL && process.env.PRIVATE_KEY && process.env.CERTIFICATE) {
      const privateKey = fs.readFileSync(process.env.PRIVATE_KEY)
      const certificate = fs.readFileSync(process.env.CERTIFICATE)

      this.server = https.createServer({
        key: privateKey,
        cert: certificate
      }, app)

    } else {
      this.server = require('http').createServer(this.app)
    }

    this.server.listen(this.port, () => {
      console.log(`Chat256 API listening on port ${this.port}!`)
    })
  }
}

// TODO place that where you want :)
const app = new Application()
app.listen(process.env.PORT || 8080)



