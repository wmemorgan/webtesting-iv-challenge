const request = require('supertest')

const server = require('./server')

describe('server.js test suite', () => {
  it('server should be accessible with status code 200', async () => {
    const res = await request(server).get('/')
    expect(res.status).toBe(200)
  })

  it('server should return `up` status', async () => {
    const res = await request(server).get('/api')
    expect(res.body).toEqual({ status: 'up' })
  })

})