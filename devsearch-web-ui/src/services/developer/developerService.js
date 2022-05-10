import axios from "axios";
import UserService from "../identity/keycloak/keycloakUserService";
import { getErrorResponse } from "../../utils/utils";
import { loadingActions } from "../../reducers/slices/global/loading";
import { developerActions } from "../../reducers/slices/developers/developer";
import { developerErrorActions } from "../../reducers/slices/developers/developerError";
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
  DELETE_COMMENT_URL,
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
    dispatch(developerErrorActions.developerErrorClear());
  } catch (error) {
    let errorRes = getErrorResponse(error, "Developers");
    dispatch(developerErrorActions.developerError(errorRes));
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
    dispatch(developerErrorActions.developerPublicErrorClear());
  } catch (error) {
    let errorRes = getErrorResponse(error, "DEVELOPER");
    dispatch(developerErrorActions.developerPublicError(errorRes));
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
        dispatch(developerErrorActions.developerEditErrorClear());
        navigate(NAVIGATE_TO_PROFILE(username));
      } else {
        throw new Error("Unknown response!");
      }
    } catch (error) {
      let errorRes = getErrorResponse(error, "Developers");
      dispatch(developerErrorActions.developerEditError(errorRes));
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

    dispatch(developerActions.developerListSuccess(response.data));
    dispatch(developerErrorActions.developerListErrorClear());
  } catch (error) {
    let errorRes = getErrorResponse(error, "Developers");
    dispatch(developerErrorActions.developerListError(errorRes));
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

export const removeComment = (commentId) => async (dispatch) => {
  try {
    dispatch(loadingActions.startLoading());

    const config = {
      headers: AUTH_HEADERS_CONFIG(UserService.getToken()),
    };

    let deleteUrl = DELETE_COMMENT_URL(commentId);
    const response = await axios.delete(deleteUrl, config);

    console.log("DELETE RESPONSE DATA: " + response.data);
    console.log("ORIGINAL COMMENT ID: " + commentId);
    if (response.status === 200) {
      dispatch(projectActions.removeCommentFromProject(commentId));
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
