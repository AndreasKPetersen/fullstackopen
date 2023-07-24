const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier property of blog posts is id', async () => {
  const response = await api.get('/api/blogs')

  for (let id of (response.body.map(blog => blog.id))) {
    expect(id).toBeDefined()
  }
})

test('a blog can be added', async () => {
  await api
    .post('/api/blogs')
    .send(helper.singleBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
})



afterAll(async () => {
  await mongoose.connection.close()
})