import {
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAIL,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
  PUBLIC_PROFILE_REQUEST,
  PUBLIC_PROFILE_SUCCESS,
  PUBLIC_PROFILE_FAIL,
  PROFILE_LIST_REQUEST,
  PROFILE_LIST_SUCCESS,
  PROFILE_LIST_FAIL,
  UPDATE_SEARCH_FOR_PROFILE_LIST,
} from "../constants/profileConstants";

export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_REQUEST:
      return { loading: true };
    case PROFILE_SUCCESS:
      return { loading: false, profile: action.payload };
    case PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const editProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_PROFILE_REQUEST:
      return { editLoading: true };
    case EDIT_PROFILE_SUCCESS:
      return { editLoading: false };
    case EDIT_PROFILE_FAIL:
      return { editLoading: false, editError: action.payload };
    default:
      return state;
  }
};

export const publicProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case PUBLIC_PROFILE_REQUEST:
      return { loading: true };
    case PUBLIC_PROFILE_SUCCESS:
      return { loading: false, profile: action.payload };
    case PUBLIC_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const profileListReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_LIST_REQUEST:
      return { loading: true };
    case PROFILE_LIST_SUCCESS:
      return {
        loading: false,
        profiles: action.payload.profiles,
        totalPages: action.payload.totalPages,
        searchParameters: action.searchParameters,
      };
    case PROFILE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const searchProfileListReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SEARCH_FOR_PROFILE_LIST:
      console.log(action);
      return {
        searchParameters: action.payload,
      };
    default:
      return state;
  }
};
