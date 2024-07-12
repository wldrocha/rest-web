import { Router } from 'express'
import { TodosController } from './controller'

export class TodoRoutes {
  static get routes() {
    const router = Router()
    const todosController = new TodosController()

    router.get('/', todosController.getTodos)
    router.get('/:id', todosController.getTodoById)

    return router
  }
}
