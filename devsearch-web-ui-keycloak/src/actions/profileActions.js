import axios from "axios";
import { getErrorResponse } from "../utils/utils";

import {
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAIL,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
  PUBLIC_PROFILE_REQUEST,
  PUBLIC_PROFILE_SUCCESS,
  PUBLIC_PROFILE_FAIL,
  PROFILE_LIST_REQUEST,
  PROFILE_LIST_SUCCESS,
  PROFILE_LIST_FAIL,
  UPDATE_SEARCH_FOR_PROFILE_LIST,
} from "../constants/profileConstants";

import {
  PROFILE_URL,
  EDIT_PROFILE_URL,
  PUBLIC_PROFILE_URL,
  PROFILE_LIST_URL,
} from "../constants/urlConstants";

export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: PROFILE_REQUEST,
    });
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: authHeader,
      },
    };

    const response = await axios.get(PROFILE_URL(userId), config);

    dispatch({
      type: PROFILE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    let errorRes = getErrorResponse(error, "Profile");
    dispatch({
      type: PROFILE_FAIL,
      payload: errorRes,
    });
  }
};

export const editUserProfile =
  (newProfileData, navigate) => async (dispatch) => {
    try {
      dispatch({
        type: EDIT_PROFILE_REQUEST,
      });

      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: authHeader,
        },
      };

      const response = await axios.put(
        EDIT_PROFILE_URL,
        newProfileData,
        config
      );

      dispatch({
        type: EDIT_PROFILE_SUCCESS,
        payload: response.data,
      });

      navigate("/profile/" + newProfileData.username);
    } catch (error) {
      let errorRes = getErrorResponse(error, "Profile");
      dispatch({
        type: EDIT_PROFILE_FAIL,
        payload: errorRes,
      });
    }
  };

export const getPublicUserProfile = () => async (dispatch) => {
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

export const getProfileList =
  (userId, page, searchText) => async (dispatch) => {
    try {
      dispatch({
        type: PROFILE_LIST_REQUEST,
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
      const response = await axios.get(PROFILE_LIST_URL, config);

      dispatch({
        type: PROFILE_LIST_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      let errorRes = getErrorResponse(error, "Profile");
      dispatch({
        type: PROFILE_LIST_FAIL,
        payload: errorRes,
      });
    }
  };

export const updateSearchForPublicProfileList =
  (searchText) => async (dispatch) => {
    dispatch({
      type: UPDATE_SEARCH_FOR_PROFILE_LIST,
      payload: { searchText },
    });
  };
