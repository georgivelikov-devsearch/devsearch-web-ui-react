import { configureStore } from "@reduxjs/toolkit";
// import { combineReducers, configureStore } from "@reduxjs/toolkit";
import developerReducer from "./reducers/slices/developers/developer";
import developerEditReducer from "./reducers/slices/developers/developerEdit";
import developerListReducer from "./reducers/slices/developers/developerList";
import developerPublicReducer from "./reducers/slices/developers/developerPublic";
import developerSearchListReducer from "./reducers/slices/developers/developerSearchList";
import skillReducer from "./reducers/slices/skills/skill";
import projectReducer from "./reducers/slices/projects/project";
import loadingReducer from "./reducers/slices/global/loading";

// let comboRed = combineReducers({
//   dev: developerReducer,
//   skill: skillReducer,
// });

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    developer: developerReducer,
    developerEdit: developerEditReducer,
    developerList: developerListReducer,
    developerPublic: developerPublicReducer,
    developerSearchList: developerSearchListReducer,
    skills: skillReducer,
    project: projectReducer,
  },
});

export default store;
