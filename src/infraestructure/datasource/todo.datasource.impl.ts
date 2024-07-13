import { prisma } from '../../data'
import { CreateTodoDto, TodoDataSource, TodoEntity, UpdateTodoDto } from '../../domain'

export class TodoDataSourceImpl implements TodoDataSource {
  create(createTodo: CreateTodoDto): Promise<TodoEntity> {
    throw new Error('Method not implemented.')
  }
  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany()
    return todos.map((todo) => TodoEntity.fromObject(todo))
  }
  getById(id: number): Promise<TodoEntity> {
    throw new Error('Method not implemented.')
  }
  updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    throw new Error('Method not implemented.')
  }
  deleteById(id: number): Promise<TodoEntity> {
    throw new Error('Method not implemented.')
  }
}
