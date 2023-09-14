import { createSlice } from "@reduxjs/toolkit";

import { setNotification } from "./notificationReducer";

import blogService from ".././services/blogs";
import loginService from ".././services/login";
import userService from ".././services/user";

const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    login(state, action) {
      return action.payload;
    },
    logout(state, action) {
      return action.payload;
    },
  },
});

export const { login, logout } = loginSlice.actions;

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });

      userService.setUser(user);
      dispatch(login(user));
      dispatch(
        setNotification(`${user.username} logged in successfully`, "success", 5)
      );
    } catch (error) {
      dispatch(setNotification(`Wrong credentials`, "error", 5));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    userService.resetUser();
    dispatch(logout(null));
    dispatch(setNotification(`logout successful`, "success", 5));
  };
};

export default loginSlice.reducer;
