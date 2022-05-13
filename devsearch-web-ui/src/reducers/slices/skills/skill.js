import { createSlice } from "@reduxjs/toolkit";

const skillSlice = createSlice({
  name: "skills",
  initialState: {
    skillDescriptions: null,
    skillError: null,
  },
  reducers: {
    setSkills(state, action) {
      return { skillDescriptions: action.payload, skillError: null };
    },
    addSkill(state, action) {
      const newSkill = action.payload;
      const newSkillDescriptions = [...state.skillDescriptions];
      newSkillDescriptions.push(newSkill);
      return { skillDescriptions: newSkillDescriptions, skillError: null };
    },
    editSkill(state, action) {
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
        skillDescriptions: editedSkillDescriptions,
        skillError: null,
      };
    },
    deleteSkill(state, action) {
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
        skillDescriptions: editedSkillDescriptions,
        skillError: null,
      };
    },
    orderSkills(state, action) {
      const orderedSkillDescriptionList = action.payload;
      return {
        skillDescriptions: orderedSkillDescriptionList,
        skillError: null,
      };
    },
    skillError(state, action) {
      return { ...state, skillError: action.payload };
    },
    clearSkillError(state, action) {
      return { ...state, skillError: null };
    },
  },
});

export const skillActions = skillSlice.actions;

export default skillSlice.reducer;
