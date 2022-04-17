import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "project",
  initialState: {},
  reducers: {
    projectErrorClear(state, actions) {
      return { ...state, projectError: null };
    },
    projectError(state, action) {
      return { ...state, projectError: action.payload };
    },
  },
});

export const projectActions = projectSlice.actions;

export default projectSlice.reducer;
