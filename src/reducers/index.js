import { combineReducers } from "redux";
import arrivalsReducer from "./arrivalsReducer";
import mapReducer from "./mapReducer";

export default combineReducers({
  arrivals: arrivalsReducer,
  map: mapReducer
});
