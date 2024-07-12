import { Router } from 'express'
import { TodoRoutes } from './todos/routes'

export class APPRoutes {
  static get routes() {
    const router = Router()

    router.use('/api/todos', TodoRoutes.routes)

    return router
  }
}
