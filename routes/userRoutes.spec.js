let request = require('supertest')

const db = require('../data/dbConfig')
const server = require('../api/server')

describe('Users endpoint testing', () => {
  // Clean up database after each test
  afterEach(async () => {
    await db('Users').truncate()
  })

  describe('GET /users', () => {
    // Seed with test data
    const testUsers = [
      { id: 1, name: 'George', email: 'george@mail.com' },
      { id: 2, name: 'Steve', email: 'steve@gmail.com' },
      { id: 3, name: 'Harry', email: 'harry@hotmail.com' },
    ]
    beforeEach(async () => {
      await db('Users').insert(testUsers)
    })

    it('should return status code 200', async () => {
      const res = await request(server).get('/api/users')
      expect(res.status).toBe(200)
    })
    
    it('should return all users in test database', async () => {
      const res = await request(server).get('/api/users')
      expect(res.body).toEqual(testUsers)
    })

    it('/users/:id should return user by id', async () => {
      let id = 1
      const res = await request(server).get(`/api/users/${id}`)
      expect(res.body).toEqual(testUsers[id-1])
    })

  })

  describe('POST /users', () => {
    const testUser = { name: 'George', email: 'george@mail.com' }

    it('will receive status code that record was created', async () => {
      const res = await request(server).post(`/api/users`).send(testUser)
      expect(res.status).toBe(201)
    })

    it('should receive the new user', async () => {
      const res = await request(server).post(`/api/users`).send(testUser)
      expect(res.body.name).toEqual(testUser.name)
      expect(res.body.email).toEqual(testUser.email)
    })
  })

  describe('DELETE /users/:id', () => {
    // Seed with test data
    const testUsers = [
      { id: 1, name: 'George', email: 'george@mail.com' },
      { id: 2, name: 'Steve', email: 'steve@gmail.com' },
      { id: 3, name: 'Harry', email: 'harry@hotmail.com' },
    ]
    beforeEach(async () => {
      await db('Users').insert(testUsers)
    })

    it('confirm successful deletion', async () => {
      const id = 1
      const res = await request(server).delete(`/api/users/${id}`)
      expect(res.status).toBe(200)
      expect(res.body).toEqual({ message: `Successfully deleted record ${id}` })
    })

    it('confirm test user no longer exists', async () => {
      const id = 1
      await request(server).delete(`/api/users/${id}`)
      const res = await request(server).get(`/api/users/${id}`)
      expect(res.status).toBe(404)
      expect(res.body).toEqual({ message: `Record ${id} not found` })
    })
  })

})