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
      return { loading: true };
    },
    developerListSuccess(state, action) {
      return {
        loading: false,
        developers: action.payload.developers,
        totalPages: action.payload.totalPages,
        searchParameters: action.searchParameters,
      };
    },
    developerListError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const developerListActions = developerListSlice.actions;

export default developerListSlice.reducer;
