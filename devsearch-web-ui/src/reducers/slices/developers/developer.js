import { createSlice } from "@reduxjs/toolkit";

const developerSlice = createSlice({
  name: "developer",
  initialState: {},
  reducers: {
    clearError(state, action) {
      return { ...state, error: null };
    },
    developerSuccess(state, action) {
      return { ...state, developer: action.payload };
    },
    developerError(state, action) {
      return { ...state, error: action.payload };
    },
    developerPublicSuccess(state, action) {
      return { ...state, developer: action.payload };
    },
    developerPublicError(state, action) {
      return { ...state, error: action.payload };
    },
    developerRemoveProjectFromProjectList(state, action) {
      let { projectId } = action.payload;
      let projectsArray = [...state.developer.projects];
      let searchIndex = -1;
      for (var i = 0; i < projectsArray.length; i++) {
        if (projectsArray[i].projectId === projectId) {
          searchIndex = i;
          break;
        }
      }

      projectsArray.splice(searchIndex, 1);
      let newDev = { ...state.developer };
      newDev.projects = projectsArray;

      return {
        ...state,
        developer: newDev,
      };
    },
  },
});

export const developerActions = developerSlice.actions;

export default developerSlice.reducer;
