import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const User = () => {
  const id = useParams().id;

  const user = useSelector((state) =>
    state.users.find((user) => user.id === id)
  );

  return (
    <div>
      <h2>{user.username}</h2>
      <ul>
        {user.blogs.map((blog) => {
          return <li key={blog.id}>{blog.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default User;
