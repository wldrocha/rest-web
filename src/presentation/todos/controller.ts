import { Request, Response } from 'express'
import { prisma } from '../../data'
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos'
import { TodoRepository } from '../../domain'

const todos = [
  { id: 1, text: 'Buy milk', completedAt: new Date() },
  { id: 2, text: 'Buy eggs', completedAt: null },
  { id: 3, text: 'Buy bread', completedAt: new Date() }
]

export class TodosController {
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll()
    return res.json(todos)
  }

  public getTodoById = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    try {
      const todo = await this.todoRepository.getById(id)
      return res.json(todo)
    } catch (error) {
      res.status(400).json({ error })
    }
  }

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body)

    if (error) return res.status(400).json({ error })

    const newTodo = await this.todoRepository.create(createTodoDto!)

    res.status(201).json(newTodo)
  }

  public updateTodo = async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id })
    if (error) return res.status(400).json({ error })

    const updatedTodo = await this.todoRepository.updateById(updateTodoDto!)

    return res.status(200).json(updatedTodo)
  }

  public deleteTodo = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' })
    const deletedTodo = await this.todoRepository.deleteById(id)
    console.log("🚀 ~ TodosController ~ publicdeleteTodo ~ deletedTodo:", deletedTodo)
    return res.status(200).json(deletedTodo)
  }
}
