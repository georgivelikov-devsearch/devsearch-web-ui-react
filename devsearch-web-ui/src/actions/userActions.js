import axios from "axios";

import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  AUTH_HEADER,
  AUTH_USER_ID,
} from "../constants/userConstants";

import { LOGIN_URL, REGISTER_URL } from "../constants/urlConstants";

export const login = (username, password) => async (dispatch) => {
  const getNewUserInfo = (res) => {
    return {
      [AUTH_HEADER]: res.headers[AUTH_HEADER],
      [AUTH_USER_ID]: res.headers[AUTH_USER_ID],
    };
  };

  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const response = await axios.post(
      LOGIN_URL,
      {
        username: username,
        password: password,
      },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: getNewUserInfo(response),
    });

    localStorage.setItem("userInfo", JSON.stringify(getNewUserInfo(response)));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: USER_LOGOUT,
  });
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const { username, firstName, lastName, email, password } = userData;
    const response = await axios.post(
      REGISTER_URL,
      {
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response.data,
    });
  }
};
