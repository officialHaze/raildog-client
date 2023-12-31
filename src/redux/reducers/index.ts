import { combineReducers } from "redux";
import isRegistering from "./AuthRelated/isRegistering.reducer";

const rootReducer = combineReducers({ isRegistering });

export default rootReducer;
