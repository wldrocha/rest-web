import { CreateTodoDto, TodoDataSource, TodoEntity, TodoRepository, UpdateTodoDto } from '../../domain'

export class TodoRepositoryImpl implements TodoRepository {
  constructor(private readonly todoDataSource: TodoDataSource) {}

  create(createTodo: CreateTodoDto): Promise<TodoEntity> {
    return this.todoDataSource.create(createTodo)
  }
  getAll(): Promise<TodoEntity[]> {
    return this.todoDataSource.getAll()
  }
  getById(id: number): Promise<TodoEntity> {
    return this.todoDataSource.getById(id)
  }
  updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    return this.todoDataSource.updateById(updateTodoDto)
  }
  deleteById(id: number): Promise<TodoEntity> {
    return this.todoDataSource.deleteById(id)
  }
}
