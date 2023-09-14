import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";

const App = () => {
  const dispatch = useDispatch();
  const blogFormRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  const blogs = useSelector((state) => state.blogs);

  const sortedBlogs = [...blogs].sort(function (a, b) {
    return -(a.likes - b.likes) || a.title.localeCompare(b.title);
  });

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

  return (
    <div>
      <h2>Blogs</h2>

      <Notification />

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
            <BlogForm />
          </Togglable>

          <div>
            {sortedBlogs.map((blog) => (
              <Blog key={blog.id} blog={blog} user={user} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
