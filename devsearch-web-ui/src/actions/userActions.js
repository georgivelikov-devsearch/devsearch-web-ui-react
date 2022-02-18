import axios from "axios";

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  AUTH_HEADER,
  AUTH_USER_ID,
} from "../constants/userConstants";

export const login = (username, password) => async (dispatch) => {
  const getNewUserInfo = (res) => {
    return {
      Authorization: res.headers["authorization"],
      UserId: res.headers["userid"],
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
      "http://localhost:8080/users/login",
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
