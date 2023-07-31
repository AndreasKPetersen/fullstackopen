const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

describe('Formatting of users', () => {
  test('all users are returned', async () => {
    const response = await api.get('/api/users')

    expect(response.body).toHaveLength(helper.initialUsers.length)
  })

  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('unique identifier property of user is id', async () => {
    const response = await api.get('/api/users')

    for (let id of (response.body.map(user => user.id))) {
      expect(id).toBeDefined()
    }
  })
})

describe('Functionality of users', () => {
  test('a user can be added', async () => {
    await api
      .post('/api/users')
      .send(helper.singleUser)
      .expect(201)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1)
  })
})

describe('Invalid operations', () => {
  test('unique username', async () => {
    await api
      .post('/api/users')
      .send(helper.singleUser)

    const usersAtStart = await helper.usersInDb()

    const result = await api
      .post('/api/users')
      .send(helper.singleUser)
      .expect(400)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('missing username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'test',
      password: 'test'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('missing name', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'test',
      password: 'test'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('missing password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'test',
      name: 'test'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})