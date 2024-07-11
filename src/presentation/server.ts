import express from 'express'
import path from 'path'

export class Server {
  private app = express()

  async start() {
    // middleware or functions that execute when the server receives a request

    //  public folder
    this.app.use(express.static('public'))
    this.app.get('*', (req, res) => {
      // show app when the server receives a request
      const indexPath = path.join(`${__dirname}../../../public/index.html`)
      res.sendFile(indexPath)
    })

    this.app.listen(3000, () => console.log('Server running at http://localhost:3000'))
  }
}
