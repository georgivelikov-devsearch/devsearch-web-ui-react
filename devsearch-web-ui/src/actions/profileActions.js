import axios from "axios";
import { getErrorResponse } from "../utils/utils";

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
  UPDATE_SEARCH_FOR_PUBLIC_PROFILE_LIST,
} from "../constants/profileConstants";

import {
  PRIVATE_PROFILE_URL,
  EDIT_PRIVATE_PROFILE_URL,
  PUBLIC_PROFILE_URL,
  PUBLIC_PROFILE_LIST_URL,
} from "../constants/urlConstants";

import { AUTH_HEADER } from "../constants/userConstants";

export const getPrivateProfileForUser =
  (userId, authHeader) => async (dispatch) => {
    try {
      dispatch({
        type: PRIVATE_PROFILE_REQUEST,
      });
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: authHeader,
        },
      };

      const response = await axios.get(PRIVATE_PROFILE_URL(userId), config);

      dispatch({
        type: PRIVATE_PROFILE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      let errorRes = getErrorResponse(error, "Profile");
      dispatch({
        type: PRIVATE_PROFILE_FAIL,
        payload: errorRes,
      });
    }
  };

export const editPrivateProfileForUser =
  (newProfileData, authHeader, navigate) => async (dispatch) => {
    try {
      dispatch({
        type: EDIT_PRIVATE_PROFILE_REQUEST,
      });

      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: authHeader,
        },
      };

      const response = await axios.put(
        EDIT_PRIVATE_PROFILE_URL,
        newProfileData,
        config
      );

      dispatch({
        type: EDIT_PRIVATE_PROFILE_SUCCESS,
        payload: response.data,
      });

      navigate("/profile/private");
    } catch (error) {
      let errorRes = getErrorResponse(error, "Profile");
      dispatch({
        type: EDIT_PRIVATE_PROFILE_FAIL,
        payload: errorRes,
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
      PUBLIC_PROFILE_URL(profilePublicId),
      config
    );

    dispatch({
      type: PUBLIC_PROFILE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    let errorRes = getErrorResponse(error, "Profile");
    dispatch({
      type: PUBLIC_PROFILE_FAIL,
      payload: errorRes,
    });
  }
};

export const getPublicProfileList =
  (userId, page, searchText) => async (dispatch) => {
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
          page: page,
          searchText: searchText,
        },
      };
      const response = await axios.get(PUBLIC_PROFILE_LIST_URL, config);

      dispatch({
        type: PUBLIC_PROFILE_LIST_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      let errorRes = getErrorResponse(error, "Profile");
      dispatch({
        type: PUBLIC_PROFILE_LIST_FAIL,
        payload: errorRes,
      });
    }
  };

export const updateSearchForPublicProfileList =
  (searchText) => async (dispatch) => {
    dispatch({
      type: UPDATE_SEARCH_FOR_PUBLIC_PROFILE_LIST,
      payload: { searchText },
    });
  };
