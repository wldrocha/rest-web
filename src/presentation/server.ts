import express, { Router } from 'express'
import compresion from 'compression'
import path from 'path'

interface Options {
  port: number
  routes: Router
  public_path?: string
}

export class Server {
  public app = express()
  private serverLister?: any
  private readonly port: number
  private readonly publicPath: string
  private readonly routes: Router

  constructor({ port, routes, public_path = 'public' }: Options) {
    this.port = port
    this.publicPath = public_path
    this.routes = routes
  }

  async start() {
    // middleware or functions that execute when the server receives a request
    this.app.use(express.json()) // parse application/json
    this.app.use(express.urlencoded({ extended: true })) // parse application/x-www-form-urlencoded
    this.app.use(compresion()) // compress all responses

    // Routes
    this.app.use(this.routes)

    //  SPA
    this.app.use(express.static(this.publicPath))
    this.app.get('*', (req, res) => {
      // show app when the server receives a request
      const indexPath = path.join(`${__dirname}../../../${this.publicPath}/index.html`)
      res.sendFile(indexPath)
    })

    this.serverLister = this.app.listen(this.port, () => console.log(`Server running at http://localhost:${this.port}`))
  }

  public close() {
    this.serverLister?.close()
  }
}
