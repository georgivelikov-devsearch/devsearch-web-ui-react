import axios from "axios";

import {
  PRIVATE_PROFILE_REQUEST,
  PRIVATE_PROFILE_SUCCESS,
  PRIVATE_PROFILE_FAIL,
} from "../constants/profileConstants";

import { PRIVATE_PROFILE_URL } from "../constants/urlConstants";

import { AUTH_HEADER } from "../constants/userConstants";

export const getPrivateProfileForUser =
  (userId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRIVATE_PROFILE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: userInfo[AUTH_HEADER],
        },
      };

      const response = await axios.get(
        `http://localhost:8080/profiles/user/${userId}`,
        config
      );

      dispatch({
        type: PRIVATE_PROFILE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: PRIVATE_PROFILE_FAIL,
        payload: error.response.data,
      });
    }
  };
