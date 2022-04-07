import axios from "axios";
import UserService from "../identity/keycloak/keycloakUserService";
import { getErrorResponse } from "../../utils/utils";
import { developerActions } from "../../reducers/slices/developer/developer";
import { developerEditActions } from "../../reducers/slices/developer/developerEdit";
import { developerListActions } from "../../reducers/slices/developer/developerList";
import { developerSearchListActions } from "../../reducers/slices/developer/developerSearchList";
import { skillActions } from "../../reducers/slices/skills/skill";

import { NAVIGATE_TO_PROFILE } from "../../constants/developerConstants";

import {
  HEADERS_CONFIG,
  AUTH_HEADERS_CONFIG,
  DEVELOPER_URL,
  PUBLIC_DEVELOPER_URL,
  DEVELOPER_LIST_URL,
} from "../../constants/urlConstants";

export const getDeveloper = (username) => async (dispatch) => {
  try {
    dispatch(developerActions.developerRequest());

    const config = { headers: AUTH_HEADERS_CONFIG(UserService.getToken()) };
    const url = DEVELOPER_URL(username);
    const response = await axios.get(url, config);
    const developer = response.data;
    const skills = developer.skillDescriptions;

    dispatch(skillActions.setSkills(skills));
    dispatch(developerActions.developerSuccess(developer));
  } catch (error) {
    let errorRes = getErrorResponse(error, "Developers");
    dispatch(developerActions.developerError(errorRes));
  }
};

export const editDeveloper =
  (newDeveloperData, username, navigate) => async (dispatch) => {
    try {
      dispatch(developerEditActions.developerEditRequest());

      const config = { headers: AUTH_HEADERS_CONFIG(UserService.getToken()) };
      const url = DEVELOPER_URL(username);
      const response = await axios.put(url, newDeveloperData, config);
      const editedDeveloper = response.data;

      dispatch(developerEditActions.developerEditSuccess(editedDeveloper));

      navigate(NAVIGATE_TO_PROFILE(username));
    } catch (error) {
      let errorRes = getErrorResponse(error, "Developers");
      dispatch(developerEditActions.developerEditError(errorRes));
    }
  };

export const getPublicDeveloper = (username) => async (dispatch) => {
  try {
    dispatch(developerActions.developerPublicRequest());

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
  }
};

export const getDeveloperList = (page, searchText) => async (dispatch) => {
  try {
    dispatch(developerListActions.developerListRequest);

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
  }
};

export const updateSearchForPublicDeveloperList =
  (searchText) => async (dispatch) => {
    dispatch(
      developerSearchListActions.updateSearchForDeveloperList({ searchText })
    );
  };
