import { createSlice } from "@reduxjs/toolkit";

const developerSlice = createSlice({
  name: "developer",
  initialState: {
    developer: null,
    developerList: {
      developers: null,
      totalPages: null,
      searchParameteres: null,
    },
  },
  reducers: {
    developerSuccess(state, action) {
      return { ...state, developer: action.payload };
    },
    developerPublicSuccess(state, action) {
      return { ...state, developer: action.payload };
    },
    developerListSuccess(state, action) {
      return {
        ...state,
        developerList: action.payload,
      };
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
