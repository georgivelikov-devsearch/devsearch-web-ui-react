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
} from "../constants/developerConstants";

import {
  SKILL_REQUEST,
  SKILL_SUCCESS,
  SKILL_FAIL,
  SKILL_EDIT_REQUEST,
  SKILL_EDIT_SUCCESS,
  SKILL_EDIT_FAIL,
  SKILL_DELETE_REQUEST,
  SKILL_DELETE_SUCCESS,
  SKILL_DELET_FAIL,
} from "../constants/skillConstants";

export const developerReducer = (state = {}, action) => {
  switch (action.type) {
    case DEVELOPER_REQUEST:
      return { loading: true };
    case DEVELOPER_SUCCESS:
      return { loading: false, developer: action.payload };
    case DEVELOPER_FAIL:
      return { loading: false, error: action.payload };
    case SKILL_REQUEST:
      return { loading: true };
    case SKILL_SUCCESS:
      const { developer, newSkill } = action.payload;
      developer.skillDescriptions.push(newSkill);
      return { loading: false, developer: developer };
    case SKILL_FAIL:
      return { loading: false, error: action.payload };
    case SKILL_EDIT_REQUEST:
      return { loading: true };
    case SKILL_EDIT_SUCCESS:
      console.log(action.payload);
      const { editedDeveloper, editedSkill } = action.payload;
      for (var i = 0; i < editedDeveloper.skillDescriptions.length; i++) {
        if (
          editedDeveloper.skillDescriptions[i].skillDescriptionId ===
          editedSkill.skillDescriptionId
        ) {
          editedDeveloper.skillDescriptions[i] = editedSkill;
          break;
        }
      }

      return { loading: false, developer: editedDeveloper };
    case SKILL_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const editDeveloperReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_DEVELOPER_REQUEST:
      return { editLoading: true };
    case EDIT_DEVELOPER_SUCCESS:
      return { editLoading: false };
    case EDIT_DEVELOPER_FAIL:
      return { editLoading: false, editError: action.payload };
    default:
      return state;
  }
};

export const publicDeveloperReducer = (state = {}, action) => {
  switch (action.type) {
    case PUBLIC_DEVELOPER_REQUEST:
      return { loading: true };
    case PUBLIC_DEVELOPER_SUCCESS:
      return { loading: false, publicDeveloper: action.payload };
    case PUBLIC_DEVELOPER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const developerListReducer = (state = {}, action) => {
  switch (action.type) {
    case DEVELOPER_LIST_REQUEST:
      return { loading: true };
    case DEVELOPER_LIST_SUCCESS:
      return {
        loading: false,
        developers: action.payload.developers,
        totalPages: action.payload.totalPages,
        searchParameters: action.searchParameters,
      };
    case DEVELOPER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const searchDeveloperListReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SEARCH_FOR_DEVELOPER_LIST:
      return {
        searchParameters: action.payload,
      };
    default:
      return state;
  }
};
