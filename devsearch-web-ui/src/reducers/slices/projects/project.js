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
    projectListSuccess(state, action) {
      return {
        ...state,
        projects: action.payload.projects,
        totalPages: action.payload.totalPages,
        searchParameters: action.searchParameters,
        projectListError: null,
      };
    },
    projectListError(state, action) {
      return {
        ...state,
        projectListError: action.payload,
      };
    },
    singleProject(state, action) {
      const newProject = action.payload;
      return {
        state,
        project: newProject,
      };
    },
    addCommentToProject(state, action) {
      const newComment = action.payload;
      let newProject = { ...state.project };
      let projectComments = [...newProject.comments];
      projectComments.push(newComment);
      newProject.comments = projectComments;
      return {
        state,
        project: newProject,
      };
    },
    removeCommentFromProject(state, action) {
      const commentId = action.payload;
      let newProject = { ...state.project };
      let projectComments = [...newProject.comments];
      let searchIndex = -1;
      for (var i = 0; i < projectComments.length; i++) {
        if (projectComments[i].commentId === commentId) {
          searchIndex = i;
          break;
        }
      }

      projectComments.splice(searchIndex, 1);
      newProject.comments = projectComments;

      return {
        state,
        project: newProject,
      };
    },
  },
});

export const projectActions = projectSlice.actions;

export default projectSlice.reducer;
