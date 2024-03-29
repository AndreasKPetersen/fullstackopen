import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import {
  updateLikes,
  deleteBlog,
  updateComments,
} from "../reducers/blogReducer";

const Blog = ({ user }) => {
  const dispatch = useDispatch();

  const id = useParams().id;

  const [comment, setComment] = useState("");

  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );

  if (!blog) {
    return null;
  }

  const handleLike = (event) => {
    event.preventDefault();
    const blogObject = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    dispatch(updateLikes(blog.id, blogObject));
  };

  const handleDelete = (event) => {
    event.preventDefault();
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog));
    }
  };

  const handleComment = (event) => {
    event.preventDefault();
    dispatch(updateComments(id, comment));
    setComment("");
  };

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div className="likes">
        {blog.likes}
        <button className="likeButton" onClick={handleLike}>
          like
        </button>
      </div>
      <div>added by {blog.user.username}</div>
      {user.username === blog.user.username && (
        <div>
          <button className="deleteButton" onClick={handleDelete}>
            delete
          </button>
        </div>
      )}

      <h4>comments</h4>
      <form onSubmit={handleComment}>
        <input
          className="comment"
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button className="addCommentButton" type="submit">
          add comment
        </button>
      </form>
      <ul>
        {blog.comments.map((comment, idx) => (
          <li key={idx}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
