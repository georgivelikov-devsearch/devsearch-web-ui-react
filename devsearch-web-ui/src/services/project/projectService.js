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
} from "../../constants/urlConstants";

export const addProject = (newProject, successCallback) => async (dispatch) => {
  try {
    dispatch(loadingActions.startLoading());

    const config = { headers: AUTH_HEADERS_CONFIG(UserService.getToken()) };
    const response = await axios.post(PROJECT_URL, newProject, config);

    if (response.status === 200) {
      dispatch(projectActions.projectNewErrorClear());
      successCallback(NAVIGATE_TO_PROFILE(UserService.getUsername()));
    } else {
      throw new Error("Unknown response!");
    }
  } catch (error) {
    let errorRes = getErrorResponse(error, "Projects");
    dispatch(projectActions.projectNewError(errorRes));
  } finally {
    dispatch(loadingActions.stopLoading());
  }
};
