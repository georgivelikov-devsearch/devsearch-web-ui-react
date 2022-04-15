import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "project",
  initialState: {},
  reducers: {
    projectNewErrorClear(state, actions) {
      return { ...state, projectNewError: null };
    },
    projectNewError(state, action) {
      return { ...state, projectNewError: action.payload };
    },
  },
});

export const projectActions = projectSlice.actions;

export default projectSlice.reducer;
