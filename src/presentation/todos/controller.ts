import { Request, Response } from 'express'
import { prisma } from '../../../data'

const todos = [
  { id: 1, text: 'Buy milk', completedAt: new Date() },
  { id: 2, text: 'Buy eggs', completedAt: null },
  { id: 3, text: 'Buy bread', completedAt: new Date() }
]

export class TodosController {
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany()
    if (todos.length < 1) return res.status(404).json({ error: 'No todos found' })
    return res.json(todos)
  }

  public getTodoById = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' })
    const todo = prisma.todo.findFirst({ where: { id } })
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' })
    }
    return res.json(todo)
  }

  public createTodo = async (req: Request, res: Response) => {
    const { text, completedAt } = req.body
    if (!text) return res.status(400).json({ error: 'Text property is required' })
    // todos.push(newTodo)
    const newTodo = await prisma.todo.create({
      data: { text }
    })

    return res.status(201).json(newTodo)
  }

  public updateTodo = (req: Request, res: Response) => {
    const id = Number(req.params.id)
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' })
    const { text, completedAt } = req.body
    if (!text) return res.status(400).json({ error: 'Text property is required' })
    const todo = todos.find((todo) => todo.id === id)
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' })
    }
    todo.text = text || todo.text
    todo.completedAt = completedAt === null ? null : (todo.completedAt = new Date(completedAt ?? todo.completedAt))
    return res.json(todo)
  }

  public deleteTodo = (req: Request, res: Response) => {
    const id = Number(req.params.id)
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' })
    const todo = todos.find((todo) => todo.id === id)
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' })
    }
    todos.splice(todos.indexOf(todo), 1)
    return res.status(200).send(todo)
  }
}
