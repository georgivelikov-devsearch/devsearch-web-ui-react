import axios from "axios";
import HttpService from "../services/http/axios/AxiosHttpService";
import UserService from "../services/identity/keycloak/keycloakUserService";
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
  PUBLIC_PROFILE_URL,
  PROFILE_LIST_URL,
} from "../constants/urlConstants";

export const getUserProfile = (username) => async (dispatch) => {
  try {
    dispatch({
      type: PROFILE_REQUEST,
    });

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${UserService.getToken()}`,
      },
    };

    const url = PROFILE_URL(username);
    const response = await axios.get(url, config);

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
  (newProfileData, username, navigate) => async (dispatch) => {
    try {
      dispatch({
        type: EDIT_PROFILE_REQUEST,
      });

      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${UserService.getToken()}`,
        },
      };

      const url = PROFILE_URL(username);
      console.log(url);
      const response = await axios.put(url, newProfileData, config);

      dispatch({
        type: EDIT_PROFILE_SUCCESS,
        payload: response.data,
      });

      navigate("/profile/" + username);
    } catch (error) {
      let errorRes = getErrorResponse(error, "Profile");
      dispatch({
        type: EDIT_PROFILE_FAIL,
        payload: errorRes,
      });
    }
  };

export const getPublicUserProfile = (username) => async (dispatch) => {
  /* try {
    dispatch({
      type: PUBLIC_PROFILE_REQUEST,
    });

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const response = await axios.get(PUBLIC_PROFILE_URL(username), config);

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
  } */
};

export const getProfileList = (page, searchText) => async (dispatch) => {
  try {
    dispatch({
      type: PROFILE_LIST_REQUEST,
    });

    const config = {
      headers: {
        "content-type": "application/json",
      },
      params: {
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
