import axios from "axios";
import UserService from "../identity/keycloak/keycloakUserService";
import { getErrorResponse } from "../../utils/utils";
import { loadingActions } from "../../reducers/slices/global/loading";
import { skillActions } from "../../reducers/slices/skills/skill";

import {
  AUTH_HEADERS_CONFIG,
  SKILL_URL,
  DELETE_SKILL_URL,
  ORDER_SKILLS_URL,
} from "../../constants/urlConstants";

export const addSkill = (newSkillData, successCallback) => async (dispatch) => {
  try {
    dispatch(loadingActions.startLoading());

    const config = { headers: AUTH_HEADERS_CONFIG(UserService.getToken()) };
    const response = await axios.post(SKILL_URL, newSkillData, config);
    const newSkill = response.data;
    dispatch(skillActions.addSkill(newSkill));
    successCallback();
  } catch (error) {
    let errorRes = getErrorResponse(error, "Developers");
    dispatch(skillActions.skillError(errorRes));
  } finally {
    dispatch(loadingActions.stopLoading());
  }
};

export const editSkill = (editSkillData) => async (dispatch) => {
  try {
    dispatch(loadingActions.startLoading());

    const config = { headers: AUTH_HEADERS_CONFIG(UserService.getToken()) };
    const response = await axios.put(SKILL_URL, editSkillData, config);
    const editedSkill = response.data;
    dispatch(skillActions.editSkill(editedSkill));
  } catch (error) {
    let errorRes = getErrorResponse(error, "Developers");
    dispatch(skillActions.skillEditError(errorRes));
  } finally {
    dispatch(loadingActions.stopLoading());
  }
};

export const deleteSkill = (skillDescriptionId) => async (dispatch) => {
  try {
    dispatch(loadingActions.startLoading());

    const config = { headers: AUTH_HEADERS_CONFIG(UserService.getToken()) };
    const deleteUrl = DELETE_SKILL_URL(
      UserService.getUsername(),
      skillDescriptionId
    );

    await axios.delete(deleteUrl, config);
    dispatch(skillActions.deleteSkill(skillDescriptionId));
  } catch (error) {
    let errorRes = getErrorResponse(error, "Developers");
    dispatch(skillActions.skillDeleteError(errorRes));
  } finally {
    dispatch(loadingActions.stopLoading());
  }
};

export const orderSkills = (tags) => async (dispatch) => {
  try {
    dispatch(loadingActions.startLoading());

    const config = { headers: AUTH_HEADERS_CONFIG(UserService.getToken()) };
    const orderSkillsUrl = ORDER_SKILLS_URL(UserService.getUsername());
    const response = await axios.put(orderSkillsUrl, tags, config);

    dispatch(skillActions.orderSkills(response.data));
  } catch (error) {
    let errorRes = getErrorResponse(error, "Developers");
    dispatch(skillActions.skillOrderError(errorRes));
  } finally {
    dispatch(loadingActions.stopLoading());
  }
};

export const clearSkillError = () => async (dispatch) => {
  dispatch(skillActions.clearSkillError());
};
