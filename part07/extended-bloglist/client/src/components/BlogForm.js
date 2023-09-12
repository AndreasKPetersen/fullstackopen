import { useState } from "react";
import { useDispatch } from "react-redux";

import { createBlog } from "../reducers/blogReducer";

const BlogForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    dispatch(
      createBlog({
        title: title,
        author: author,
        url: url,
      })
    );

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            className="title"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            className="author"
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            className="url"
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button className="createButton" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
