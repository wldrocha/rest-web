import { Router } from 'express'
import { TodosController } from './controller'
import { TodoDataSourceImpl } from '../../infraestructure/datasource/todo.datasource.impl'
import { TodoRepositoryImpl } from '../../infraestructure/repositories/todo.repository'

export class TodoRoutes {
  static get routes() {
    const router = Router()
    const dataSource = new TodoDataSourceImpl()
    const todoRepository = new TodoRepositoryImpl(dataSource)
    const todosController = new TodosController(todoRepository)

    router.get('/', todosController.getTodos)
    router.get('/:id', todosController.getTodoById)
    router.post('/', todosController.createTodo)
    router.put('/:id', todosController.updateTodo)
    router.delete('/:id', todosController.deleteTodo)

    return router
  }
}
