import { combineReducers, configureStore } from "@reduxjs/toolkit";
import developerReducer from "./reducers/slices/developer/developer";
import developerEditReducer from "./reducers/slices/developer/developerEdit";
import developerListReducer from "./reducers/slices/developer/developerList";
import developerPublicReducer from "./reducers/slices/developer/developerPublic";
import developerSearchListReducer from "./reducers/slices/developer/developerSearchList";
import skillReducer from "./reducers/slices/skills/skill";

let comboRed = combineReducers({
  dev: developerReducer,
  skill: skillReducer,
});
const store = configureStore({
  reducer: {
    developer: developerReducer,
    developerEdit: developerEditReducer,
    developerList: developerListReducer,
    developerPublic: developerPublicReducer,
    developerSearchList: developerSearchListReducer,
    skills: skillReducer,
  },
});

export default store;
