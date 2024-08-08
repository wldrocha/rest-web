import { prisma } from '../../data'
import { CreateTodoDto, TodoDataSource, TodoEntity, UpdateTodoDto } from '../../domain'

export class TodoDataSourceImpl implements TodoDataSource {
  async create(createTodo: CreateTodoDto): Promise<TodoEntity> {
    const newTodo = await prisma.todo.create({
      data: createTodo
    })

    return TodoEntity.fromObject(newTodo)
  }
  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany()
    return todos.map((todo: { [key: string]: any }) => TodoEntity.fromObject(todo))
  }
  async getById(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findFirst({ where: { id } })
    if (!todo) throw `Todo with id ${id} not found`
    return TodoEntity.fromObject(todo)
  }
  async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    const todo = await this.getById(updateTodoDto.id)
    const updatedTodo = await prisma.todo.update({
      where: { id: updateTodoDto.id },
      data: updateTodoDto!.values
    })
    return TodoEntity.fromObject(updatedTodo)
  }
  async deleteById(id: number): Promise<TodoEntity> {
    const todo = await this.getById(id)

    await prisma.todo.delete({ where: { id } })

    return todo
  }
}
