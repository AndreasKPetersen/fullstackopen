import { useState } from "react";
import { useDispatch } from "react-redux";

import { updateLikes, deleteBlog } from "../reducers/blogReducer";

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const buttonText = visible ? "hide" : "view";

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = (event) => {
    event.preventDefault();
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    dispatch(updateLikes(blog.id, likedBlog));
  };

  const handleDelete = (event) => {
    event.preventDefault();
    dispatch(deleteBlog(blog.id));
  };

  return (
    <div className="blog" style={blogStyle}>
      <div>
        <span className="blogTitle">{blog.title} </span>
        <span className="blogAuthor">{blog.author}</span>
        <button className="visibilityButton" onClick={toggleVisibility}>
          {buttonText}
        </button>
      </div>
      {visible && (
        <div className="blogDetails">
          <div>{blog.url}</div>
          <div className="likes">
            {blog.likes}
            <button className="likeButton" onClick={handleLike}>
              like
            </button>
          </div>
          <div>{blog.user.username}</div>
          {user.username === blog.user.username && (
            <div>
              <button className="deleteButton" onClick={handleDelete}>
                delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
