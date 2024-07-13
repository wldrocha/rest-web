import { CreateTodoDto, UpdateTodoDto } from '../dtos'
import { TodoEntity } from '../entities/todo.entity'

export abstract class TodoRepository {
  abstract create(createTodo: CreateTodoDto): Promise<TodoEntity>

  //todo: pagination
  abstract getAll(): Promise<TodoEntity[]>
  abstract getById(id: number): Promise<TodoEntity>
  abstract updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>
  abstract deleteById(id: number): Promise<TodoEntity>
}
