import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

import { setNotification } from "./reducers/notificationReducer";

const App = () => {
  const dispatch = useDispatch();
  const blogFormRef = useRef();

  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) =>
      setBlogs(
        blogs.sort(function (a, b) {
          return -(a.likes - b.likes) || a.title.localeCompare(b.title);
        })
      )
    );
  }, [setBlogs]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");

      dispatch(
        setNotification(`${user.username} logged in successfully`, "success", 5)
      );
    } catch (exception) {
      dispatch(setNotification(`Wrong credentials`, "error", 5));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    dispatch(setNotification(`logout successful`, "success", 5));
  };

  const createBlog = async (blogObject) => {
    try {
      const createdBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(createdBlog));
      blogFormRef.current.toggleVisibility();
      dispatch(
        setNotification(
          `a new blog ${blogObject.title} by ${blogObject.author} added`,
          "success",
          5
        )
      );
    } catch (exception) {
      dispatch(setNotification(`a new blog was not added`, "error", 5));
    }
  };

  const updateLikes = async (id, blogObject) => {
    try {
      await blogService.update(id, blogObject);

      const updatedBlogs = await blogService.getAll();

      setBlogs(updatedBlogs);
    } catch (exception) {
      dispatch(setNotification(`Likes field was not updated`, "error", 5));
    }
  };

  const deleteBlog = async (id) => {
    if (window.confirm("Do you really want to delete the post?")) {
      try {
        await blogService.remove(id);

        const updatedBlogs = await blogService.getAll();

        setBlogs(updatedBlogs);
      } catch (exception) {
        dispatch(setNotification(`Blog was not deleted`, "error", 5));
      }
    }
  };

  return (
    <div>
      <h2>Blogs</h2>

      <Notification message={message} />

      {!user && (
        <div className="loginForm">
          <Togglable buttonLabel="log in">
            <LoginForm
              handleLogin={handleLogin}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
            />
          </Togglable>
        </div>
      )}

      {user && (
        <div>
          <p>
            {user.username} logged in{" "}
            <button onClick={handleLogout}>logout</button>
          </p>

          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>

          <div>
            {blogs
              .sort(function (a, b) {
                return -(a.likes - b.likes) || a.title.localeCompare(b.title);
              })
              .map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  updateLikes={updateLikes}
                  user={user}
                  deleteBlog={deleteBlog}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
