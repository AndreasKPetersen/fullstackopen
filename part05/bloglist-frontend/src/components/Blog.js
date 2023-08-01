import { useState } from 'react'

const Blog = ({ blog }) => {
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

  return (
  <div style={blogStyle}>
    <div>
      {blog.title} {blog.author} <button onClick={toggleVisibility}>{buttonText}</button>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>{blog.likes}</p>
        <p>{blog.user.username}</p>
      </div>
    </div>
  </div>  
)}

export default Blog