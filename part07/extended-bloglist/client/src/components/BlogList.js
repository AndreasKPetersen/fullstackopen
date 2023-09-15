import { useSelector } from "react-redux";

import Blog from "./Blog";

const BlogList = (user) => {
  const blogs = useSelector((state) => state.blogs);

  const sortedBlogs = [...blogs].sort(function (a, b) {
    return -(a.likes - b.likes) || a.title.localeCompare(b.title);
  });

  return (
    <div>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  );
};

export default BlogList;
