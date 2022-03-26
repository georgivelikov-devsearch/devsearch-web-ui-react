import axios from "axios";
import jwt from "jwt-decode";

import { getErrorResponse } from "../utils/utils";

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

    const newUser = getNewUserInfo(response);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: newUser,
    });

    // Split Auth header "Beader <token_value>"
    let token = response.headers[AUTH_HEADER].split(" ")[1];
    let x = jwt(token);
    console.log(x);
    localStorage.setItem("userInfo", JSON.stringify(newUser));
  } catch (error) {
    let errorRes = getErrorResponse(error, "Login");

    dispatch({
      type: USER_LOGIN_FAIL,
      payload: errorRes,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: USER_LOGOUT,
  });
};

export const register = (userData, navigate) => async (dispatch) => {
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

    navigate("/login");
  } catch (error) {
    let errorRes = getErrorResponse(error, "Register");

    dispatch({
      type: USER_REGISTER_FAIL,
      payload: errorRes,
    });
  }
};
