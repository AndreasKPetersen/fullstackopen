const Blog = require('../models/blog')
const User = require('../models/user')

const singleUser =
  {
    username: 'adepe',
    name: 'Andreas',
    password: 'password'
  }

const initialUsers = [
  {
    username: 'root',
    name: 'root',
    password: 'password'
  },
  {
    username: 'admin',
    name: 'admin',
    password: 'password'
  }
]

const singleBlog =
  {
    title: 'React pattern',
    author: 'Michael Chans',
    url: 'https://reactpattern.com/',
    likes: 15
  }

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  singleUser,
  initialUsers,
  singleBlog,
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb
}