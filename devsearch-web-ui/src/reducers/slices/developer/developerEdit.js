import { createSlice } from "@reduxjs/toolkit";

const initialDeveloperEditState = {
  editLoading: false,
  developerEdit: {},
  editError: {},
};

const developerEditSlice = createSlice({
  name: "developerEdit",
  initialState: {},
  reducers: {
    developerEditRequest(state, action) {
      return { editLoading: true };
    },
    developerEditSuccess(state, action) {
      return { editLoading: false };
    },
    developerEditError(state, action) {
      return { editLoading: false, editError: action.payload };
    },
  },
});

export const developerEditActions = developerEditSlice.actions;

export default developerEditSlice.reducer;
