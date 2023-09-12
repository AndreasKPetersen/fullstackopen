import { createSlice } from "@reduxjs/toolkit";
import { setNotification } from "./notificationReducer";
import blogService from ".././services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    addBlog(state, action) {
      state.push(action.payload);
    },
    removeBlog(state, action) {
      const { id } = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    updateBlog(state, action) {
      const { id, blogObject } = action.payload;
      return state.map((blog) => (blog.id !== id ? blog : blogObject));
    },
  },
});

export const { addBlog, removeBlog, setBlogs, updateBlog } = blogSlice.actions;

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const createdBlog = await blogService.create(blogObject);
      dispatch(addBlog(createdBlog));
      dispatch(
        setNotification(
          `a new blog ${blogObject.title} by ${blogObject.author} added`,
          "success",
          5
        )
      );
    } catch (error) {
      dispatch(setNotification(`a new blog was not added`, "error", 5));
    }
  };
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id);
      dispatch(deleteBlog(id));
      dispatch(setNotification(`Blog was deleted`, "success", 5));
    } catch (exception) {
      dispatch(setNotification(`Blog was not deleted`, "error", 5));
    }
  };
};

export const updateLikes = (id, blogObject) => {
  return async (dispatch) => {
    try {
      const likedBlog = await blogService.update(id, blogObject);
      dispatch(updateBlog(likedBlog));
    } catch (exception) {
      dispatch(setNotification(`Likes field was not updated`, "error", 5));
    }
  };
};

export default blogSlice.reducer;
