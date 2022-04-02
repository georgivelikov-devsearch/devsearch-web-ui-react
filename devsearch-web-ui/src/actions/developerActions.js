import axios from "axios";
import UserService from "../services/identity/keycloak/keycloakUserService";
import { getErrorResponse } from "../utils/utils";

import {
  DEVELOPER_REQUEST,
  DEVELOPER_SUCCESS,
  DEVELOPER_FAIL,
  EDIT_DEVELOPER_REQUEST,
  EDIT_DEVELOPER_SUCCESS,
  EDIT_DEVELOPER_FAIL,
  PUBLIC_DEVELOPER_REQUEST,
  PUBLIC_DEVELOPER_SUCCESS,
  PUBLIC_DEVELOPER_FAIL,
  DEVELOPER_LIST_REQUEST,
  DEVELOPER_LIST_SUCCESS,
  DEVELOPER_LIST_FAIL,
  UPDATE_SEARCH_FOR_DEVELOPER_LIST,
  NAVIGATE_TO_PROFILE,
} from "../constants/developerConstants";

import {
  DEVELOPER_URL,
  PUBLIC_DEVELOPER_URL,
  DEVELOPER_LIST_URL,
} from "../constants/urlConstants";

export const getDeveloper = (username) => async (dispatch) => {
  try {
    dispatch({
      type: DEVELOPER_REQUEST,
    });

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${UserService.getToken()}`,
      },
    };

    const url = DEVELOPER_URL(username);
    const response = await axios.get(url, config);

    dispatch({
      type: DEVELOPER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    let errorRes = getErrorResponse(error, "Developers");
    dispatch({
      type: DEVELOPER_FAIL,
      payload: errorRes,
    });
  }
};

export const editDeveloper =
  (newDeveloperData, username, navigate) => async (dispatch) => {
    try {
      dispatch({
        type: EDIT_DEVELOPER_REQUEST,
      });

      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${UserService.getToken()}`,
        },
      };

      const url = DEVELOPER_URL(username);
      const response = await axios.put(url, newDeveloperData, config);

      dispatch({
        type: EDIT_DEVELOPER_SUCCESS,
        payload: response.data,
      });

      navigate(NAVIGATE_TO_PROFILE(username));
    } catch (error) {
      let errorRes = getErrorResponse(error, "Developers");
      dispatch({
        type: EDIT_DEVELOPER_FAIL,
        payload: errorRes,
      });
    }
  };

export const getPublicDeveloper = (username) => async (dispatch) => {
  try {
    dispatch({
      type: PUBLIC_DEVELOPER_REQUEST,
    });

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const response = await axios.get(PUBLIC_DEVELOPER_URL(username), config);
    console.log(response.data);
    dispatch({
      type: PUBLIC_DEVELOPER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    let errorRes = getErrorResponse(error, "DEVELOPER");
    dispatch({
      type: PUBLIC_DEVELOPER_FAIL,
      payload: errorRes,
    });
  }
};

export const getDeveloperList = (page, searchText) => async (dispatch) => {
  try {
    dispatch({
      type: DEVELOPER_LIST_REQUEST,
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

    const response = await axios.get(DEVELOPER_LIST_URL, config);

    dispatch({
      type: DEVELOPER_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    let errorRes = getErrorResponse(error, "Developers");
    dispatch({
      type: DEVELOPER_LIST_FAIL,
      payload: errorRes,
    });
  }
};

export const updateSearchForPublicDeveloperList =
  (searchText) => async (dispatch) => {
    dispatch({
      type: UPDATE_SEARCH_FOR_DEVELOPER_LIST,
      payload: { searchText },
    });
  };
