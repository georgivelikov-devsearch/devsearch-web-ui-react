import { createSlice } from "@reduxjs/toolkit";

const developerEditSlice = createSlice({
  name: "developerEdit",
  initialState: {},
  reducers: {
    developerEditError(state, action) {
      return { editError: action.payload };
    },
    developerEditErrorClear(state, action) {
      return { editError: null };
    },
  },
});

export const developerEditActions = developerEditSlice.actions;

export default developerEditSlice.reducer;
