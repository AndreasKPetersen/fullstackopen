import { useSelector } from "react-redux";
import { BrowserRouter as Router, Link } from "react-router-dom";

import { logoutUser } from "../reducers/loginReducer";

const Navigation = () => {
  const user = useSelector((state) => state.login);

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logoutUser());
  };

  const padding = {
    padding: 5,
  };

  return (
    <div>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {user ? (
        <div>
          {user.username} logged in{" "}
          <button onClick={handleLogout}>logout</button>
        </div>
      ) : (
        <Link style={padding} to="/">
          login
        </Link>
      )}
    </div>
    // ...
  );
};

export default Navigation;
