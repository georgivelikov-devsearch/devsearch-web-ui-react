import {
  PRIVATE_PROFILE_REQUEST,
  PRIVATE_PROFILE_SUCCESS,
  PRIVATE_PROFILE_FAIL,
  EDIT_PRIVATE_PROFILE_REQUEST,
  EDIT_PRIVATE_PROFILE_SUCCESS,
  EDIT_PRIVATE_PROFILE_FAIL,
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
