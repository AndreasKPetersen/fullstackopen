import { useState } from 'react'

const Blog = ({ blog, updateLikes, user, deleteBlog }) => {

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const buttonText = visible ? 'hide' : 'view'
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = (event) => {
    event.preventDefault()
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    updateLikes(blog.id, blogObject)
  }

  const handleDelete = (event) => {
    event.preventDefault()
    deleteBlog(blog.id)
  }

  return (
  <div style={blogStyle}>
    <div>
      {blog.title} {blog.author} <button onClick={toggleVisibility}>{buttonText}</button>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>{blog.likes} <button onClick={handleLike}>like</button></p>
        <p>{blog.user.username}</p>
        {(user.username === blog.user.username) &&
        <p><button onClick={handleDelete}>delete</button></p>}
      </div>
    </div>
  </div>  
)}

export default Blog