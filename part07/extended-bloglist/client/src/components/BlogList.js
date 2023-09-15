import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Blog from "./Blog";

const BlogList = (user) => {
  const blogs = useSelector((state) => state.blogs);

  const sortedBlogs = [...blogs].sort(function (a, b) {
    return -(a.likes - b.likes) || a.title.localeCompare(b.title);
  });

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      {sortedBlogs.map((blog) => (
        <div className="blog" style={blogStyle} key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            <span className="blogTitle">{blog.title} </span>
            <span className="blogAuthor">{blog.author}</span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
