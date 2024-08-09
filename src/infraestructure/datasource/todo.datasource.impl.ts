import { prisma } from '../../data'
import { CreateTodoDto, CustomError, TodoDataSource, TodoEntity, UpdateTodoDto } from '../../domain'

export class TodoDataSourceImpl implements TodoDataSource {
  async create(createTodo: CreateTodoDto): Promise<TodoEntity> {
    const newTodo = await prisma.todo.create({
      data: createTodo
    })

    return TodoEntity.fromObject(newTodo)
  }
  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany()
    return todos.map((todo) => TodoEntity.fromObject(todo))
  }
  async getById(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findFirst({ where: { id } })
    if (!todo) throw new CustomError(`Todo with id ${id} not found`, 404)
    return TodoEntity.fromObject(todo)
  }
  async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    await this.getById(updateTodoDto.id)
    const updatedTodo = await prisma.todo.update({
      where: { id: updateTodoDto.id },
      data: updateTodoDto!.values
    })
    return TodoEntity.fromObject(updatedTodo)
  }
  async deleteById(id: number): Promise<TodoEntity> {
    await this.getById(id)

    const deleted = await prisma.todo.delete({ where: { id } })

    return TodoEntity.fromObject(deleted)
  }
}
