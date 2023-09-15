import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import userService from "./services/user";

import { logoutUser } from "./reducers/loginReducer";

import { login } from "./reducers/loginReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/userReducer";
import { Routes, Route, useMatch } from "react-router-dom";
import Users from "./components/Users";
import User from "./components/User";

const App = () => {
  const dispatch = useDispatch();
  const blogFormRef = useRef();

  // const [user, setUser] = useState(null);

  const user = useSelector((state) => state.login);

  useEffect(() => {
    const userInStorage = userService.getUser();
    if (userInStorage) {
      dispatch(login(userInStorage));
    }
  }, []);

  useEffect(() => {
    dispatch(initializeUsers());
    dispatch(initializeBlogs());
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logoutUser());
  };

  return (
    <div>
      <h2>Blogs</h2>

      <Notification />

      {!user && (
        <div className="loginForm">
          <Togglable buttonLabel="log in">
            <LoginForm />
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

          <Routes>
            <Route path="/" element={<BlogList user={user} />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
