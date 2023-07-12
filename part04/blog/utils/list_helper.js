const dummy = (blogs) => {
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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}