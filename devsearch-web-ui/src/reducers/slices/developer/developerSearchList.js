import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const developerSearchListSlice = createSlice({
  name: "developerSearchList",
  initialState: {},
  reducers: {
    updateSearchForDeveloperList(state, action) {
      return {
        searchParameters: action.payload,
      };
    },
  },
});

export const developerSearchListActions = developerSearchListSlice.actions;

export default developerSearchListSlice.reducer;
