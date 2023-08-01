import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort(function(a, b) {
        return - ( a.likes - b.likes ) || a.title.localeCompare(b.title)
      }) )
    )
  }, [setBlogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage( {
        message: `${user.username} logged in successfully`,
        type: 'success'
      } )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage( {
        message: 'Wrong credentials',
        type: 'error'
      } )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setMessage( {
      message: 'logout successful',
      type: 'success'
    } )
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const createBlog = async (blogObject) => {
    try {
      const createdBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(createdBlog))
      blogFormRef.current.toggleVisibility()
      setMessage( {
        message: `a new blog ${blogObject.title} by ${blogObject.author} added`,
        type: 'success'
      } )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage( {
        message: 'a new blog was not added',
        type: 'error'
      } )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const updateLikes = async (id, blogObject) => {
    try {
      await blogService.update(id, blogObject)

      const updatedBlogs = await blogService.getAll()

      setBlogs(updatedBlogs)

    } catch (exception) {
      setMessage( {
        message: 'Likes field was not updated',
        type: 'error'
      } )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    if (window.confirm('Do you really want to delete the post?')) {
      try {
        await blogService.remove(id)

        const updatedBlogs = await blogService.getAll()

        setBlogs(updatedBlogs)

      } catch (exception) {
        setMessage( {
          message: 'Blog was not deleted',
          type: 'error'
        } )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    }
  }

  return (
    <div>
      <h2>Blogs</h2>

      <Notification message={message} />

      {!user &&
      <Togglable buttonLabel="log in">
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </Togglable>
      }

      {user &&
      <div>
        <p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>

        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm
            createBlog={createBlog}
          />
        </Togglable>

        <div>
          {blogs.sort(function(a, b) {
            return - ( a.likes - b.likes ) || a.title.localeCompare(b.title)
          }).map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              updateLikes={updateLikes}
              user={user}
              deleteBlog={deleteBlog}
            />
          )}
        </div>
      </div>
      }
    </div>
  )
}

export default App