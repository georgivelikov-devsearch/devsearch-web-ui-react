import { createSlice } from "@reduxjs/toolkit";

const initialDeveloperListState = {
  loading: false,
  developers: {},
  totalPages: 0,
  searchParameters: "",
  error: {},
};

const developerListSlice = createSlice({
  name: "developerList",
  initialState: {},
  reducers: {
    developerListRequest(state, action) {
      state.loading = true;
    },
    developerListSuccess(state, action) {
      state.loading = false;
      state.developers = action.payload.developers;
      state.totalPages = action.payload.totalPages;
      state.searchParameters = action.searchParameters;
    },
    developerListError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const developerListActions = developerListSlice.actions;

export default developerListSlice.reducer;
