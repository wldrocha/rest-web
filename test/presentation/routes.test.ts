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

  const todo1 = { text: 'todo 1' }
  const todo2 = { text: 'todo 2' }
  test('should return TODOS api/todos', async () => {
    await prisma.todo.deleteMany()
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


})
