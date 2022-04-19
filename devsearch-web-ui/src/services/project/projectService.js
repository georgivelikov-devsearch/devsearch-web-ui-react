import axios from "axios";
import UserService from "../identity/keycloak/keycloakUserService";
import { getErrorResponse } from "../../utils/utils";
import { loadingActions } from "../../reducers/slices/global/loading";
import { projectActions } from "../../reducers/slices/projects/project";

import { NAVIGATE_TO_PROFILE } from "../../constants/developerConstants";

import {
  HEADERS_CONFIG,
  AUTH_HEADERS_CONFIG,
  PROJECT_URL,
  PROJECTS_URL,
} from "../../constants/urlConstants";

export const addProject = (newProject, successCallback) => async (dispatch) => {
  try {
    dispatch(loadingActions.startLoading());

    const config = { headers: AUTH_HEADERS_CONFIG(UserService.getToken()) };
    const response = await axios.post(PROJECT_URL, newProject, config);

    if (response.status === 200) {
      dispatch(projectActions.projectErrorClear());
      successCallback(NAVIGATE_TO_PROFILE(UserService.getUsername()));
    } else {
      throw new Error("Unknown response!");
    }
  } catch (error) {
    let errorRes = getErrorResponse(error, "Projects");
    dispatch(projectActions.projectError(errorRes));
  } finally {
    dispatch(loadingActions.stopLoading());
  }
};

export const updateProject =
  (updatedProject, successCallback) => async (dispatch) => {
    try {
      dispatch(loadingActions.startLoading());

      const config = { headers: AUTH_HEADERS_CONFIG(UserService.getToken()) };
      const response = await axios.put(PROJECT_URL, updatedProject, config);

      if (response.status === 200) {
        dispatch(projectActions.projectErrorClear());
        successCallback(NAVIGATE_TO_PROFILE(UserService.getUsername()));
      } else {
        throw new Error("Unknown response!");
      }
    } catch (error) {
      let errorRes = getErrorResponse(error, "Projects");
      dispatch(projectActions.projectError(errorRes));
    } finally {
      dispatch(loadingActions.stopLoading());
    }
  };

export const getAllProjects = (page, searchText) => async (dispatch) => {
  try {
    dispatch(loadingActions.startLoading());

    const config = {
      headers: HEADERS_CONFIG,
      params: {
        page: page,
        searchText: searchText,
      },
    };

    const response = await axios.get(PROJECTS_URL, config);
    dispatch(projectActions.projectListSuccess(response.data));
  } catch (error) {
    let errorRes = getErrorResponse(error, "Projects");
    dispatch(projectActions.projectListError(errorRes));
  } finally {
    dispatch(loadingActions.stopLoading());
  }
};
