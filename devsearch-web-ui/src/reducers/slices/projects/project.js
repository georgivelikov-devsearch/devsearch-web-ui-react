import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "projects",
  initialState: {},
  reducers: {
    setProjects(state, action) {
      return { projects: action.payload };
    },
    clearError(state, actions) {
      return { ...state, loading: false, projectError: null };
    },
    projectRequest(state, action) {
      return { ...state, loading: true };
    },
    projectSuccess(state, action) {
      const newProject = action.payload;
      const newProjects = [...state.projects];
      newProjects.push(newProject);
      return { loading: false, projects: newProjects };
    },
    projectError(state, action) {
      return { ...state, loading: false, projectError: action.payload };
    },
  },
});

export const projectActions = projectSlice.actions;

export default projectSlice.reducer;
