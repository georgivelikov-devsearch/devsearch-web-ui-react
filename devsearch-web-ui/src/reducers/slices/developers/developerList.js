import { createSlice } from "@reduxjs/toolkit";

const developerListSlice = createSlice({
  name: "developerList",
  initialState: {},
  reducers: {
    developerListSuccess(state, action) {
      return {
        developers: action.payload.developers,
        totalPages: action.payload.totalPages,
        searchParameters: action.searchParameters,
      };
    },
  },
});

export const developerListActions = developerListSlice.actions;

export default developerListSlice.reducer;
