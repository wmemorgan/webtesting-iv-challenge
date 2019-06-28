const db = require('../dbConfig')
const Users = require('./index')

describe('Users data model', () => {
  // Clean up database after each test
  afterEach(async () => {
    await db('Users').truncate()
  })

  it('confirm environment for test database', () => {
    expect(process.env.DB_ENV).toBe('testing')
  })

  describe('findAll()', () => {

    it('find all records in table', async () => {
      // Seed with test data
      const testUsers = [
        { id: 1, name: 'George', email: 'george@mail.com' },
        { id: 2, name: 'Steve', email: 'steve@gmail.com' },
        { id: 3, name: 'Harry', email: 'harry@hotmail.com' },
      ]
      await db('Users').insert(testUsers)

      const users = await Users.findAll('Users')
      
      expect(users).toEqual(testUsers)
    })
  })

  describe('findById()', () => {
    it('find a user by id', async () => {
      // Seed with test data
      const testUsers = [
        { id: 1, name: 'George', email: 'george@mail.com' },
        { id: 2, name: 'Steve', email: 'steve@gmail.com' },
        { id: 3, name: 'Harry', email: 'harry@hotmail.com' },
      ]
      await db('Users').insert(testUsers)
      const user = await Users.findById('Users', 2)
      expect(user.name).toBe('Steve')
    })

    it('return `undefined` on an invalid id', async () => {
      const user = await Users.findById('Users', 999)
      expect(user).toBeUndefined()
    })
  })

  describe('insert()', () => {
    it('insert users into the database', async () => {
      await Users.insert('Users',
        {
          name: 'George', email: 'george@mail.com'
        }
      )

      await Users.insert('Users',
        {
          name: 'Harry', email: 'harry@hotmail.com'
        }
      )

      const users = await db('Users')
      expect(users).toHaveLength(2)
      expect(users[0].name).toBe('George')
      expect(users[1].email).toBe('harry@hotmail.com')
    })

    it('should return the new user on insert', async () => {
      const user = await Users.insert('Users', 
      { name: 'George', email: 'george@mail.com' })

      expect(user).toEqual({ 
        id: 1,
        name: 'George',
        email: 'george@mail.com' 
      })
    })
  })

  describe('remove()', () => {
    // Seed with test data
    const testUsers = [
      { id: 1, name: 'George', email: 'george@mail.com' },
      { id: 2, name: 'Steve', email: 'steve@gmail.com' },
      { id: 3, name: 'Harry', email: 'harry@hotmail.com' },
    ]
    beforeEach(async () => {
      await db('Users').insert(testUsers)
    })

    it('confirm test data exists in the database', async () => {
      // Verify test users are in the database
      const users = await db('Users')
      expect(users).toEqual(testUsers)
      expect(users[1].id).toBe(2)
      expect(users[2].name).toBe('Harry')
    })

    it('confirm record is deleted', async () => {
      const results = await Users.remove('Users', 1)
      expect(results).toEqual({ message: '1 record deleted' })
    })

    it('confirm test user no longer exists', async () => {
      await Users.remove('Users', 2)
      const user = await db('Users').where({id: 2}).first()
      expect(user).toBeUndefined()
    })
  })
})