import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [loginVisible, setLoginVisible] = useState(false)
  const [createVisible, setCreateVisible] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

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
        type: "success"
      } )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage( {
        message: 'Wrong credentials',
        type: "error"
      } )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    blogService
      .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setNewBlog('')
          setMessage( {
            message: `a new blog ${blogObject.title} by ${blogObject.author} added`,
            type: "success"
          } )
          setTimeout(() => {
              setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setNewBlog('')
          setMessage( {
            message: `a new blog was not added`,
            type: "error"
          } )
          setTimeout(() => {
              setMessage(null)
          }, 5000)
        })
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setMessage( {
      message: `logout successful`,
      type: "success"
    } )
    setTimeout(() => {
        setMessage(null)
    }, 5000)
  }

  return (
    <div>
      <h2>Blogs</h2>
      
      <Notification message={message} />
      
      {!user && 
        <LoginForm 
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          loginVisible={loginVisible}
          setLoginVisible={setLoginVisible}
        />
      }

      {user && <BlogForm 
        addBlog={addBlog}
        handleLogout={handleLogout}
        user={user}
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        url={url}
        setUrl={setUrl}
        createVisible={createVisible}
        setCreateVisible={setCreateVisible}
      />}

      <div>
      {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
      )}
      </div>
    </div>
  )
}

export default App