const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

describe('Formatting of blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('unique identifier property of blog posts is id', async () => {
    const response = await api.get('/api/blogs')

    for (let id of (response.body.map(blog => blog.id))) {
      expect(id).toBeDefined()
    }
  })
})

describe('Functionality of blogs', () => {
  let token = null

  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({
      username: 'root',
      name: 'root',
      passwordHash
    })

    await user.save()

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    return (token = jwt.sign(userForToken, process.env.SECRET))
  })

  test('a blog cannot be added without authentication', async () => {
    const blogsAtStart = await helper.blogsInDb()

    await api
      .post('/api/blogs')
      .send(helper.singleBlog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(Number(blogsAtStart))

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(helper.singleBlog.title)
  })

  test('a blog can be added', async () => {
    const blogsAtStart = await helper.blogsInDb()

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(helper.singleBlog)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(Number(blogsAtStart + 1))

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).toContain(helper.singleBlog.title)
  })

  test('a blog can be deleted', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(helper.singleBlog)
      .expect(201)

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })

  test('a blog can be updated', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(helper.singleBlog)
      .expect(201)

    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    blogToUpdate.likes = 20

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(blogToUpdate)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    expect(blogsAtEnd[0].likes).toBe(20)
  })
})

describe('Invalid operations', () => {
  let token = null

  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({
      username: 'root',
      name: 'root',
      passwordHash
    })

    await user.save()

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    return (token = jwt.sign(userForToken, process.env.SECRET))
  })

  test('handling missing title', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newBlog =
      {
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 3,
      }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })

  test('handling missing url', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newBlog =
      {
        title: 'React patterns',
        author: 'Michael Chan',
        likes: 3
      }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })

  test('handling missing likes', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newBlog =
      {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/'
      }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})