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
      state.editLoading = true;
    },
    developerEditSuccess(state, action) {
      state.editLoading = false;
    },
    developerEditError(state, action) {
      state.editLoading = false;
      state.editError = action.payload;
    },
  },
});

export const developerEditActions = developerEditSlice.actions;

export default developerEditSlice.reducer;
