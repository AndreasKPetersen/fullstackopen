import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import BlogForm from "./components/BlogForm";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/userReducer";
import { loginUser } from "./reducers/loginReducer";
import { logoutUser } from "./reducers/loginReducer";

const App = () => {
  const dispatch = useDispatch();
  const blogFormRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, []);

  const user = useSelector((state) => state.login);
  const blogs = useSelector((state) => state.blogs);

  const sortedBlogs = [...blogs].sort(function (a, b) {
    return -(a.likes - b.likes) || a.title.localeCompare(b.title);
  });

  return (
    <div>
      <h2>Blogs</h2>

      <Notification />

      {!user && (
        <div className="loginForm">
          <Togglable buttonLabel="log in">
            <LoginForm
              handleLogin={loginUser()}
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
            <button onClick={logoutUser()}>logout</button>
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
