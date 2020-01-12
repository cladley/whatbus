import { combineReducers } from "redux";
import arrivalsReducer from "./arrivalsReducer";

export default combineReducers({
  arrivals: arrivalsReducer
});
