import request from 'supertest'
import { testServer } from '../test-server'
import { prisma } from '../../src/data'

describe('Todo route testing', () => {
  beforeAll(async () => {
    await testServer.start()
  })

  afterAll(() => {
    testServer.close()
  })

  beforeEach(async () => {
    await prisma.todo.deleteMany()
  })
  const todo1 = { text: 'todo 1' }
  const todo2 = { text: 'todo 2' }

  const todoIdNotExist = 0

  test('should return TODOS api/todos', async () => {
    await prisma.todo.createMany({
      data: [todo1, todo2]
    })
    const { body } = await request(testServer.app).get('/api/todos').expect(200)

    expect(body).toBeInstanceOf(Array)
    expect(body.length).toBe(2)

    expect(body[0].text).toBe(todo1.text)
    expect(body[1].text).toBe(todo2.text)
    expect(body[0].completedAt).toBeUndefined()
  })

  test('should return TODO  api/todo/:id', async () => {
    const todo = await prisma.todo.create({ data: todo1 })

    const { body } = await request(testServer.app).get(`/api/todos/${todo.id}`).expect(200)
    expect(body).toEqual({
      id: todo.id,
      text: todo.text,
      completedAt: undefined
    })
  })

  test('should not return a 404 not found TODO api/todo/:id', async () => {
    const { body } = await request(testServer.app).get(`/api/todos/${todoIdNotExist}`).expect(400)

    expect(body).toEqual({ error: `Todo with id ${todoIdNotExist} not found` })
  })

  test('should return a new TODO api/todos', async () => {
    const { body } = await request(testServer.app).post('/api/todos').send(todo1).expect(201)
    expect(body).toEqual({
      id: expect.any(Number),
      text: todo1.text,
      completedAt: undefined
    })
  })

  test('should return an error if text not present api/todos', async () => {
    const { body } = await request(testServer.app).post('/api/todos').send({}).expect(400)

    expect(body).toEqual({ error: expect.any(String) })
  })

  test('should return an error if text is empty api/todos', async () => {
    const { body } = await request(testServer.app).post('/api/todos').send({ text: '' }).expect(400)

    expect(body).toEqual({ error: expect.any(String) })
  })

  test('should to update a todo api/todos/:id', async () => {
    const todo = await prisma.todo.create({ data: todo1 })

    const updateTodo = { text: 'updated todo', completedAt: '2024-08-08' }

    const { body } = await request(testServer.app).put(`/api/todos/${todo.id}`).send(updateTodo).expect(200)
    expect(body).toEqual({
      id: todo.id,
      text: updateTodo.text,
      completedAt: `${updateTodo.completedAt}T00:00:00.000Z`
    })
  })

  test('should return 404 api/todos/:id', async () => {
    const { body } = await request(testServer.app).put(`/api/todos/${todoIdNotExist}`).send({}).expect(400)
    expect(body).toEqual({ error: expect.any(String) })
  })

  test('should return an updated TODO only the date api/todos/:id', async () => {
    const todo = await prisma.todo.create({ data: todo1 })
    const updateTodo = { completedAt: '2024-08-08' }
    const { body } = await request(testServer.app).put(`/api/todos/${todo.id}`).send(updateTodo).expect(200)
    expect(body).toEqual({
      id: todo.id,
      text: todo.text,
      completedAt: `${updateTodo.completedAt}T00:00:00.000Z`
    })
  })

  test('should return an updated TODO only the text api/todos/:id', async () => {
    const todo = await prisma.todo.create({ data: todo1 })
    const updateTodo = { text: 'updated todo' }
    const { body } = await request(testServer.app).put(`/api/todos/${todo.id}`).send(updateTodo).expect(200)
    expect(body).toEqual({
      id: todo.id,
      text: updateTodo.text,
      completedAt: undefined
    })
  })
})
