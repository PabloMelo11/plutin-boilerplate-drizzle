import { e2e } from '@test/setup-e2e'
import { randomUUID } from 'node:crypto'
import request from 'supertest'

describe('create book (e2e)', async () => {
  const app = await e2e()

  beforeAll(async () => {
    await app.up()
  })

  afterAll(async () => {
    await app.down()
  })

  test('[POST] /books - status 200', async () => {
    const response = await request(app.server).post('/api/books').send({
      authorId: randomUUID(),
      title: 'test',
      content: 'test',
    })

    expect(response.body).toEqual(
      expect.objectContaining({
        data: expect.objectContaining({
          id: expect.any(String),
        }),
      })
    )
  })
})
