import express from 'express'

export class Server {
  private app = express()

  async start() {
    // middleware or functions that execute when the server receives a request

    //  public folder
    this.app.use(express.static('public'))
    this.app.listen(3000, () => console.log('Server running at http://localhost:3000'))
  }
}
