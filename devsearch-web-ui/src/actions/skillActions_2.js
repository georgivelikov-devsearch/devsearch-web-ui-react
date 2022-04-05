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
  SKILL_DELETE_REQUEST,
  SKILL_DELETE_SUCCESS,
  SKILL_DELETE_FAIL,
  SKILL_ORDER_REQUEST,
  SKILL_ORDER_SUCCESS,
  SKILL_ORDER_FAIL,
} from "../constants/skillConstants";

import {
  SKILL_URL,
  DELETE_SKILL_URL,
  ORDER_SKILLS_URL,
} from "../constants/urlConstants";

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

export const deleteSkill =
  (skillDescriptionId, developer) => async (dispatch) => {
    try {
      dispatch({
        type: SKILL_DELETE_REQUEST,
      });

      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${UserService.getToken()}`,
        },
      };

      const deleteUrl = DELETE_SKILL_URL(
        UserService.getUsername(),
        skillDescriptionId
      );
      const response = await axios.delete(deleteUrl, config);
      const deletedSkillDescriptionId = skillDescriptionId;
      dispatch({
        type: SKILL_DELETE_SUCCESS,
        payload: { modifiedDeveloper: developer, deletedSkillDescriptionId },
      });
    } catch (error) {
      // Skills are part of developer service
      let errorRes = getErrorResponse(error, "Developers");
      dispatch({
        type: SKILL_DELETE_FAIL,
        payload: errorRes,
      });
    }
  };

export const orderSkills = (tags, developer) => async (dispatch) => {
  try {
    dispatch({
      type: SKILL_ORDER_REQUEST,
    });

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${UserService.getToken()}`,
      },
    };

    const orderSkillsUrl = ORDER_SKILLS_URL(UserService.getUsername());
    const response = await axios.put(orderSkillsUrl, tags, config);

    dispatch({
      type: SKILL_ORDER_SUCCESS,
      payload: { orderedDeveloper: developer, orderedList: response.data },
    });
  } catch (error) {
    // Skills are part of developer service
    let errorRes = getErrorResponse(error, "Developers");
    dispatch({
      type: SKILL_ORDER_FAIL,
      payload: errorRes,
    });
  }
};
