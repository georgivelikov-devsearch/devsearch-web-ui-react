import {
  PRIVATE_PROFILE_REQUEST,
  PRIVATE_PROFILE_SUCCESS,
  PRIVATE_PROFILE_FAIL,
  EDIT_PRIVATE_PROFILE_REQUEST,
  EDIT_PRIVATE_PROFILE_SUCCESS,
  EDIT_PRIVATE_PROFILE_FAIL,
  PUBLIC_PROFILE_REQUEST,
  PUBLIC_PROFILE_SUCCESS,
  PUBLIC_PROFILE_FAIL,
  PUBLIC_PROFILE_LIST_REQUEST,
  PUBLIC_PROFILE_LIST_SUCCESS,
  PUBLIC_PROFILE_LIST_FAIL,
} from "../constants/profileConstants";

export const privateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case PRIVATE_PROFILE_REQUEST:
      return { loading: true };
    case PRIVATE_PROFILE_SUCCESS:
      return { loading: false, profile: action.payload };
    case PRIVATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const editPrivateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_PRIVATE_PROFILE_REQUEST:
      return { editLoading: true };
    case EDIT_PRIVATE_PROFILE_SUCCESS:
      return { editLoading: false };
    case EDIT_PRIVATE_PROFILE_FAIL:
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

export const publicProfileListReducer = (state = {}, action) => {
  switch (action.type) {
    case PUBLIC_PROFILE_LIST_REQUEST:
      return { loading: true };
    case PUBLIC_PROFILE_LIST_SUCCESS:
      return {
        loading: false,
        profiles: action.payload.profiles,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
      };
    case PUBLIC_PROFILE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
