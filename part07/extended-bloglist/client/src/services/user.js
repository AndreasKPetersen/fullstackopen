import axios from "axios";
const baseUrl = "/api/users";

let token = null;

const retrieveToken = () => {
  return token;
};

const getUser = (user) => {
  const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");

  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    token = user.token;
    return user;
  }

  return null;
};

const setUser = (user) => {
  window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
  token = user.token;
};

const resetUser = () => {
  localStorage.clear();
  token = null;
};

const getAllUsers = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default { retrieveToken, getUser, setUser, resetUser, getAllUsers };
