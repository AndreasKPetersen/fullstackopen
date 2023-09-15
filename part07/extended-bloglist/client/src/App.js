import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Blog from "./components/Blog";
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
import Navigation from "./components/Navigation";

const App = () => {
  const dispatch = useDispatch();
  const blogFormRef = useRef();

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

  return (
    <div>
      <Navigation />

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
          <p></p>

          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>

          <Routes>
            <Route path="/" element={<BlogList user={user} />} />
            <Route path="/blogs/:id" element={<Blog user={user} />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
