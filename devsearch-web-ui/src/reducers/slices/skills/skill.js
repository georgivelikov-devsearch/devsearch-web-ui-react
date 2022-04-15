import { createSlice } from "@reduxjs/toolkit";

const skillSlice = createSlice({
  name: "skills",
  initialState: {},
  reducers: {
    setSkills(state, action) {
      return { skillDescriptions: action.payload };
    },
    clearError(state, actions) {
      return { ...state, skillError: null };
    },
    skillSuccess(state, action) {
      const newSkill = action.payload;
      const newSkillDescriptions = [...state.skillDescriptions];
      newSkillDescriptions.push(newSkill);
      return { skillDescriptions: newSkillDescriptions };
    },
    skillError(state, action) {
      return { ...state, skillError: action.payload };
    },
    skillEditSuccess(state, action) {
      let editedSkill = action.payload;
      let editedSkillDescriptions;
      for (var i = 0; i < state.skillDescriptions.length; i++) {
        if (
          state.skillDescriptions[i].skillDescriptionId ===
          editedSkill.skillDescriptionId
        ) {
          editedSkillDescriptions = [...state.skillDescriptions];
          editedSkillDescriptions[i] = editedSkill;
          break;
        }
      }

      return {
        ...state,
        loading: false,
        skillDescriptions: editedSkillDescriptions,
      };
    },
    skillEditError(state, action) {
      return { ...state, skillError: action.payload };
    },
    skillDeleteSuccess(state, action) {
      let deletedId = action.payload;
      let searchIndex = -1;
      for (var j = 0; j < state.skillDescriptions.length; j++) {
        if (state.skillDescriptions[j].skillDescriptionId === deletedId) {
          searchIndex = j;
          break;
        }
      }

      let editedSkillDescriptions = [...state.skillDescriptions];
      editedSkillDescriptions.splice(searchIndex, 1);
      return {
        ...state,
        skillDescriptions: editedSkillDescriptions,
      };
    },
    skillDeleteError(state, action) {
      return { ...state, skillError: action.payload };
    },
    skillOrderSuccess(state, action) {
      const orderedSkillDescriptionList = action.payload;
      return {
        ...state,
        skillDescriptions: orderedSkillDescriptionList,
      };
    },
    skillOrderError(state, action) {
      return { ...state, skillError: action.payload };
    },
  },
});

export const skillActions = skillSlice.actions;

export default skillSlice.reducer;
