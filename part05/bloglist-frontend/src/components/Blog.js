import { useState } from 'react'

const Blog = ({ blog, updateLikes, user, deleteBlog }) => {

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const buttonText = visible ? 'hide' : 'view'

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
    <div className='blog' style={blogStyle}>
      <div>
        <span className='blogTitle'>{blog.title} </span>
        <span className='blogAuthor'>{blog.author}</span>
        <button className='visibilityButton' onClick={toggleVisibility}>
          {buttonText}
        </button>
      </div>
      {visible &&
      <div className='blogDetails'>
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <button className='likeButton' onClick={handleLike}>
            like
          </button>
        </div>
        <div>{blog.user.username}</div>
        {(user.username === blog.user.username) &&
        <div>
          <button className='deleteButton' onClick={handleDelete}>
            delete
          </button>
        </div>}
      </div>}
    </div>
  )}

export default Blog