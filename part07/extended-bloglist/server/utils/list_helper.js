const lodash = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce( (likes, blog) => {
    return likes + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  return blogs.reduce( (previous, current) => {
    return previous.likes > current.likes
      ? previous
      : current
  }, 0)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const counts = lodash.countBy(blogs, 'author')

  const topBlogger = Object.keys(counts).reduce( (previous, current) => {
    return counts[previous] > counts[current] ? previous : current
  })

  return topBlogger
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const counts = {}

  blogs.forEach(blog => {
    if (counts[blog.author]) {
      counts[blog.author] =+ blog.likes
    }
    else {
      counts[blog.author] = blog.likes
    }
  })

  const blogsLikesSorted = lodash.sortBy(blogs, 'likes')

  const topBlogger = lodash.findLast(blogsLikesSorted).author

  return ({
    author: topBlogger,
    likes: counts[topBlogger]
  })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}