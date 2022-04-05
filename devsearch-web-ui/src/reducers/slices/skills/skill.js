import { createSlice } from "@reduxjs/toolkit";
import { getState } from "react-redux";

const initialSkillState = { loading: false, skillError: {} };

const skillSlice = createSlice({
  name: "skill",
  initialState: {},
  reducers: {
    skillRequest(state, action) {
      state.loading = true;
    },
    skillSuccess(state, action) {
      state.loading = false;
      const { newSkill } = action.payload;
      //let { developer } = getState();
      console.log(state);
      //developer.skillDescriptions.push(newSkill);
    },
    skillError(state, action) {
      state.loading = false;
      state.skillError = action.payload;
    },
  },
});

export const skillActions = skillSlice.actions;

export default skillSlice.reducer;
