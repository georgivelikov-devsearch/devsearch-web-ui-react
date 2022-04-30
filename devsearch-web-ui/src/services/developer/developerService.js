import axios from "axios";
import UserService from "../identity/keycloak/keycloakUserService";
import { getErrorResponse } from "../../utils/utils";
import { loadingActions } from "../../reducers/slices/global/loading";
import { developerActions } from "../../reducers/slices/developers/developer";
import { developerEditActions } from "../../reducers/slices/developers/developerEdit";
import { developerListActions } from "../../reducers/slices/developers/developerList";
import { developerSearchListActions } from "../../reducers/slices/developers/developerSearchList";
import { skillActions } from "../../reducers/slices/skills/skill";
import { projectActions } from "../../reducers/slices/projects/project";

import { NAVIGATE_TO_PROFILE } from "../../constants/developerConstants";

import {
  HEADERS_CONFIG,
  AUTH_HEADERS_CONFIG,
  DEVELOPER_URL,
  PUBLIC_DEVELOPER_URL,
  DEVELOPER_LIST_URL,
  POST_COMMENT_URL,
} from "../../constants/urlConstants";

export const getDeveloper = (username) => async (dispatch) => {
  try {
    dispatch(loadingActions.startLoading());

    const config = { headers: AUTH_HEADERS_CONFIG(UserService.getToken()) };
    const url = DEVELOPER_URL(username);
    const response = await axios.get(url, config);
    const developer = response.data;
    const skills = developer.skillDescriptions;

    dispatch(skillActions.setSkills(skills));
    dispatch(developerActions.developerSuccess(developer));
    dispatch(developerActions.clearError());
  } catch (error) {
    let errorRes = getErrorResponse(error, "Developers");
    dispatch(developerActions.developerError(errorRes));
  } finally {
    dispatch(loadingActions.stopLoading());
  }
};

export const editDeveloper =
  (newDeveloperData, username, navigate) => async (dispatch) => {
    try {
      dispatch(loadingActions.startLoading());

      const config = { headers: AUTH_HEADERS_CONFIG(UserService.getToken()) };
      const url = DEVELOPER_URL(username);
      const response = await axios.put(url, newDeveloperData, config);
      if (response.status === 200) {
        dispatch(developerEditActions.developerEditErrorClear());
        navigate(NAVIGATE_TO_PROFILE(username));
      } else {
        throw new Error("Unknown response!");
      }
    } catch (error) {
      let errorRes = getErrorResponse(error, "Developers");
      dispatch(developerEditActions.developerEditError(errorRes));
    } finally {
      dispatch(loadingActions.stopLoading());
    }
  };

export const getPublicDeveloper = (username) => async (dispatch) => {
  try {
    dispatch(loadingActions.startLoading());

    const config = { headers: HEADERS_CONFIG };
    const url = PUBLIC_DEVELOPER_URL(username);
    const response = await axios.get(url, config);
    const developer = response.data;
    const skills = developer.skillDescriptions;
    dispatch(skillActions.setSkills(skills));
    dispatch(developerActions.developerPublicSuccess(developer));
  } catch (error) {
    let errorRes = getErrorResponse(error, "DEVELOPER");
    dispatch(developerActions.developerPublicError(errorRes));
  } finally {
    dispatch(loadingActions.stopLoading());
  }
};

export const getDeveloperList = (page, searchText) => async (dispatch) => {
  try {
    dispatch(loadingActions.startLoading());

    const config = {
      headers: HEADERS_CONFIG,
      params: {
        page: page,
        searchText: searchText,
      },
    };

    const response = await axios.get(DEVELOPER_LIST_URL, config);

    dispatch(developerListActions.developerListSuccess(response.data));
  } catch (error) {
    let errorRes = getErrorResponse(error, "Developers");
    dispatch(developerListActions.developerListError(errorRes));
  } finally {
    dispatch(loadingActions.stopLoading());
  }
};

export const updateSearchForPublicDeveloperList =
  (searchText) => async (dispatch) => {
    dispatch(
      developerSearchListActions.updateSearchForDeveloperList({ searchText })
    );
  };

export const addComment = (newComment) => async (dispatch) => {
  try {
    dispatch(loadingActions.startLoading());

    const config = {
      headers: AUTH_HEADERS_CONFIG(UserService.getToken()),
    };

    const response = await axios.post(POST_COMMENT_URL, newComment, config);

    if (response.status === 200) {
      dispatch(projectActions.addCommentToProject(response.data));
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
