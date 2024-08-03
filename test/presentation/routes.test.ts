import request from 'supertest'
import { testServer } from '../test-server'
import test from 'node:test'

describe('Todo route testing', () => {
  beforeAll(async () => {
    await testServer.start()
  })

  afterAll(async () => {
    testServer.close()
  })
  test('should return TODOS', async () => {
    const response = await request(testServer.app).get('/api/todos').expect(200)
    console.log('🚀 ~ test ~ response.body:', response.body)
  })
})
