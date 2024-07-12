import { Request, Response } from 'express'

const todos = [
  { id: 1, text: 'Buy milk', done: false },
  { id: 2, text: 'Buy eggs', done: true },
  { id: 3, text: 'Buy bread', done: false }
]

export class TodosController {
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    return res.json(todos)
  }

  public getTodoById = (req: Request, res: Response) => {
    const id = Number(req.params.id)
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' })
    const todo = todos.find((todo) => todo.id === id)
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' })
    }
    return res.json(todo)
  }
}
