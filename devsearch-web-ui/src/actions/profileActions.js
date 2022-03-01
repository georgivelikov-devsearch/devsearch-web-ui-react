import axios from "axios";

import {
  PRIVATE_PROFILE_REQUEST,
  PRIVATE_PROFILE_SUCCESS,
  PRIVATE_PROFILE_FAIL,
  EDIT_PRIVATE_PROFILE_REQUEST,
  EDIT_PRIVATE_PROFILE_SUCCESS,
  EDIT_PRIVATE_PROFILE_FAIL,
  PUBLIC_PROFILE_REQUEST,
  PUBLIC_PROFILE_SUCCESS,
  PUBLIC_PROFILE_FAIL,
  PUBLIC_PROFILE_LIST_REQUEST,
  PUBLIC_PROFILE_LIST_SUCCESS,
  PUBLIC_PROFILE_LIST_FAIL,
} from "../constants/profileConstants";

import {
  PRIVATE_PROFILE_URL,
  EDIT_PRIVATE_PROFILE_URL,
} from "../constants/urlConstants";

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

export const editPrivateProfileForUser =
  (newProfileData, navigate) => async (dispatch, getState) => {
    try {
      dispatch({
        type: EDIT_PRIVATE_PROFILE_REQUEST,
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

      const response = await axios.put(
        `http://localhost:8080/profiles`,
        newProfileData,
        config
      );

      dispatch({
        type: EDIT_PRIVATE_PROFILE_SUCCESS,
        payload: response.data,
      });

      navigate("/profile/private");
    } catch (error) {
      dispatch({
        type: EDIT_PRIVATE_PROFILE_FAIL,
        payload: error.response.data,
      });
    }
  };

export const getPublicProfileById = (profilePublicId) => async (dispatch) => {
  try {
    dispatch({
      type: PUBLIC_PROFILE_REQUEST,
    });

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const response = await axios.get(
      `http://localhost:8080/profiles/public/${profilePublicId}`,
      config
    );

    dispatch({
      type: PUBLIC_PROFILE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: PUBLIC_PROFILE_FAIL,
      payload: error.response.data,
    });
  }
};

export const getPublicProfileList = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: PUBLIC_PROFILE_LIST_REQUEST,
    });

    const config = {
      headers: {
        "content-type": "application/json",
      },
      params: {
        userId: userId,
      },
    };
    const response = await axios.get(
      `http://localhost:8080/profiles/public`,
      config
    );

    dispatch({
      type: PUBLIC_PROFILE_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: PUBLIC_PROFILE_LIST_FAIL,
      payload: error.response.data,
    });
  }
};
