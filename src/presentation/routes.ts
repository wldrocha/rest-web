import { Router } from 'express'

export class APPRoutes {
  static get routes() {
    const router = Router()

    router.get('/api/todos', (req, res) => {
      res.json([
        { id: 1, text: 'Buy milk', done: false },
        { id: 2, text: 'Buy eggs', done: true },
        { id: 3, text: 'Buy bread', done: false }
      ])
    })

    return router
  }
}
