import axios from "axios";
import UserService from "../services/identity/keycloak/keycloakUserService";
import { getErrorResponse } from "../utils/utils";

import {
  SKILL_REQUEST,
  SKILL_SUCCESS,
  SKILL_FAIL,
  SKILL_EDIT_REQUEST,
  SKILL_EDIT_SUCCESS,
  SKILL_EDIT_FAIL,
} from "../constants/skillConstants";

import { SKILL_URL } from "../constants/urlConstants";

export const createSkill = (newSkillData, developer) => async (dispatch) => {
  try {
    dispatch({
      type: SKILL_REQUEST,
    });

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${UserService.getToken()}`,
      },
    };

    const response = await axios.post(SKILL_URL, newSkillData, config);
    const newSkill = response.data;
    dispatch({
      type: SKILL_SUCCESS,
      payload: { developer, newSkill },
    });
  } catch (error) {
    // Skills are part of developer service
    let errorRes = getErrorResponse(error, "Developers");
    dispatch({
      type: SKILL_FAIL,
      payload: errorRes,
    });
  }
};

export const editSkill = (editSkillData, developer) => async (dispatch) => {
  try {
    dispatch({
      type: SKILL_EDIT_REQUEST,
    });

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${UserService.getToken()}`,
      },
    };

    const response = await axios.put(SKILL_URL, editSkillData, config);
    const editedSkill = response.data;
    dispatch({
      type: SKILL_EDIT_SUCCESS,
      payload: { editedDeveloper: developer, editedSkill },
    });
  } catch (error) {
    // Skills are part of developer service
    let errorRes = getErrorResponse(error, "Developers");
    dispatch({
      type: SKILL_EDIT_FAIL,
      payload: errorRes,
    });
  }
};
