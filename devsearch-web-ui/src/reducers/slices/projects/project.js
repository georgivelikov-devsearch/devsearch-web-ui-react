import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    project: null,
    projectError: null,
    projectList: {
      totalPages: null,
      projects: null,
    },
    projectListError: null,
  },
  reducers: {
    getProject(state, action) {
      const newProject = action.payload;
      return {
        ...state,
        project: newProject,
        projectError: null,
      };
    },
    projectError(state, action) {
      return { ...state, projectError: action.payload };
    },
    projectErrorClear(state, action) {
      return { ...state, projectError: null };
    },
    getProjectList(state, action) {
      let newProjectList = {
        projects: action.payload.projects,
        totalPages: action.payload.totalPages,
      };
      return {
        ...state,
        projectList: newProjectList,
        projectListError: null,
      };
    },
    projectListError(state, action) {
      return {
        ...state,
        projectListError: action.payload,
      };
    },
    projectListErrorClear(state, action) {
      return {
        ...state,
        projectListError: null,
      };
    },
    addCommentToProject(state, action) {
      const newComment = action.payload;
      let newProject = { ...state.project };
      let projectComments = [...newProject.comments];
      projectComments.push(newComment);
      newProject.comments = projectComments;

      return {
        ...state,
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
        ...state,
        project: newProject,
      };
    },
  },
});

export const projectActions = projectSlice.actions;

export default projectSlice.reducer;
